import {levelTypes, initialState} from '../data/levels-data';
import {getScore, getResultString} from '../data/game-data';
import templateScreenWelcome from '../screens/template-screen-welcome';
import templateScreenArtist from '../screens/template-screen-artist';
import templateScreenGenre from '../screens/template-screen-genre';
import templateScreenResult from '../screens/template-screen-result';
import data from '../screens/screen-result-data';


const screenTemplate = (level, state) => {

  switch (level.type) {

    case levelTypes.LEVEL_WELCOME:
      return templateScreenWelcome;

    case levelTypes.LEVEL_ARTIST:

      return templateScreenArtist(level, state);

    case levelTypes.LEVEL_GENRE:

      return templateScreenGenre(level, state);

    case levelTypes.LEVEL_RESULT:

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

};

export default screenTemplate;
