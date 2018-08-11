

export default class Arena {

  constructor(manager) {
    this.manager = manager;

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
    ctx.arc(canvas.width/2, canvas.width/2, pxRadius, 0, Math.PI * 2, false);
    ctx.fill();
  }

}
