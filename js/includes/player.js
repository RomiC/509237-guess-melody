const getPlayerWrapper = (id, src) => `
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
        playAudio(audio, button);
      })
      .catch(() => {
        updateLoadingClasses(audio, false, false);
        updatePlayClasses(button, false);
      });
};

const playAudio = (audio, button) => {
  updatePlayClasses(button, true);
  audio.play()
      .catch(() => {
        updateLoadingClasses(audio, false, false);
        updatePlayClasses(button, false);
      });
};

const pauseAudio = (audio, button) => {
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

const onPlayerClick = (trigger, e, view) => {

  const audioElements = view.element.querySelectorAll(`audio`);
  const selectedAudioElement = (e.target.classList.contains(`player-control`)) ? e.target.previousElementSibling : e.target.querySelector(`audio`);

  for (const audioElement of audioElements) {
    const button = audioElement.nextElementSibling;
    const trackIsPlaying = isPlaying(button);
    const trackIsLoaded = isLoaded(audioElement);
    const trackIsLoading = isLoading(audioElement);

    if (audioElement.id === selectedAudioElement.id) {
      if (!trackIsPlaying) {
        if (!trackIsLoaded || (!trackIsLoaded && !trackIsLoading)) {
          fetchAudioAndPlay(audioElement, button);
        } else {
          playAudio(audioElement, button);
        }
      } else {
        pauseAudio(audioElement, button);
      }
    } else {
      pauseAudio(audioElement, button);
    }
  }
};

const playTrack = (playerElement) => {
  const audioElement = playerElement.querySelector(`audio`);
  const button = playerElement.querySelector(`button`);
  fetchAudioAndPlay(audioElement, button);
};


export {getPlayerWrapper, onPlayerClick, playTrack};
