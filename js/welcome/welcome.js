import switchAppScreen from '../util/switch-app-screen';
import {INIT_NOTES, INIT_TIME} from '../data/state-data';

import WelcomeView from './welcome-view';
import App from '../application';


class WelcomeScreen {

  init() {
    this.state = {};
    this.state.notesLeft = INIT_NOTES;
    this.state.timeLeft = INIT_TIME;

    this.view = new WelcomeView(this.state);
    switchAppScreen(this.view);

    this.view.onStart = () => {
      App.startGame();
    };
  }
}


export default new WelcomeScreen();
