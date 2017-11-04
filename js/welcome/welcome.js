import switchAppScreen from '../util/switch-app-screen';
import {InitialState} from '../data/state-data';

import WelcomeView from './welcome-view';
import App from '../application';


class WelcomeScreen {

  init() {
    this.state = {notesLeft: InitialState.notesLeft, timeLeft: InitialState.timeLeft};

    this.view = new WelcomeView(this.state);
    switchAppScreen(this.view);

    this.view.onStart = () => {
      App.startGame();
    };
  }
}


export default new WelcomeScreen();
