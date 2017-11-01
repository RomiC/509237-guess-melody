import {initialState} from './data/state-data';

import welcomeScreen from './welcome/welcome';
import gameScreen from './game/game';
import resultScreen from './result/result';


export default class Application {
  static showWelcome(state = initialState) {
    state.notesLeft = initialState.notesLeft;
    state.timeLeft = initialState.timeLeft;
    // state.answers = initialState.answers;
    state.answers = [];
    welcomeScreen.init(state);
  }

  static startGame(state = initialState) {
    gameScreen.init(state);
  }

  static result(state) {
    resultScreen.init(state);
  }
}
