

export default class Arena {

  constructor(manager) {
    this.name = "Arena";
    this.manager = manager;

    this.center = {x: 0.5, y: 0.5};
    this.radius = 0.48;
    this.minRadius = 0.0001;
    this.maxRadius = 0.5;
    this.frameShrink = [
      0,
      0.0001,
      0.0002,
      0.0004,
      0.0008,
      0.0012,
      0.0016,
    ];

    this.targetRadius = this.radius;
    this.maxFrameChange = 0.04;
  }

  update() {
    this.reduce(this.frameShrink[this.manager.level]);
    const diff = this.targetRadius - this.radius;
    const change = Math.max(Math.min(diff, this.maxFrameChange), -this.maxFrameChange);
    this.radius += change;
  }

  draw(canvas, ctx) { }

  postDraw(canvas, ctx) {
    const pxRadius = this.radius * canvas.width;

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(canvas.width*this.center.x, canvas.width*this.center.y, pxRadius, 0, Math.PI * 2, false);
    ctx.rect(canvas.width, 0, -canvas.width, canvas.height);
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

  reduce(amount) {
    if(this.targetRadius - amount > this.minRadius) {
      this.targetRadius -= amount;
    } else {
      this.targetRadius = this.minRadius;
      // too small game over
      this.manager.gameOver = true;
    }
  }

  increase(amount) {
    this.targetRadius = Math.min(this.targetRadius + amount, this.maxRadius);
  }

}
