import {screenTypes, questionTypes, initialState} from '../data/state-data';
import {getScore, getResultString} from '../data/game-data';
import templateScreenWelcome from '../screens/template-screen-welcome';
import templateScreenArtist from '../screens/template-screen-artist';
import templateScreenGenre from '../screens/template-screen-genre';
import templateScreenResult from '../screens/template-screen-result';
import data from '../screens/screen-result-data';


const screenTemplate = (screen, question, state) => {

  switch (screen.type) {

    case screenTypes.SCREEN_WELCOME:
      return templateScreenWelcome(state);

    case screenTypes.SCREEN_GAME:

      switch (question.type) {
        case questionTypes.QUESTION_ARTIST:
          return templateScreenArtist(question, state);

        case questionTypes.QUESTION_GENRE:
          return templateScreenGenre(question, state);

        default:
          break;
      }
      break;

    case screenTypes.SCREEN_RESULT:

      if (!state.notesLeft > 0) {

        const result = {
          scoreCount: getScore(state.answers, state.notesLeft),
          notesLeft: state.notesLeft
        };
        data.attemptsOut.stat = getResultString(state.statistics, result);

        return templateScreenResult(data.attemptsOut);

      } else if (!state.timeLeft > 0) {

        const result = {
          scoreCount: getScore(state.answers, state.notesLeft),
          notesLeft: state.notesLeft
        };
        data.timeOut.stat = getResultString(state.statistics, result);

        return templateScreenResult(data.timeOut);

      } else {

        const scoreCount = getScore(state.answers, state.notesLeft);
        const result = {
          scoreCount,
          notesLeft: state.notesLeft
        };

        data.win.stat = `
          За ${state.minutesSpend} минуты и ${state.secondsSpend} секунд
          <br>вы набрали ${scoreCount} баллов (0 быстрых)
          <br>совершив ${initialState.notesLeft - state.notesLeft} ошибки`.trim();

        data.win.comparison = getResultString(state.statistics, result);
        return templateScreenResult(data.win);
      }

    default:
      return ``;
  }

  return ``;

};

export default screenTemplate;
