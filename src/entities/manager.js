import Player from "./player.js";

export default class Manager {
  constructor() {
    this.children = [
      new Player(),
    ];
  }

  update() {
    this.children.forEach(c=>c.update());
  }

  draw(canvas, ctx) {

    ctx.fillStyle = 'darkblue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.children.forEach(c=>c.draw(canvas, ctx));
  }

}
