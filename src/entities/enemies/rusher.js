import * as Util from "../../util.js";
import * as Vec2 from "../../vec2.js";

export default class Rusher {
  constructor(manager, player) {
    this.name = "Rusher";
    this.manager = manager;
    this.player = player

    this.center = {x: 0.6, y: 0.3};
    this.verts = [
      {x: 0.02, y: 0},
      {x: -0.012, y: 0.02},
      {x: -0.025, y: 0.018},
      {x: -0.03, y: 0},
      {x: -0.025, y: -0.018},
      {x: -0.012, y: -0.02},
    ];
    this.color = 'red';
    this.rot = 0;

    this.velocity = 0.005;
    this.direction = Vec2.norm(Vec2.sub(this.player.center, this.center));
  }


  update() {
    this.center = Vec2.add(this.center, Vec2.sMul(this.direction, this.velocity));

    const targetRot = Vec2.norm(Vec2.sub(this.player.center, this.center));
    const gradualness = 4;
    this.direction = Vec2.norm(Vec2.add(Vec2.sMul(this.direction, gradualness), targetRot));
    this.rot = Vec2.getRotation(this.direction);
  }

  draw(canvas, ctx) {
    Util.drawVec(canvas, ctx, this.center, this.verts, this.rot, this.color);
  }

  handleCollision(collision) {
    switch(collision.name) {
      case 'Player':
        this.manager.damagePlayer(collision, this);
        this.manager.destroy(this);
        break;
      case 'Bullet':
        this.manager.defeatEnemy(this);
        this.manager.destroy(collision);
        break;
    }
  }

  collisionBody() {
    return {
      type: 'circle',
      center: this.center,
      radius: 0.025,
    }
  }

}

