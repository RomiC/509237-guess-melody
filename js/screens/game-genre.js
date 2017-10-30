import GameGenreView from "./game-genre-view";
import switchAppScreen from '../util/switch-app-screen';
import changeQuestion from '../game';
import {questions, screens} from '../data/state-data';
import {getTimer} from "../data/game-data";
import completeAssign from '../util/complete-assign';

const gameGenre = (state) => {
  const gameGenreView = new GameGenreView(state);
  const startedTime = state.timeLeft;

  let timer;
  const startTimer = () => {
    timer = setTimeout(() => {
      const newTimerValue = getTimer(state.timeLeft).tick();
      state.timeLeft = newTimerValue.value;

      if (!newTimerValue.done) {
        gameGenreView.updateTime(state.minutesLeft, state.secondsLeft);
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

  gameGenreView.onSubmitAnswer = () => {

    clearTimeout(timer);

    const answersForm = gameGenreView.element.querySelector(`.genre`);
    const genreAnswersList = [...answersForm.answer];

    const isCorrect = genreAnswersList.reduce((result, currentAnswer) => {

      if (questions[state.question].answers[currentAnswer.id].isCorrect) {
        result = result && currentAnswer.checked;
      } else {
        result = result && !currentAnswer.checked;
      }

      return result;
    }, true);

    const notesLeft = isCorrect ? state.notesLeft : state.notesLeft - 1;
    const nextQuestion = state.question + 1;
    const nextScreen = notesLeft > 0 && questions[nextQuestion] ? `game` : screens[state.screen].destination;

    const newState = completeAssign({}, state, {
      'screen': nextScreen,
      'question': nextQuestion,
      'answers': state.answers.concat({isCorrect, time: startedTime - state.timeLeft}),
      'notesLeft': notesLeft
    });

    switchAppScreen(changeQuestion(newState));
  };

  return gameGenreView;
};

export default (state) => gameGenre(state);

