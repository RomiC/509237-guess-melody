import GameArtistView from "./game-artist-view";
import switchAppScreen from '../util/switch-app-screen';
import changeQuestion from '../game';
import {questions, screens} from '../data/state-data';
import {getTimer} from '../data/game-data';
import completeAssign from '../util/complete-assign';


const gameArtist = (state) => {
  const gameArtistView = new GameArtistView(state);
  const startedTime = state.timeLeft;

  let timer;
  const startTimer = () => {
    timer = setTimeout(() => {
      const newTimerValue = getTimer(state.timeLeft).tick();
      state.timeLeft = newTimerValue.value;

      if (!newTimerValue.done) {
        gameArtistView.updateTime(state.minutesLeft, state.secondsLeft);
        startTimer();
      } else {
        clearTimeout(timer);
        const newState = completeAssign({}, state, {
          'screen': `result`
        });
        switchAppScreen(changeQuestion(newState));
      }
    }, 1000);
  };
  startTimer();

  gameArtistView.onAnswerClick = (e) => {
    clearTimeout(timer);

    const isCorrect = questions[state.question].answers[e.target.id].isCorrect;
    const notesLeft = isCorrect ? state.notesLeft : state.notesLeft - 1;

    const nextQuestion = state.question + 1;
    const nextScreen = notesLeft > 0 && nextQuestion ? `game` : screens[state.screen].destination;

    const newState = completeAssign({}, state, {
      'screen': nextScreen,
      'question': nextQuestion,
      'answers': state.answers.concat({isCorrect, time: startedTime - state.timeLeft}),
      'notesLeft': notesLeft
    });

    switchAppScreen(changeQuestion(newState));
  };

  return gameArtistView;
};

export default (state) => gameArtist(state);

