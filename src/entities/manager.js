import * as Collision from "../collision.js";
import * as Vec2 from "../vec2.js";

import Player from "./player.js";
import Arena from "./arena.js";
import Bullet from "./bullet.js";
import Soul from "./soul.js";

// Enemies
import Spawner from "./enemies/spawner.js";
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
      new BasicEnemy(this, this.player, {x: 0.6, y:0.6}),
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

    const soulsToCreate = 12;
    for(let i=0; i<soulsToCreate; i++) {
      this.scene.push(new Soul(this, this.player, entity.center));
    }
    this.destroy(entity);
  }

  advanceLevel() {
    this.level++;
    // Start spawning enemies at the start of the first level
    // Level 0 is just one enemy
    if(this.level === 1)
      this.scene.push(new Spawner(this, this.arena, this.player));
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

  collectSoul(player, soul) {
    // TODO tweak, this seems high
    this.arena.increase(0.01);
  }

}
