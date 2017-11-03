import AbstractView from '../view';
import logo from '../includes/logo';
import data from './result-data';
import {getScore, getResultString, getStatString} from '../game/game-data';
import {InitialState} from "../data/state-data";


class ResultView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;

    if (!state.timeLeft > 0) {

      const result = {
        scoreCount: getScore(state.answers, state.notesLeft),
        notesLeft: state.notesLeft,
        timeLeft: state.timeLeft
      };
      data.timeOut.stat = getResultString(state.statistics, result);

      this.resultData = data.timeOut;

    } else if (!state.notesLeft > 0) {

      const result = {
        scoreCount: getScore(state.answers, state.notesLeft),
        notesLeft: state.notesLeft,
        timeLeft: state.timeLeft
      };
      data.attemptsOut.stat = getResultString(state.statistics, result);

      this.resultData = data.attemptsOut;

    } else {

      const scoreCount = getScore(state.answers, state.notesLeft);
      const result = {
        scoreCount,
        notesLeft: state.notesLeft,
        timeLeft: state.timeLeft
      };

      data.win.stat = getStatString(state, InitialState, scoreCount);

      data.win.comparison = getResultString(state.statistics, result);
      this.resultData = data.win;
    }
  }

  get template() {
    return (`
  <section class="main main--result">
    ${logo}
    
    <h2 class="title">${this.resultData.title}</h2>
    <div class="main-stat">${this.resultData.stat}</div>
    <span class="main-comparison">${this.resultData.comparison ? this.resultData.comparison : ``}</span>
    <span role="button" tabindex="0" class="main-replay">${this.resultData.replay}</span>
  </section>`.trim()
    );
  }

  bind() {
    const replayBtnElement = this.element.querySelector(`.main-replay`);

    replayBtnElement.onclick = (e) => {
      e.preventDefault();
      this.onReplay();
    };
  }

  onReplay() {

  }
}


export default ResultView;
