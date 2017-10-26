import GameGenreView from "./game-genre-view";
import switchAppScreen from '../util/switch-app-screen';
import changeQuestion from '../game';
import {questions, screens} from '../data/state-data';

const gameGenre = (state) => {
  const gameGenreView = new GameGenreView(state);

  gameGenreView.onSubmitAnswer = () => {

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

    const newState = Object.assign({}, state, {
      'screen': nextScreen,
      'question': nextQuestion,
      'answers': state.answers.concat({isCorrect, time: 30}),
      'notesLeft': notesLeft
    });

    switchAppScreen(changeQuestion(newState));
  };

  return gameGenreView;
};

export default (state) => gameGenre(state);

