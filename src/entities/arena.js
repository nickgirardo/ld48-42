

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
      0.00035,
      0.0007,
      0.0011,
      0.0014,
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
      this.manager.gameOver();
    }
  }

  increase(amount) {
    this.targetRadius = Math.min(this.targetRadius + amount, this.maxRadius);
  }

  // Collecting soul increases the size of the arena
  // The amount scales inversely with the size of the arena
  // This makes it a bit easier to come back after taking hits
  collectSoul() {
    const baseAmount = 0.0006;
    const radiusDiff = this.maxRadius - this.targetRadius;
    console.log(baseAmount + radiusDiff/600);
    this.increase(baseAmount + radiusDiff/600);
  }

}
