import * as Vec2 from "../vec2.js";
import * as Keyboard from "../keyboard.js";
import * as Mouse from "../mouse.js";

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

    this.velocity = {x: 0, y:0};
    this.friction = 0.09;
    this.acceleration = 0.02;
  }

  update() {
    function moreRecentPress(a, b) {
      if (Keyboard.keys[a] && Keyboard.keys[b])
        return (Keyboard.timestamps[b] > Keyboard.timestamps[a]) ? -1 : 1;
      else if (Keyboard.keys[a] || Keyboard.keys[b])
        return Keyboard.keys[b] ? -1 : 1;
      else
        return 0;
    }

    const mouseLoc = Mouse.mouseLocation()
    // Not sure why I need to adjust this by -Math.PI/2 but it's working lol
    this.rot = Math.atan2(mouseLoc.y - this.center.y, mouseLoc.x - this.center.x) - Math.PI/2;

    const direction = Vec2.norm({x: moreRecentPress(68, 65), y: moreRecentPress(83, 87)});
    // I think this math is wrong but it seems to be working well enough for now
    this.velocity = Vec2.sub(Vec2.sMul(direction, this.acceleration), Vec2.sMul(this.velocity, this.friction));
    this.center = Vec2.add(this.center, this.velocity);

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
