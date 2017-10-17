import templateHeader from './header';
import {playerWrapper} from './player';

const artistAnswerWrapper = (id, artist, image) => `
        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="${id}" name="answer" value="val-${id}"/>
          <label class="main-answer" for="${id}">
            <img class="main-answer-preview" src="${image}"
                 alt="${artist}" width="134" height="134">
            ${artist}
          </label>
        </div>`.trim();

const templateScreenArtist = (level, state) => `
  <section class="main main--level main--level-artist">
    ${templateHeader(state)}

    <div class="main-wrap">
      <h2 class="title main-title">${level.title}</h2>
      ${playerWrapper([...Object.entries(level.answers)].filter((answer) => answer[1].isCorrect)[0][0],
      [...Object.entries(level.answers)].filter((answer) => answer[1].isCorrect)[0][1].track.src)}
      <form class="main-list">
      ${[...Object.entries(level.answers)].map((answer) => artistAnswerWrapper(answer[0], answer[1].track.artist, answer[1].track.image)).join(``)}
      </form>
    </div>
  </section>`.trim();


export default templateScreenArtist;
