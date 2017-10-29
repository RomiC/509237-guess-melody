import {screens, questions, screenTypes, questionTypes} from './data/state-data';
import gameArtist from "./screens/game-artist";
import gameGenre from "./screens/game-genre";
import showWelcome from './screens/welcome';
import result from './screens/result';


const changeQuestion = (state) => {

  switch (screens[state.screen].type) {

    case screenTypes.SCREEN_WELCOME:

      return showWelcome(state);

    case screenTypes.SCREEN_GAME:

      switch (questions[state.question].type) {

        case questionTypes.QUESTION_ARTIST:

          return gameArtist(state);

        case questionTypes.QUESTION_GENRE:

          return gameGenre(state);

      }

      break;

    case screenTypes.SCREEN_RESULT:

      return result(state);

  }

  throw new Error();

};

export default (state) => changeQuestion(state);
