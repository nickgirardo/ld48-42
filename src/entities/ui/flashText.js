
export default class FlashText {

  constructor(manager, text) {
    this.manager = manager;
    this.text = text;
    this.ttl = 60;
  }

  update() {
    this.ttl--;
    if(this.ttl < 0)
      this.manager.destroy(this);
  }

  postDraw(canvas, ctx) {

    // Avoid drawing same place as game over text
    if(this.manager.isGameOver)
      return;

    ctx.fillStyle = 'black';
    // TODO should shrink based on screen size
    // but this is mostly good so I might just keep it
    ctx.font = '48px LuluMono';
    ctx.textBaseline = 'top';

    ctx.textAlign = 'center';
    ctx.fillText(this.text, canvas.width/2, canvas.height/3);

  }

}

