import * as Collision from "../collision.js";
import * as Vec2 from "../vec2.js";

import Player from "./player.js";
import Arena from "./arena.js";
import Bullet from "./bullet.js";

// Enemies
import BasicEnemy from "./enemies/basic.js";
import Rusher from "./enemies/rusher.js";
import Shooter from "./enemies/shooter.js";

export default class Manager {
  constructor(canvas) {
    this.arena = new Arena(this);
    this.player = new Player(this, canvas);
    this.scene = [
      this.arena,
      this.player,
      new BasicEnemy(this),
      new Rusher(this, this.player),
      new Shooter(this, this.player),
    ];

    this.levelKills = 0;
    this.levelKillsNeeded = [
      1,
      12,
      24,
      24,
      24,
      Infinity
    ];
    this.level = 0;

    // TODO
    this.score = 0;
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

  defeatEnemy(entity) {
    // TODO score calculations
    // this.score += someAmount
    this.levelKills++;
    if(this.levelKills === this.levelKillsNeeded[this.level])
      this.advanceLevel();
    this.destroy(entity);
  }

  advanceLevel() {
    this.level++;
  }

  shootAt(source, spawn, target) {
    const direction = Vec2.norm(Vec2.sub(target, source.center));
    this.scene.push(new Bullet(this, source, spawn, direction));
  }

  // Damage dealt to the player is represented by arena shrinking
  // The only way the player loses is if he leaves the arena
  damagePlayer(player, enemy) {
    this.arena.reduce(enemy.strength);
  }
    

}
