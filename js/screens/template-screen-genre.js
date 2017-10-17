import levelHeader from './header';
import {playerWrapper} from './player';

const genreAnswerWrapper = (id, src) => `
        <div class="genre-answer">
          ${playerWrapper(id, src)}
          <input type="checkbox" name="answer" value="${id}" id="${id}">
          <label class="genre-answer-check" for="${id}"></label>
        </div>`.trim();

const templateScreenGenre = (level, state) => `
  <section class="main main--level main--level-genre">
    ${levelHeader(state)}

    <div class="main-wrap">
      <h2 class="title">${level.title}</h2>
      <form class="genre">
        ${[...Object.entries(level.answers)].map((answer) => genreAnswerWrapper(answer[0], answer[1].track.src)).join(``)}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>`.trim();


export default templateScreenGenre;
