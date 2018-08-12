

export default class FriendlyBulletSFX {
  constructor() {
    this.sfxArray = [
      "sfx/FriendlyBullet1.wav",
      "sfx/FriendlyBullet2.wav",
      "sfx/FriendlyBullet3.wav",
      "sfx/FriendlyBullet4.wav",
      "sfx/FriendlyBullet1.wav",
      "sfx/FriendlyBullet2.wav",
      "sfx/FriendlyBullet3.wav",
      "sfx/FriendlyBullet4.wav",
    ].map(path => {
      const sfx = new Audio(path);
      sfx.volume = 0.1;
      sfx.load();
      return sfx;
    });

    this.current = 0;
  }

  play() {
    if(this.sfxArray[this.current].currentTime == 0 || this.sfxArray[this.current].ended) {
			this.sfxArray[this.current].play();
		}
		this.current++;
    this.current %= this.sfxArray.length;
  }
}
