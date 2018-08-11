import * as Vec2 from "../vec2.js";
import * as Keyboard from "../keyboard.js";

export default class Player {
  constructor(manager, canvas) {
    this.manager = manager;

    this.center = {x: 0.5, y: 0.5};
    this.verts = [
      {x: 0.025, y: 0},
      {x: -0.025, y: -0.015},
      {x: -0.018, y: 0},
      {x: -0.025, y: 0.015},
    ];
    this.rot = 0;

    this.color = 'lightgrey'

    // Don't want the bullets we shoot to just spawn inside the ship at its center
    this.bulletOffset = 0.025;

    this.velocity = {x: 0, y:0};
    this.friction = 0.09;
    this.acceleration = 0.018;

    // Mouse related garbage
    canvas.addEventListener("mousemove", (e) => {
      this.mouseLoc = {x: (e.clientX - canvas.offsetLeft)/canvas.width, y: (e.clientY - canvas.offsetTop)/canvas.height};
    });

    canvas.addEventListener("click", (e) => {
      this.click = true;
      this.clickLoc = {x: (e.clientX - canvas.offsetLeft)/canvas.width, y: (e.clientY - canvas.offsetTop)/canvas.height};
    });

    this.mouseLoc = {x: 0.5, y: 0.5};
    this.click = false;
    this.clickLoc = {x: 0.5, y: 0.5};
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

    const mouseLoc = this.mouseLoc;
    this.rot = Math.atan2(mouseLoc.y - this.center.y, mouseLoc.x - this.center.x);

    const direction = Vec2.norm({x: moreRecentPress(68, 65), y: moreRecentPress(83, 87)});
    // I think this math is wrong but it seems to be working well enough for now
    this.velocity = Vec2.sub(Vec2.sMul(direction, this.acceleration), Vec2.sMul(this.velocity, this.friction));
    this.center = Vec2.add(this.center, this.velocity);

    if(this.click) {
      this.click = false;

      // TODO need cooldown?
      this.manager.shootAt(this, this.clickLoc);
    }

  }

  draw(canvas, ctx) {

    const normalize = (vert) => {
      const rotatedX = vert.x*Math.cos(this.rot) - vert.y*Math.sin(this.rot);
      const rotatedY = vert.x*Math.sin(this.rot) + vert.y*Math.cos(this.rot);
      return {x: canvas.width*(this.center.x+rotatedX), y: canvas.width*(this.center.y+rotatedY)}
    };

    const ayy = this.verts.map(normalize);

    ctx.fillStyle = this.color;

    ctx.beginPath()
    ctx.moveTo(ayy[0].x, ayy[0].y);
    ayy.slice(1).forEach(v => ctx.lineTo(v.x, v.y));
    ctx.closePath();

    ctx.fill();
    ctx.stroke();

  }
}
