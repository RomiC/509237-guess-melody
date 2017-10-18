import levelHeader from './header';
import {playerWrapper} from './player';

const genreAnswerWrapper = (id, src) => `
        <div class="genre-answer">
          ${playerWrapper(id, src)}
          <input type="checkbox" name="answer" value="${id}" id="${id}">
          <label class="genre-answer-check" for="${id}"></label>
        </div>`.trim();

const templateScreenGenre = (question, state) => `
  <section class="main main--level main--level-genre">
    ${levelHeader(state)}

    <div class="main-wrap">
      <h2 class="title">${question.title}</h2>
      <form class="genre">
        ${question.answers.map((answer, index) => genreAnswerWrapper(index, answer.track.src)).join(``)}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>`.trim();


export default templateScreenGenre;
