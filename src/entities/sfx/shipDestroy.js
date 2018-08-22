import SFX from "../../sfx.js";

export default class ShipDestroySFX extends SFX {
  constructor() {
    super([
      "sfx/GameOver1.wav",
      "sfx/GameOver2.wav",
      "sfx/GameOver3.wav",
      "sfx/GameOver4.wav",
    ], 8);
  }
}
