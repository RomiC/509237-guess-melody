const playerWrapper = (id, src) => `
      <div class="player-wrapper">
        <div class="player">
          <audio src="${src}" id="audio-${id}"></audio>
          <button class="player-control player-control--play"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>`.trim();

const playerHandler = (trigger, e, view) => {

  const audioAll = view.element.querySelectorAll(`audio`);
  const audioSelected = e.target.previousElementSibling;

  audioAll.forEach((audio) => {
    const button = audio.nextElementSibling;

    if (audio.id === audioSelected.id) {
      if (button.classList.contains(`player-control--play`)) {
        audio.play();
        button.classList.remove(`player-control--play`);
        button.classList.add(`player-control--pause`);
      } else {
        button.classList.remove(`player-control--pause`);
        button.classList.add(`player-control--play`);
        audio.pause();
      }
    } else {
      audio.pause();
      button.classList.remove(`player-control--pause`);
      button.classList.add(`player-control--play`);
    }
  });
};


export {playerWrapper, playerHandler};
