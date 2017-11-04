const playerWrapper = (id, src) => `
      <div class="player-wrapper">
        <div class="player">
          <audio preload="auto" src="${src}" id="audio-${id}"></audio>
          <button class="player-control player-control--play"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>`.trim();


const updateClasses = (element, play = false) => {
  if (play) {
    element.classList.remove(`player-control--play`);
    element.classList.add(`player-control--pause`);
  } else {
    element.classList.remove(`player-control--pause`);
    element.classList.add(`player-control--play`);
  }
};

const fetchAudioAndPlay = (audio, button) => {
  fetch(audio.src)
      .then(() => {
        return audio.play();
      })
      .catch(() => {
        updateClasses(button, false);
      });
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

    if (audio.id === selectedAudioElement.id) {
      if (button.classList.contains(`player-control--play`)) {
        fetchAudioAndPlay(audio, button);
        updateClasses(button, true);
      } else {
        updateClasses(button, false);
        audio.pause();
      }
    } else {
      audio.pause();
      updateClasses(button, false);
    }
  });
};


export {playerWrapper, playerHandler};
