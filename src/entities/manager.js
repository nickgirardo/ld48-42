import * as Collision from "../collision.js";
import * as Vec2 from "../vec2.js";

import Player from "./player.js";
import Arena from "./arena.js";
import Bullet from "./bullet.js";

export default class Manager {
  constructor(canvas) {
    this.scene = [
      new Arena(this),
      new Player(this, canvas),
    ];

    this.level = 0;
  }

  update() {
    // Fist handle collisions
    const collisionResults = Collision.check(this.scene);
    collisionResults.forEach(({entity, collisions}) => {
      collisions.forEach(col => {
        if(entity && col)
          entity.handleCollision(col);
      });
    });

    this.scene.forEach(c=>c.update());
  }

  draw(canvas, ctx) {

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.scene.forEach(c=>c.draw(canvas, ctx));
  }

  destroy(entity) {
    const ix = this.scene.indexOf(entity);
    if(ix === -1) {
      console.error('Entity not found for deletion');
      return;
    }
    this.scene.splice(ix, 1);
  }

  shootAt(source, spawn, target) {
    const direction = Vec2.norm(Vec2.sub(target, source.center));
    this.scene.push(new Bullet(this, source, spawn, direction));
  }

}
