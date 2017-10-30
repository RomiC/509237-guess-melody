import switchAppScreen from '../util/switch-app-screen';
import WelcomeView from './welcome-view';
import changeQuestion from '../game';
import {initialState, screens} from "../data/state-data";
import completeAssign from '../util/complete-assign';

const welcome = (state) => {
  const welcomeView = new WelcomeView(state);

  welcomeView.onStart = () => {

    const nextScreen = screens[state.screen].destination;

    const nextState = completeAssign({}, state, {
      'screen': nextScreen,
      'question': initialState.question,
      'notesLeft': initialState.notesLeft,
      'timeLeft': initialState.timeLeft,
      'answers': initialState.answers
    });
    switchAppScreen(changeQuestion(nextState));
  };

  return welcomeView;
};

export default (state) => welcome(state);
