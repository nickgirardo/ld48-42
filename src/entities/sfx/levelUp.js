

export default class LevelUpSFX {
  constructor() {
    this.sfxArray = [
      "sfx/LevelUp.wav",
      "sfx/LevelUp.wav",
      "sfx/LevelUp.wav",
      "sfx/LevelUp.wav",
    ].map(path => {
      const sfx = new Audio(path);
      sfx.volume = 0.32;
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
