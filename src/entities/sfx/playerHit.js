import SFX from "../../sfx.js";

export default class PlayerHitSFX extends SFX {
  constructor() {
    super([
      "sfx/PlayerHit1.wav",
      "sfx/PlayerHit2.wav",
      "sfx/PlayerHit3.wav",
      "sfx/PlayerHit4.wav",
    ], 8);
  }
}
