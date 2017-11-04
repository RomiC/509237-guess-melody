const playerWrapper = (id, src) => `
      <div class="player-wrapper">
        <div class="player">
          <audio preload="none" src="${src}" id="audio-${id}"></audio>
          <button class="player-control player-control--play"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>`.trim();


const updatePlayClasses = (element, play = false) => {
  if (play) {
    element.classList.remove(`player-control--play`);
    element.classList.add(`player-control--pause`);
  } else {
    element.classList.remove(`player-control--pause`);
    element.classList.add(`player-control--play`);
  }
};

const updateLoadingClasses = (element, loading = false, loaded = false) => {
  if (loading) {
    element.classList.add(`player-control--loading`);
  } else {
    element.classList.remove(`player-control--loading`);
  }

  if (loaded) {
    element.classList.add(`player-control--loaded`);
  } else {
    element.classList.remove(`player-control--loaded`);
  }
};

const fetchAudioAndPlay = (audio, button) => {
  updatePlayClasses(button, true);
  updateLoadingClasses(audio, true, false);
  fetch(audio.src)
      .then(() => {
        updateLoadingClasses(audio, false, true);
        audioPlay(audio, button);
      })
      .catch(() => {
        updateLoadingClasses(audio, false, false);
        updatePlayClasses(button, false);
      });
};

const audioPlay = (audio, button) => {
  updatePlayClasses(button, true);
  audio.play()
      .catch(() => {
        updateLoadingClasses(audio, false, false);
        updatePlayClasses(button, false);
      });
};

const audioPause = (audio, button) => {
  audio.pause();
  updatePlayClasses(button, false);
};

const isPlaying = (button) => {
  return button.classList.contains(`player-control--pause`);
};

const isLoaded = (audio) => {
  return audio.classList.contains(`player-control--loaded`);
};

const isLoading = (audio) => {
  return audio.classList.contains(`player-control--loading`);
};

const playerHandler = (trigger, e, view) => {

  const audioElementsList = view.element.querySelectorAll(`audio`);

  let selectedAudioElement;
  if (e.target.classList.contains(`player-control`)) {
    selectedAudioElement = e.target.previousElementSibling;
  } else {
    selectedAudioElement = e.target.querySelector(`audio`);
  }

  audioElementsList.forEach((audio) => {
    const button = audio.nextElementSibling;
    const trackIsPlaying = isPlaying(button);
    const trackIsLoaded = isLoaded(audio);
    const trackIsLoading = isLoading(audio);

    if (audio.id === selectedAudioElement.id) {
      if (!trackIsPlaying) {
        if (!trackIsLoaded || (!trackIsLoaded && !trackIsLoading)) {
          fetchAudioAndPlay(audio, button);
        } else {
          audioPlay(audio, button);
        }
      } else {
        audioPause(audio, button);
      }
    } else {
      audioPause(audio, button);
    }
  });
};


export {playerWrapper, playerHandler};
