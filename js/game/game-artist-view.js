import AbstractView from '../view';
import {getPlayerWrapper, onPlayerClick, playTrack} from '../includes/player';

import {updateTimeElements} from './game-data';


const getArtistAnswerWrapper = (id, artist, image) => `
        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="${id}" name="answer" value="${id}"/>
          <label class="main-answer" for="${id}">
            <img class="main-answer-preview" src="${image}"
                 alt="${artist}" width="134" height="134">
            ${artist}
          </label>
        </div>`.trim();


class GameArtistView extends AbstractView {
  constructor(header, question) {
    super();
    this.question = question;
    this.header = header;
  }

  get template() {
    return (`
  <section class="main main--level main--level-artist">
    ${this.header.template}

    <div class="main-wrap">
      <h2 class="title main-title">${this.question.question}</h2>

      ${getPlayerWrapper(0, this.question.src)}
      
      <form class="main-list">

      ${this.question.answers.map((answer, index) => getArtistAnswerWrapper(index, answer.title, answer.image.url)).join(``)}
      </form>
    </div>
  </section>`.trim()
    );
  }

  bind() {
    this.timerElement = this.element.querySelector(`.timer-value`);
    this.timeMinsElement = this.timerElement.querySelector(`.timer-value-mins`);
    this.timeSecsElement = this.timerElement.querySelector(`.timer-value-secs`);
    const artistAnswerElements = this.element.querySelectorAll(`.main-answer-r`);

    for (const artistAnswerElement of artistAnswerElements) {
      artistAnswerElement.onclick = (e) => {
        e.preventDefault();
        const isCorrect = this.question.answers[e.target.id].isCorrect;
        this.onAnswer(isCorrect);
      };
    }

    const artistPlayerElement = this.element.querySelector(`.player`);

    playTrack(artistPlayerElement);

    artistPlayerElement.onclick = (e) => {
      e.preventDefault();
      onPlayerClick(artistPlayerElement, e, this);
    };
  }

  updateTime(timeLeft) {
    updateTimeElements(timeLeft, this.timerElement, this.timeMinsElement, this.timeSecsElement);
  }

  static onAnswer(isCorrect) {
    return isCorrect;
  }

}


export default GameArtistView;
