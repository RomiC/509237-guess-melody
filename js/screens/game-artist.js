import GameArtistView from "./game-artist-view";
import switchAppScreen from '../util/switch-app-screen';
import changeQuestion from '../game';
import {questions, screens} from '../data/state-data';
import {getTimer} from '../data/game-data';

const gameArtist = (state) => {
  const gameArtistView = new GameArtistView(state);

  let timer = getTimer(state.timeLeft);
  const startTimer = () => {
    setTimeout(() => {

      // console.log(`tick`);
      const timeLeft = timer.tick().value;
      // console.log(timeLeft);
      state.timeLeft = timeLeft;
      startTimer();
    }, 1000);
  };
  startTimer();

  gameArtistView.onAnswerClick = (e) => {

    const isCorrect = questions[state.question].answers[e.target.id].isCorrect;
    const notesLeft = isCorrect ? state.notesLeft : state.notesLeft - 1;

    const nextQuestion = state.question + 1;
    const nextScreen = notesLeft > 0 && nextQuestion ? `game` : screens[state.screen].destination;

    const newState = Object.assign({}, state, {
      'screen': nextScreen,
      'question': nextQuestion,
      'answers': state.answers.concat({isCorrect, time: 30}),
      'notesLeft': notesLeft
    });

    switchAppScreen(changeQuestion(newState));
  };

  return gameArtistView;
};

export default (state) => gameArtist(state);

