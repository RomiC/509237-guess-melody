import switchAppScreen from '../util/switch-app-screen';
import ResultView from './result-view';
import changeQuestion from '../game';
import {initialState} from "../data/state-data";
import completeAssign from '../util/complete-assign';


const result = (state) => {

  const onReplay = () => {
    const newState = completeAssign({}, state, {
      'screen': initialState.screen,
      'notesLeft': initialState.notesLeft,
      'timeLeft': initialState.timeLeft,
    });

    switchAppScreen(changeQuestion(newState));
  };

  return new ResultView(state, onReplay);

};

export default (state) => result(state);
