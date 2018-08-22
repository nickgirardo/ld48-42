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

// UI
import FlashText from "./ui/flashText.js";
import GameOverText from "./ui/gameOverText.js";

// SFX
import EnemyBulletSFX from "./sfx/enemyBullet.js";
import FriendlyBulletSFX from "./sfx/friendlyBullet.js";
import LevelUpSFX from "./sfx/levelUp.js";
import EnemyHitSFX from "./sfx/enemyHit.js";

export default class Manager {
  constructor(canvas, newGame) {
    this.canvas = canvas;
    this.newGame = newGame;
    this.arena = new Arena(this);
    this.player = new Player(this, this.canvas);
    this.scene = [
      this.arena,
      this.player,
    ];

    this.enemyBulletSfx = new EnemyBulletSFX();
    this.friendlyBulletSfx = new FriendlyBulletSFX();
    this.levelUpSfx = new LevelUpSFX();
    this.enemyHitSfx = new EnemyHitSFX();

    const firstEnemy = this.spawnEnemy("BasicEnemy");
    firstEnemy.firstEnemy = true;

    this.isGameOver = false;

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

    this.score = 0;
    this.hiscore = Number(localStorage.getItem('hiscore')) || 0;
    this.paddedHiscore = (this.hiscore + '').padStart(8, '0');
    this.incScore(0);
  }

  update() {
    // No updates to a finished game
    if(this.isGameOver)
      return;

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

    ctx.fillStyle = this.isGameOver ? 'red' : 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    this.scene.filter(e=>typeof e.draw === "function").forEach(e=>e.draw(canvas, ctx));

    // Make sure this bit of the arena is drawn after everything
    // This is a hack to avoid needing system of layers
    this.scene.filter(e=>typeof e.postDraw === "function").forEach(e=>e.postDraw(canvas, ctx));

    // Just drawing the UI here save time
    ctx.fillStyle = 'white';
    // TODO should shrink based on screen size
    // but this is mostly good so I might just keep it
    ctx.font = '24px LuluMono';
    ctx.textBaseline = 'top';

    ctx.textAlign = 'start';
    if(this.level === 0) {
      ctx.fillText('WASD to move', 4, 4);
      ctx.fillText('Click to shoot', 4, 32);
    } else {
      ctx.fillText(`Level ${this.level}`, 4, 4);
      ctx.fillText(`Kills to next: ${this.levelKillsNeeded[this.level] - this.levelKills}`, 4, 32);
    }

    ctx.textAlign = 'end';
    ctx.fillText(`Hi Score ${this.hiScore()}`, canvas.width-4, 4)
    ctx.fillText(`Score ${this.paddedScore || 0}`, canvas.width-4, 32)
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
    this.incScore(entity.score * (this.level+1));
    this.levelKills++;
    if(this.levelKills >= this.levelKillsNeeded[this.level])
      this.advanceLevel();

    const soulsToCreate = entity.souls;
    for(let i=0; i<soulsToCreate; i++) {
      this.scene.push(new Soul(this, this.player, entity.center));
    }

    this.enemyHitSfx.play();

    this.destroy(entity);
  }

  incScore(amount) {
    this.score += amount;
    this.paddedScore = (this.score + '').padStart(8, '0');
  }

  hiScore() {
    return this.score < this.hiscore ? this.paddedHiscore : this.paddedScore;
  }

  advanceLevel() {
    this.level++;
    this.levelKills = 0;

    this.scene.push(new FlashText(this, 'LEVEL ' + this.level));

    this.levelUpSfx.play();
    // Start spawning enemies at the start of the first level
    // Level 0 is just one enemy
    if(this.level === 1)
      this.scene.push(new Spawner(this, this.arena, this.player));
  }

  shootAt(source, spawn, target) {
    const direction = Vec2.norm(Vec2.sub(target, source.center));
    this.scene.push(new Bullet(this, source, spawn, direction));
    if(source.isEnemy)
      this.enemyBulletSfx.play();
    else
      this.friendlyBulletSfx.play();
  }

  // Damage dealt to the player is represented by arena shrinking
  // The only way the player loses is if he leaves the arena
  damagePlayer(player, enemy) {
    this.arena.reduce(enemy.strength);
  }

  collectSoul(player, soul) {
    this.incScore(this.level);
    this.arena.collectSoul();
  }

  // If the first enemy hits the player we need to spawn a new enemy
  // so that the player doesn't get stuck in level zero and the game
  // can begin
  firstEnemyCollision() {
    const newFirstEnemy = this.spawnEnemy("BasicEnemy");
    newFirstEnemy.firstEnemy = true;
  }

  spawnEnemy(type) {
    const spawnFns = {
      "BasicEnemy": (center) => new BasicEnemy(this, this.player, center),
      "Rusher": (center) => new Rusher(this, this.player, center),
      "Shooter": (center) => new Shooter(this, this.player, center),
    }
    const center = Vec2.add(Vec2.sMul(Vec2.rotate(Vec2.up(), Math.random()*Math.PI*2), this.arena.radius * 2), {x: 0.5, y: 0.5});
    if(!spawnFns[type]) {
      console.error(`Unable to spawn enemy, unknown type '${type}'`);
      return;
    }
    const enemy = spawnFns[type](center);
    this.scene.push(enemy);

    return enemy;
  }

  gameOver() {
    if(this.score > this.hiscore)
      localStorage.setItem('hiscore', this.score);

    this.isGameOver = true;
    this.scene.push(new GameOverText(this));
    
    this.scene.filter(e=>typeof e.cleanUp === "function").forEach(e=>e.cleanUp());
    
    const clickHandler = (e) => {
      this.canvas.removeEventListener("click", clickHandler);
      this.newGame();
    };
    this.canvas.addEventListener("click", clickHandler);
  }

}
