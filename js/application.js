import {InitialState} from './data/state-data';
import {ResultTypes} from './game/game-data';
import Loader from './loader';
import AudioPreloader from './audio-preloader';

import switchAppScreen from './util/switch-app-screen';
import {b64Encode, b64Decode} from './util/b64encoding';

import welcomeScreen from './welcome/welcome';
import GameScreen from './game/game';
import resultScreen from './result/result';
import SplashScreen from './splash/splash-screen';


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
    return {
      notesLeft: InitialState.NOTES,
      timeLeft: InitialState.TIME,
      question: InitialState.QUESTION
    };
  }
};

export default class Application {
  static init(questions) {
    this.routes = {
      [ControllerId.WELCOME]: welcomeScreen,
      [ControllerId.GAME]: new GameScreen(questions),
      [ControllerId.RESULT]: resultScreen
    };

    const onHashChange = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`=`);
      this.changeHash(id, data);
    };
    window.onhashchange = onHashChange;
    onHashChange();
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

  static startGame(state = {
    notesLeft: InitialState.NOTES,
    timeLeft: InitialState.TIME,
    question: InitialState.QUESTION,
    answers: []
  }) {
    location.hash = `${ControllerId.GAME}=${saveState(state)}`;
  }

  static showResult(state) {
    let results = [];

    if (state.result === ResultTypes.WIN) {
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

    let data = {};
    Loader.loadData()
        .then((jsonData) => {
          data = jsonData;
          return AudioPreloader.preloadAudios(data);
        })
        .then(() => Application.init(data))
        .catch(window.console.error);
  }
}
