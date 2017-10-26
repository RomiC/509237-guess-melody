import switchAppScreen from '../util/switch-app-screen';
import ResultView from './result-view';
import changeQuestion from '../game';
import {initialState} from "../data/state-data";

const result = (state) => {
  const welcomeView = new ResultView(state);

  welcomeView.onReplay = () => {

    const newState = Object.assign({}, state, {
      'screen': initialState.screen,
      'notesLeft': initialState.notesLeft,
      'timeLeft': initialState.timeLeft,
    });

    switchAppScreen(changeQuestion(newState));
  };

  return welcomeView;
};

export default (state) => result(state);
