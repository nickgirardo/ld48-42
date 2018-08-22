
export default class SFX {
  constructor(paths, numSounds = paths.length) {

    // In case we want more sounds to be playable at once
    // than the amound of paths given, this adds more tracks
    // as requested by numSounds param
    for(let i=0; numSounds > paths.length; i++) {
      paths.push(paths[i]);
    }

    this.sfxArray = paths.map(path => {
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
