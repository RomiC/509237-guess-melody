import {initialState} from './data/state-data';

import welcomeScreen from './welcome/welcome';
import gameScreen from './game/game';
import resultScreen from './result/result';


export default class Application {
  static showWelcome() {
    welcomeScreen.init();
  }

  static startGame(state = initialState) {
    gameScreen.init(state);
  }

  static result(state) {
    resultScreen.init(state);
  }
}
