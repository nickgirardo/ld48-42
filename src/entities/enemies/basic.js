import * as Vec2 from "../../vec2.js";

export default class BasicEnemy {
  constructor(manager) {
    this.name = "BasicEnemy";
    this.manager = manager;

    this.center = {x: 0.3, y: 0.3};
    this.verts = [
      {x: 0.02, y: 0.02},
      {x: 0, y: 0.024},
      {x: -0.02, y: 0.02},
      {x: -0.024, y: 0},
      {x: -0.02, y: -0.02},
      {x: 0, y: -0.024},
      {x: 0.02, y: -0.02},
      {x: 0.024, y: 0},
    ];
    // TODO Typed these in wrong but they look cool use something based off this for another enemy
    /*
    this.verts = [
      {x: 0.025, y: 0.025},
      {x: 0.025, y: -0.025},
      {x: -0.025, y: 0.025},
      {x: -0.025, y: -0.025},
    ];
    */
    this.color = 'red';
    this.rot = 0;

    this.velocity = 0.002;
    this.currentDir = Math.random()*Math.PI*2;
    this.direction = Vec2.rotate(Vec2.up(), this.currentDir);
  }


  update() {
    const gameCenter = {x: 0.5, y: 0.5};
    const diff = Vec2.sub(gameCenter, this.center);
    this.direction = Vec2.norm(Vec2.add(this.direction, Vec2.div(diff,8)));
    this.center = Vec2.add(this.center, Vec2.sMul(this.direction, this.velocity));

    // TODO should this be based off of something?
    this.rot += 0.03;
  }

  draw(canvas, ctx) {

    const normalize = (vert) => {
      const rotated = Vec2.rotate(vert, this.rot);
      return {x: canvas.width*(this.center.x+rotated.x), y: canvas.width*(this.center.y+rotated.y)}
    };

    const ayy = this.verts.map(normalize);

    ctx.fillStyle = this.color;

    ctx.beginPath()
    ctx.moveTo(ayy[0].x, ayy[0].y);
    ayy.slice(1).forEach(v => ctx.lineTo(v.x, v.y));
    ctx.closePath();

    ctx.fill();
    ctx.stroke();
  }

  handleCollision(collision) {
    switch(collision.name) {
      case 'Player':
        this.manager.damagePlayer(collision, this);
        this.manager.destroy(this);
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
