import AbstractView from '../view';
import {getPlayerWrapper, onPlayerClick} from '../includes/player';

import {updateTimeElements} from './game-data';


const getGenreAnswerWrapper = (id, src) => `
        <div class="genre-answer">
          ${getPlayerWrapper(id, src)}
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
        ${this.question.answers.map((answer, index) => getGenreAnswerWrapper(index, answer.src)).join(``)}
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

    const genrePlayerElements = this.element.querySelectorAll(`.player`);

    for (const genrePlayerElement of genrePlayerElements) {
      genrePlayerElement.onclick = (e) => {
        e.preventDefault();
        onPlayerClick(genrePlayerElement, e, this);
      };
    }

    answersFormElement.onchange = (e) => {
      e.preventDefault();
      this.onAnswersFormChange();
    };

    answersFormElement.onsubmit = (e) => {
      e.preventDefault();
      const isCorrect = this.genreAnswersListElement.reduce((result, currentAnswer) => {

        result = (this.question.answers[currentAnswer.id].genre === this.question.genre) ? result && currentAnswer.checked : result && !currentAnswer.checked;

        return result;
      }, true);
      this.onAnswer(isCorrect);
    };

  }

  onAnswersFormChange() {
    this.submitAnswerBtnElement.disabled = !this.genreAnswersListElement.some((answer) => answer.checked);
  }

  updateTime(timeLeft) {
    updateTimeElements(timeLeft, this.timerElement, this.timeMinsElement, this.timeSecsElement);
  }

  static onAnswer(isCorrect) {
    return isCorrect;
  }
}


export default GameGenreView;
