
export default class Player {
  constructor() {
    this.center = {x: 0.5, y: 0.5};
    this.verts = [
      {x: 0, y: 0.025},
      {x: 0.015, y: -0.025},
      {x: 0, y: -0.018},
      {x: -0.015, y: -0.025},
    ];
    this.rot = 0;
  }

  update() {
    this.rot += 0.02;
  }

  draw(canvas, ctx) {

    const normalize = (vert) => {
      const rotatedX = vert.x*Math.cos(this.rot) - vert.y*Math.sin(this.rot);
      const rotatedY = vert.x*Math.sin(this.rot) + vert.y*Math.cos(this.rot);
      return {x: canvas.width*(this.center.x+rotatedX), y: canvas.width*(this.center.y+rotatedY)}
    };

    const ayy = this.verts.map(normalize);

    ctx.fillStyle = 'green';

    ctx.beginPath()
    ctx.moveTo(ayy[0].x, ayy[0].y);
    ayy.slice(1).forEach(v => ctx.lineTo(v.x, v.y));
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

  }
}
