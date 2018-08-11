import * as Vec2 from "../vec2.js";

export default class Bullet {

  constructor(manager, source, startLoc, direction) {
    this.name = "Bullet";
    this.manager = manager;
    this.source = source;

    this.color = source.color;
    this.center = startLoc;
    this.direction = direction;

    this.velocity = 0.02;
    this.radius = 0.01;
  }

  update() {
    this.center = Vec2.add(this.center, Vec2.sMul(this.direction, this.velocity));
  }

  draw(canvas, ctx) {
    const pxRadius = canvas.width * this.radius;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(canvas.width*this.center.x, canvas.width*this.center.y, pxRadius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.stroke();
  }

  handleCollision(collision) {
    // TODO check to see if colision was with entity which fired
    switch(collision.name) {
      case 'Arena':
        this.manager.destroy(this);
        break;
    }
  }

  collisionBody() {
    return {
      type: "circle",
      center: this.center,
      radius: this.radius,
    }
  }

}
