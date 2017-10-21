import templateHeader from './header';
import {playerWrapper} from './player';

const artistAnswerWrapper = (id, artist, image) => `
        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="${id}" name="answer" value="${id}"/>
          <label class="main-answer" for="${id}">
            <img class="main-answer-preview" src="${image}"
                 alt="${artist}" width="134" height="134">
            ${artist}
          </label>
        </div>`.trim();

const templateScreenArtist = (question, state) => `
  <section class="main main--level main--level-artist">
    ${templateHeader(state)}

    <div class="main-wrap">
      <h2 class="title main-title">${question.title}</h2>

      ${playerWrapper(0, question.answers.reduce((correctAnswer, currentAnswer) => {
    correctAnswer = currentAnswer.isCorrect ? currentAnswer : correctAnswer;
    return correctAnswer;
  }, {}).track.src)}
      
      <form class="main-list">

      ${question.answers.map((answer, index) => artistAnswerWrapper(index, answer.track.artist, answer.track.image)).join(``)}
      </form>
    </div>
  </section>`.trim();


export default templateScreenArtist;
