import * as Util from "../../util.js";
import * as Vec2 from "../../vec2.js";

export default class BasicEnemy {
  constructor(manager, player, center) {
    this.manager = manager;

    this.name = "BasicEnemy";
    this.isEnemy = true;

    // This property helps avoid a softlock
    this.firstEnemy = false;

    this.center = center;
    this.verts = [
      {x: 0.02, y: 0.02},
      {x: 0, y: 0.024},
      {x: -0.02, y: 0.02},
      {x: -0.024, y: 0},
      {x: -0.02, y: -0.02},
      {x: 0, y: -0.024},
      {x: 0.02, y: -0.02},
      {x: 0.024, y: 0},
    ];
    this.color = 'red';
    this.rot = 0;

    this.velocity = 0.003;
    this.currentDir = Math.random()*Math.PI*2;
    this.direction = Vec2.rotate(Vec2.up(), this.currentDir);

    this.strength = 0.15;
    this.souls = 16;
  }


  update() {
    const gameCenter = {x: 0.5, y: 0.5};
    const diff = Vec2.sub(gameCenter, this.center);
    this.direction = Vec2.norm(Vec2.add(this.direction, Vec2.div(diff,8)));
    this.center = Vec2.add(this.center, Vec2.sMul(this.direction, this.velocity));

    // TODO should this be based off of something?
    this.rot += 0.03;
  }

  draw(canvas, ctx) {
    Util.drawVec(canvas, ctx, this.center, this.verts, this.rot, this.color);
  }

  handleCollision(collision) {
    switch(collision.name) {
      case 'Player':
        // Game needs to spawn a new enemy to begin
        if(this.firstEnemy)
          this.manager.firstEnemyCollision()
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
