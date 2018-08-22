import SFX from "../../sfx.js";

export default class EnemyBulletSFX extends SFX {
  constructor() {
    super([
      "sfx/EnemyBullet1.wav",
      "sfx/EnemyBullet2.wav",
      "sfx/EnemyBullet3.wav",
      "sfx/EnemyBullet4.wav",
    ], 8);
  }
}
