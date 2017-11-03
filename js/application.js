import {initialState} from './data/state-data';
import {resultTypes} from './data/game-data';

import welcomeScreen from './welcome/welcome';
import GameScreen from './game/game';
import resultScreen from './result/result';
import SplashScreen from './splash/splash-screen';

import Loader from './loader';
import switchAppScreen from './util/switch-app-screen';

import {b64Encode, b64Decode} from './util/b64encoding';


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

export default class Application {
  static init(questions) {
    this.routes = {
      [ControllerId.WELCOME]: welcomeScreen,
      [ControllerId.GAME]: new GameScreen(questions),
      [ControllerId.RESULT]: resultScreen
    };

    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`=`);
      this.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = this.routes[id];

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
    let results = [];

    if (state.result === resultTypes.WIN) {
      Loader.loadResults()
          .then((jsonData) => {
            results = jsonData;
          })
          .then(() => Loader.saveResults(state))
          .then(() => {
            state.results = results;
            location.hash = `${ControllerId.RESULT}=${saveState(state)}`;
          })
          // Попытка отправить результат игры даже если не удалось загрузить результаты
          .catch(() => Loader.saveResults(state));

    } else {
      location.hash = `${ControllerId.RESULT}=${saveState(state)}`;
    }
  }

  static showSplash() {
    const splash = new SplashScreen();
    switchAppScreen(splash);

    Loader.loadData()
        .then((jsonData) => Application.init(jsonData))
        .catch(window.console.error);
  }
}
