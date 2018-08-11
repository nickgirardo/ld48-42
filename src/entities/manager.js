import * as Vec2 from "../vec2.js";

import Player from "./player.js";
import Arena from "./arena.js";
import Bullet from "./bullet.js";

export default class Manager {
  constructor(canvas) {
    this.children = [
      new Arena(this),
      new Player(this, canvas),
    ];

    this.level = 0;
  }

  update() {
    this.children.forEach(c=>c.update());
  }

  draw(canvas, ctx) {

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.children.forEach(c=>c.draw(canvas, ctx));
  }

  shootAt(source, target) {
    const direction = Vec2.norm(Vec2.sub(target, source.center));
    // This is so that we don't spawn bullets right inside the ship which shoots them
    const spawnLoc = Vec2.add(source.center, Vec2.sMul(direction, source.bulletOffset));
    this.children.push(new Bullet(this, source, spawnLoc, direction));
  }

}
