

export default class ShipDestroySFX {
  constructor() {
    this.sfxArray = [
      "sfx/GameOver1.wav",
      "sfx/GameOver2.wav",
      "sfx/GameOver3.wav",
      "sfx/GameOver4.wav",
      "sfx/GameOver1.wav",
      "sfx/GameOver2.wav",
      "sfx/GameOver3.wav",
      "sfx/GameOver4.wav",
    ].map(path => {
      const sfx = new Audio(path);
      sfx.volume = 0.36;
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
