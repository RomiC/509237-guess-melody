const playerWrapper = (id, src) => `
      <div class="player-wrapper">
        <div class="player">
          <audio src="${src}" id="audio-${id}"></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>`.trim();


const playerHandler = (trigger) => {

  const audio = trigger.querySelector(`audio`);
  const button = trigger.querySelector(`button`);
  if (button.classList.contains(`player-control--pause`)) {
    audio.play();
    button.classList.remove(`player-control--pause`);
    button.classList.add(`player-control--play`);
  } else {
    button.classList.remove(`player-control--play`);
    button.classList.add(`player-control--pause`);
    audio.pause();
  }
};

export {playerWrapper, playerHandler};
