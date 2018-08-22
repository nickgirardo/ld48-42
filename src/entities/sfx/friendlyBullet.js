import SFX from "../../sfx.js";

export default class FriendlyBulletSFX extends SFX {
  constructor() {
    super([
      "sfx/FriendlyBullet1.wav",
      "sfx/FriendlyBullet2.wav",
      "sfx/FriendlyBullet3.wav",
      "sfx/FriendlyBullet4.wav",
    ], 8);
  }
}
