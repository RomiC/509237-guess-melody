import AudioPreloader from '../audio-preloader';

const getPlayerWrapper = (id, src) => `
      <div class="player-wrapper">
        <div class="player">
          <audio preload="none" src="${AudioPreloader.getAudio(src).src}" id="audio-${id}"></audio>
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

const playAudio = (audioElement, button) => {
  updatePlayClasses(button, true);
  audioElement.play()
      .catch(() => {
        updatePlayClasses(button, false);
      });
};

const pauseAudio = (audioElement, button) => {
  audioElement.pause();
  updatePlayClasses(button, false);
};

const isPlaying = (button) => {
  return button.classList.contains(`player-control--pause`);
};

const onPlayerClick = (trigger, e, view) => {

  const audioElements = view.element.querySelectorAll(`audio`);
  const selectedAudioElement = (e.target.classList.contains(`player-control`)) ? e.target.previousElementSibling : e.target.querySelector(`audio`);

  for (const audioElement of audioElements) {
    const button = audioElement.nextElementSibling;
    const trackIsPlaying = isPlaying(button);

    if (audioElement.id === selectedAudioElement.id) {
      if (!trackIsPlaying) {
        playAudio(audioElement, button);
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
  playAudio(audioElement, button);
};


export {getPlayerWrapper, onPlayerClick, playTrack};
