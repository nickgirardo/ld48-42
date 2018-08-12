

export default class EnemyBulletSFX {
  constructor() {
    this.sfxArray = [
      "sfx/EnemyBullet1.wav",
      "sfx/EnemyBullet2.wav",
      "sfx/EnemyBullet3.wav",
      "sfx/EnemyBullet4.wav",
      "sfx/EnemyBullet1.wav",
      "sfx/EnemyBullet2.wav",
      "sfx/EnemyBullet3.wav",
      "sfx/EnemyBullet4.wav",
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
