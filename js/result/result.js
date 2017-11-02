import switchAppScreen from '../util/switch-app-screen';
import ResultView from './result-view';
import App from '../application';


class ResultScreen {

  init(state) {

    this.state = state;
    this.state.statistics = [1, 19, 18];

    this.view = new ResultView(state);

    switchAppScreen(this.view);

    this.view.onReplay = () => {
      App.showWelcome();
    };
  }
}

export default new ResultScreen();
