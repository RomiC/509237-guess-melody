import AbstractView from '../view';
import {playerWrapper, playerHandler} from '../includes/player';


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
      <h2 class="title main-title">${this.question.title}</h2>

      ${playerWrapper(0, this.question.answers.reduce((correctAnswer, currentAnswer) => {
        correctAnswer = currentAnswer.isCorrect ? currentAnswer : correctAnswer;
        return correctAnswer;
      }, {}).track.src)}
      
      <form class="main-list">

      ${this.question.answers.map((answer, index) => artistAnswerWrapper(index, answer.track.artist, answer.track.image)).join(``)}
      </form>
    </div>
  </section>`.trim()
    );
  }

  bind() {

    this.timeMinsElement = this.element.querySelector(`.timer-value-mins`);
    this.timeSecsElement = this.element.querySelector(`.timer-value-secs`);

    const artistAnswersList = this.element.querySelectorAll(`.main-answer-r`);

    [...artistAnswersList].forEach((trigger) => {
      trigger.onclick = (e) => {
        e.preventDefault();
        const isCorrect = this.question.answers[e.target.id].isCorrect;
        this.onAnswer(isCorrect);
      };
    });

    const artistPlayersList = this.element.querySelectorAll(`.player`);

    [...artistPlayersList].forEach((trigger) => {

      trigger.onclick = (e) => {
        e.preventDefault();
        playerHandler(trigger, e, this);
      };

    });
  }

  updateTime(minutes, seconds) {
    this.timeMinsElement.textContent = minutes;
    this.timeSecsElement.textContent = seconds;
  }

  static onAnswer(isCorrect) {

    return isCorrect;
  }

}

export default GameArtistView;
