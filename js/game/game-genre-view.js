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

    const submitAnswerBtn = this.element.querySelector(`.genre-answer-send`);
    submitAnswerBtn.disabled = true;

    const answersForm = this.element.querySelector(`.genre`);

    const genrePlayersList = this.element.querySelectorAll(`.player`);


    [...genrePlayersList].forEach((trigger) => {

      trigger.onclick = (e) => {
        e.preventDefault();


        playerHandler(trigger, e, this);
      };
    });

    answersForm.onchange = (e) => {
      e.preventDefault();
      this.onAnswersFormChange();
    };

    answersForm.onsubmit = (e) => {
      e.preventDefault();
      const genreAnswersList = [...answersForm.answer];
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
    const submitAnswerBtn = this.element.querySelector(`.genre-answer-send`);
    const answersForm = this.element.querySelector(`.genre`);
    const genreAnswersList = [...answersForm.answer];
    submitAnswerBtn.disabled = !genreAnswersList.some((answer) => answer.checked);
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
