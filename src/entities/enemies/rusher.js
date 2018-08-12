import * as Util from "../../util.js";
import * as Vec2 from "../../vec2.js";

import Bullet from "../bullet.js";

export default class Rusher {
  constructor(manager, player, center) {
    this.manager = manager;
    this.player = player

    this.name = "Rusher";
    this.isEnemy = true;

    this.center = center;
    this.verts = [
      {x: 0.022, y: 0},
      {x: -0.014, y: 0.018},
      {x: -0.026, y: 0.015},
      {x: -0.031, y: 0},
      {x: -0.026, y: -0.015},
      {x: -0.014, y: -0.018},
    ];
    this.color = 'red';
    this.rot = 0;

    this.velocity = 0.007;
    this.direction = Vec2.norm(Vec2.sub(this.player.center, this.center));

    this.strength = 0.15;
    this.souls = 22;
    this.score = 100;
  }


  update() {
    this.center = Vec2.add(this.center, Vec2.sMul(this.direction, this.velocity));

    const targetRot = Vec2.norm(Vec2.sub(this.player.center, this.center));
    // If this coefficient is too large the rusher will miss the player
    // or never hit him at all
    const gradualness = 4;
    this.direction = Vec2.norm(Vec2.add(Vec2.sMul(this.direction, gradualness), targetRot));
    this.rot = Vec2.getRotation(this.direction);
  }

  draw(canvas, ctx) {
    Util.drawVec(canvas, ctx, this.center, this.verts, this.rot, this.color);
  }

  handleCollision(collision) {
    switch(collision.name) {
      case 'Player':
        this.manager.damagePlayer(collision, this);
        this.manager.destroy(this);
        break;
      case 'Bullet':
        if(!collision.isEnemy) {
          this.manager.defeatEnemy(this);
          this.manager.destroy(collision);
        }
        break;
    }
  }

  collisionBody() {
    return {
      type: 'circle',
      center: this.center,
      radius: 0.025,
    }
  }

}

