import * as Util from "../util.js";
import * as Vec2 from "../vec2.js";

export default class Soul {

  constructor(manager, player, center) {
    this.manager = manager;
    this.player = player;

    this.name = "Soul";

    this.center = center;
    this.verts = [
      {x: 0.003, y: 0.004},
      {x: 0.003, y: -0.004},
      {x: -0.003, y: 0.004},
      {x: -0.003, y: -0.004},
    ];

    this.rotation = Math.random()*Math.PI*2;
    this.color = 'lightgrey';

    this.spin = Math.random() * 1000 - 500;

    // TODO tweak here later
    this.friction = 0.8;
    this.direction = Vec2.rotate(Vec2.up(), Math.random()*Math.PI*2);
    this.velocity = Vec2.sMul(this.direction, 0.016 * Math.random());

    this.maxTTL = 120;
    this.TTL = 120;
  }

  update() {
    this.TTL--;
    if(this.TTL === 0) {
      this.manager.destroy(this);
      return;
    }

    this.velocity = Vec2.sMul(this.velocity, this.friction);

    const magnetRange = 0.1;
    const diff = Vec2.sub(this.player.center, this.center);
    const distance = Vec2.mag(diff);

    if(distance < magnetRange) {
      // This is a divisor, so the larger this is the weaker the magntic effect
      const magnetism = 20000;
      const scaled = Vec2.div(diff, distance**2*magnetism);
      this.velocity = Vec2.add(this.velocity, scaled);
    }

    this.spin *= this.friction;
    this.center = Vec2.add(this.center, this.velocity);
    // Spin should hit 0 pretty quickly so it should only spin on its initial movemnet
    // Not while it's being attracted by the magnetic force
    this.rotation += Vec2.mag(this.velocity) * this.spin;
  }

  draw(canvas, ctx) {
    const scale = this.TTL > 60 ? 1 : (this.TTL/(this.maxTTL-60));
    Util.drawVec(canvas, ctx, this.center, this.verts, this.rotation, this.color, scale);
  }

  handleCollision(collision) {
    switch(collision.name) {
      case 'Player':
        this.manager.collectSoul(this, collision);
        this.manager.destroy(this);
        break;
      case 'Arena':
        this.manager.destroy(this);
        break;
    }
  }

  collisionBody() {
    return {
      type: 'circle',
      center: this.center,
      radius: 0.02,
    }
  }

}
