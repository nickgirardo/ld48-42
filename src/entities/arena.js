

export default class Arena {

  constructor(manager) {
    this.name = "Arena";
    this.manager = manager;

    this.center = {x: 0.5, y: 0.5};
    this.radius = 0.48;
    this.frameShrink = [
      0.0001,
      0.0002,
      0.0004,
      0.0008,
      0.0012,
      0.0016,
    ];
  }

  update() {
    if(this.radius > this.frameShrink[this.manager.level]) {
      this.radius -= this.frameShrink[this.manager.level];
    } else {
      console.log('too small game over');
    }
  }

  draw(canvas, ctx) {
    const pxRadius = this.radius * canvas.width;

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(canvas.width*this.center.x, canvas.width*this.center.y, pxRadius, 0, Math.PI * 2, false);
    ctx.fill();
  }

  handleCollision() {}

  collisionBody() {
    return {
      type: "circle",
      invert: true,
      center: this.center,
      radius: this.radius,
    }
  }
}
