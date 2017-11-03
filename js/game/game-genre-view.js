import AbstractView from '../view';
import {playerWrapper, playerHandler} from '../includes/player';


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

    this.timeMinsElement = this.element.querySelector(`.timer-value-mins`);
    this.timeSecsElement = this.element.querySelector(`.timer-value-secs`);

    const submitAnswerBtnElement = this.element.querySelector(`.genre-answer-send`);
    submitAnswerBtnElement.disabled = true;

    const answersFormElement = this.element.querySelector(`.genre`);
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
      const genreAnswersList = [...answersFormElement.answer];
      const isCorrect = genreAnswersList.reduce((result, currentAnswer) => {

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
    const submitAnswerBtnElement = this.element.querySelector(`.genre-answer-send`);
    const answersFormElement = this.element.querySelector(`.genre`);
    const genreAnswersListElement = [...answersFormElement.answer];
    submitAnswerBtnElement.disabled = !genreAnswersListElement.some((answer) => answer.checked);
  }

  updateTime(minutes, seconds) {
    this.timeMinsElement.textContent = minutes;
    this.timeSecsElement.textContent = seconds;
  }

  static onAnswer(isCorrect) {
    return isCorrect;
  }
}


export default GameGenreView;
