import AbstractView from '../view';
import {playerWrapper, playerHandler} from '../includes/player';

import {RED_TIMER_VALUE} from './game-data';
import convertTime from '../util/convert-time';


const artistAnswerWrapper = (id, artist, image) => `
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

      ${playerWrapper(0, this.question.src)}
      
      <form class="main-list">

      ${this.question.answers.map((answer, index) => artistAnswerWrapper(index, answer.title, answer.image.url)).join(``)}
      </form>
    </div>
  </section>`.trim()
    );
  }

  bind() {
    this.timerElement = this.element.querySelector(`.timer-value`);
    this.timeMinsElement = this.timerElement.querySelector(`.timer-value-mins`);
    this.timeSecsElement = this.timerElement.querySelector(`.timer-value-secs`);
    const artistAnswersListElement = this.element.querySelectorAll(`.main-answer-r`);

    [...artistAnswersListElement].forEach((trigger) => {
      trigger.onclick = (e) => {
        e.preventDefault();
        const isCorrect = this.question.answers[e.target.id].isCorrect;
        this.onAnswer(isCorrect);
      };
    });

    const artistPlayersListElement = this.element.querySelectorAll(`.player`);

    [...artistPlayersListElement].forEach((trigger) => {
      trigger.onclick = (e) => {
        e.preventDefault();
        playerHandler(trigger, e, this);
      };

    });
  }

  updateTime(timeLeft) {
    const timeInfo = convertTime(timeLeft);
    this.timeMinsElement.textContent = `${timeInfo.minutesLeft}`;
    this.timeSecsElement.textContent = `${timeInfo.secondsLeft}`.padStart(2, `0`);

    if (timeLeft < RED_TIMER_VALUE) {
      this.timerElement.classList.add(`timer-value--finished`);
    }
  }

  static onAnswer(isCorrect) {
    return isCorrect;
  }

}


export default GameArtistView;
