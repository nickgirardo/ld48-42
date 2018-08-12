
export default class GameOverText {

  constructor(manager) {}

  update() {}

  postDraw(canvas, ctx) {
    ctx.fillStyle = 'white';
    // TODO should shrink based on screen size
    // but this is mostly good so I might just keep it
    ctx.font = '48px LuluMono';
    ctx.textBaseline = 'top';

    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', canvas.width/2, canvas.height/2-48);
    ctx.font = '24px LuluMono';
    ctx.fillText('Click to restart', canvas.width/2, canvas.height/2);

  }

}
