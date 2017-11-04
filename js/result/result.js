import switchAppScreen from '../util/switch-app-screen';
import ResultView from './result-view';
import App from '../application';

import {getScore} from '../game/game-data';


class ResultScreen {

  init(state) {

    this.state = state;

    const statistics = [];

    if (state.results) {
      for (const result of state.results) {
        const score = getScore(result.answers, result.notesLeft);
        statistics.push(score);
      }
    }

    this.state.statistics = statistics;

    this.view = new ResultView(state);
    switchAppScreen(this.view);

    this.view.onReplay = () => {
      App.showWelcome();
    };
  }
}


export default new ResultScreen();
