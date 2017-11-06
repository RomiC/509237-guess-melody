import AbstractView from '../view';
import logo from '../includes/logo';
import data from './result-data';
import {getScore, getResultString, getStatString, ResultTypes} from '../game/game-data';


class ResultView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;

    const scoreCount = getScore(state.answers, state.notesLeft);
    const result = {
      scoreCount,
      notesLeft: state.notesLeft,
      timeLeft: state.timeLeft,
      result: state.result
    };

    switch (state.result) {
      case ResultTypes.LOOSE_TIME:

        data.timeOut.stat = getResultString(state.statistics, result);

        this.resultData = data.timeOut;
        break;

      case ResultTypes.LOOSE_NOTES:

        data.attemptsOut.stat = getResultString(state.statistics, result);

        this.resultData = data.attemptsOut;
        break;

      case ResultTypes.WIN:

        data.win.stat = getStatString(state, scoreCount);

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
