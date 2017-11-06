const processUrlArray = (arr, fn) => {
  return arr.reduce(
      (p, v) => p.then((a) => fn(v).then((r) => a.concat([r]))),
      Promise.resolve([])
  );
};

const getUrlArray = (data) => {
  let urlArray = [];

  for (const question of data) {
    if (question.src) {
      urlArray.push(question.src);
    } else {
      for (const answer of question.answers) {
        if (!urlArray.includes(answer.src)) {
          urlArray.push(answer.src);
        }
      }
    }
  }

  return urlArray;
};


class AudioPreloader {
  constructor() {
    this._preloadedAudios = {};
    this.pushAudio = this.pushAudio.bind(this);
    this.fetchAudio = this.fetchAudio.bind(this);
    this.getAudio = this.getAudio.bind(this);
  }

  getAudio(src) {
    return this._preloadedAudios[src];
  }

  pushAudio(src, blob) {
    const audio = new Audio();
    audio.src = URL.createObjectURL(blob);
    this._preloadedAudios[src] = audio;
  }

  fetchAudio(src) {
    return fetch(src)
        .then((res) => res.blob())
        .then((blob)=>{
          this.pushAudio(src, blob);
        })
        .catch((e) => {
          window.console.error(`Unable to fetch ${src}: ${e}`);
        });
  }

  preloadAudios(data) {
    const srcArray = getUrlArray(data);
    return processUrlArray(srcArray, this.fetchAudio);
  }
}

export default new AudioPreloader();
