import SFX from "../../sfx.js";

export default class EnemyHitSFX extends SFX {
  constructor() {
    super([
      "sfx/EnemyHit1.wav",
      "sfx/EnemyHit2.wav",
      "sfx/EnemyHit3.wav",
      "sfx/EnemyHit4.wav",
    ], 8);
  }
}
