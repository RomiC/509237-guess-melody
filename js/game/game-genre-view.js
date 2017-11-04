import AbstractView from '../view';
import {playerWrapper, playerHandler} from '../includes/player';

import {RED_TIMER_VALUE} from './game-data';
import convertTime from '../util/convert-time';

const genreAnswerWrapper = (id, src) => `
        <div class="genre-answer">
          ${playerWrapper(id, src)}
          <input type="checkbox" name="answer" value="${id}" id="${id}">
          <label class="genre-answer-check" for="${id}"></label>
        </div>`.trim();

class GameGenreView extends AbstractView {
  constructor(header, question) {
    super();
    this.question = question;
    this.header = header;
  }

  get template() {
    return (`
  <section class="main main--level main--level-genre">
    ${this.header.template}

    <div class="main-wrap">
      <h2 class="title">${this.question.question}</h2>
      <form class="genre">
        ${this.question.answers.map((answer, index) => genreAnswerWrapper(index, answer.src)).join(``)}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>`.trim());

  }

  bind() {

    this.timerElement = this.element.querySelector(`.timer-value`);
    this.timeMinsElement = this.timerElement.querySelector(`.timer-value-mins`);
    this.timeSecsElement = this.timerElement.querySelector(`.timer-value-secs`);

    this.submitAnswerBtnElement = this.element.querySelector(`.genre-answer-send`);
    const answersFormElement = this.element.querySelector(`.genre`);
    this.genreAnswersListElement = [...answersFormElement.answer];

    this.submitAnswerBtnElement.disabled = true;

    const genrePlayersListElement = this.element.querySelectorAll(`.player`);

    [...genrePlayersListElement].forEach((trigger) => {

      trigger.onclick = (e) => {
        e.preventDefault();
        playerHandler(trigger, e, this);
      };
    });

    answersFormElement.onchange = (e) => {
      e.preventDefault();
      this.onAnswersFormChange();
    };

    answersFormElement.onsubmit = (e) => {
      e.preventDefault();
      const isCorrect = this.genreAnswersListElement.reduce((result, currentAnswer) => {

        if (this.question.answers[currentAnswer.id].genre === this.question.genre) {
          result = result && currentAnswer.checked;
        } else {
          result = result && !currentAnswer.checked;
        }

        return result;
      }, true);
      this.onAnswer(isCorrect);
    };

  }

  onAnswersFormChange() {
    this.submitAnswerBtnElement.disabled = !this.genreAnswersListElement.some((answer) => answer.checked);
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


export default GameGenreView;
