import * as Util from "../../util.js";
import * as Vec2 from "../../vec2.js";

export default class Shooter {
  constructor(manager, player) {
    this.manager = manager;
    this.player = player

    this.name = "Shooter";
    this.isEnemy = true;

    this.center = {x: 0.6, y: 0.6};
    this.verts = [
      {x: 0.013, y: 0},
      {x: -0.012, y: 0.024},
      {x: -0.022, y: 0.018},
      {x: -0.026, y: 0},
      {x: -0.022, y: -0.018},
      {x: -0.012, y: -0.024},
    ];
    this.color = 'red';
    this.rot = 0;

    this.velocity = 0.0035;
    this.direction = Vec2.norm(Vec2.sub(this.player.center, this.center));

    this.fireDelay = 60;
    // The first shot takes 20 frames more than all of the rest
    this.fireFrameCount = -20;

    this.strength = 0.1;
  }


  update() {
    const idealMaxDistance = 0.22;
    const idealMinDistance = 0.15;
    const towardsPlayer = Vec2.sub(this.player.center, this.center)
    const distance = Vec2.mag(towardsPlayer);
    
    // Should the shooter approach or retreat?
    // It might be happy with its distance and not do either
    if(distance > idealMaxDistance) {
      // Approach
      this.center = Vec2.add(this.center, Vec2.sMul(Vec2.norm(towardsPlayer), this.velocity));
    } else if (distance < idealMinDistance) {
      // Retreat
      this.center = Vec2.sub(this.center, Vec2.sMul(Vec2.norm(towardsPlayer), this.velocity));
    }

    this.rot = Vec2.getRotation(towardsPlayer);

    // TODO check if inside bounds to shoot
    // TODO add recoil
    this.fireFrameCount++;
    if(this.fireFrameCount === this.fireDelay) {
      this.fireFrameCount = 0;

      this.manager.shootAt(this, this.center, this.player.center);
    }
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


