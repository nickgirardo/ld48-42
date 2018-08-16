import * as Util from "../../util.js";
import * as Vec2 from "../../vec2.js";

export default class Shooter {
  constructor(manager, player, center) {
    this.manager = manager;
    this.player = player

    this.name = "Shooter";
    this.isEnemy = true;

    this.center = center;
    this.verts = [
      {x: 0.01, y: 0},
      {x: -0.01, y: 0.025},
      {x: -0.02, y: 0.020},
      {x: -0.025, y: 0},
      {x: -0.02, y: -0.020},
      {x: -0.01, y: -0.025},
    ];
    this.color = 'red';
    this.rot = 0;

    this.friction = 0.84;
    this.acceleration = 0.00065;
    this.velocity = {x: 0, y:0};
    this.direction = Vec2.norm(Vec2.sub(this.player.center, this.center));

    this.fireDelay = 80;
    this.fireFrameCount = 0;

    this.strength = 0.1;
    this.souls = 22;
    this.score = 100;
  }


  update() {
    const shootingMaxDistance = 0.28;
    const idealMaxDistance = 0.22;
    const idealMinDistance = 0.15;
    const towardsPlayer = Vec2.sub(this.player.center, this.center)
    const distance = Vec2.mag(towardsPlayer);
    
    // Should the shooter approach or retreat?
    // It might be happy with its distance and not do either
    if(distance > idealMaxDistance) {
      // Approach
      this.velocity = Vec2.add(this.velocity, Vec2.sMul(Vec2.norm(towardsPlayer), this.acceleration));
    } else if (distance < idealMinDistance) {
      // Retreat
      this.velocity = Vec2.sub(this.velocity, Vec2.sMul(Vec2.norm(towardsPlayer), this.acceleration));
    }

    this.fireFrameCount++;
    if(distance < shootingMaxDistance && this.fireFrameCount >= this.fireDelay) {
      this.fireFrameCount = 0;

      this.manager.shootAt(this, this.center, this.player.center);
      const recoilForce = 0.01;
      this.velocity = Vec2.add(this.velocity, Vec2.sMul(Vec2.norm(Vec2.sub(this.center, this.player.center)), recoilForce));
    }

    this.velocity = Vec2.sMul(this.velocity, this.friction);
    this.center = Vec2.add(this.center, this.velocity)

    this.rot = Vec2.getRotation(towardsPlayer);
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
      case 'Arena':
        this.fireFrameCount = 0;
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


