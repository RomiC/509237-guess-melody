import {initialState} from './data/state-data';

import welcomeScreen from './welcome/welcome';
import gameScreen from './game/game';
import resultScreen from './result/result';

import {b64Encode, b64Decode} from "./util/b64encoding";


const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  RESULT: `result`
};

const saveState = (state) => {
  return b64Encode(JSON.stringify(state));
};

const loadState = (dataString) => {
  try {
    return JSON.parse(b64Decode(dataString));
  } catch (e) {
    return initialState;
  }
};

const routes = {
  [ControllerId.WELCOME]: welcomeScreen,
  [ControllerId.GAME]: gameScreen,
  [ControllerId.RESULT]: resultScreen
};

export default class Application {
  static init() {
    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`=`);
      this.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = routes[id];

    if (controller) {
      controller.init(loadState(data));
    }
  }

  static showWelcome() {
    location.hash = ControllerId.WELCOME;
  }

  static startGame(state = initialState) {
    location.hash = `${ControllerId.GAME}=${saveState(state)}`;
  }

  static result(state) {
    location.hash = `${ControllerId.RESULT}=${saveState(state)}`;
  }
}

Application.init();
