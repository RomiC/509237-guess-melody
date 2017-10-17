import screenTemplate from './get-template-screen';
import getElementFromTemplate from './get-element-from-template';
import {initialState, levels, levelTypes} from '../data/levels-data';
import {playerHandler} from '../screens/player';

const app = document.querySelector(`.app`);

const switchAppScreen = (state) => {

  const element = getElementFromTemplate(screenTemplate(levels[state.level], state));

  switch (levels[state.level].type) {

    case levelTypes.LEVEL_WELCOME:
      const playBtn = element.querySelector(`.main-play`);

      const onPlayBtnClick = (e) => {
        e.preventDefault();

        const destination = levels[state.level].destination;

        switchAppScreen(Object.assign({}, state, {
          'level': destination,
          'notesLeft': initialState.notesLeft,
          'timeLeft': initialState.timeLeft,
          'answers': initialState.answers
        }));
      };

      playBtn.addEventListener(`click`, onPlayBtnClick);

      break;

    case levelTypes.LEVEL_ARTIST:
      const artistAnswersList = element.querySelectorAll(`.main-answer-r`);

      [...artistAnswersList].forEach((trigger) => {
        trigger.addEventListener(`click`, (e) => {
          e.preventDefault();
          onAnswerClick(e);
        });
      });

      const onAnswerClick = (e) => {

        const isCorrect = levels[state.level].answers[e.target.id].isCorrect;
        const notesLeft = isCorrect ? state.notesLeft : state.notesLeft - 1;

        e.preventDefault();

        const destination = notesLeft > 0 ? levels[state.level].destination : `level-result`;

        switchAppScreen(Object.assign({}, state, {
          'level': destination,
          'answers': state.answers.concat({isCorrect, time: 30}),
          'notesLeft': notesLeft
        }));
      };

      const artistPlayersList = element.querySelectorAll(`.player`);
      [...artistPlayersList].forEach((trigger) => {

        trigger.addEventListener(`click`, (e) => {
          e.preventDefault();
          playerHandler(trigger);
        });
      });

      break;

    case levelTypes.LEVEL_GENRE:

      const submitAnswerBtn = element.querySelector(`.genre-answer-send`);
      submitAnswerBtn.disabled = true;

      const answersForm = element.querySelector(`.genre`);
      const genreAnswersList = [...answersForm.answer];

      const onAnswersFormChange = (e) => {
        e.preventDefault();
        submitAnswerBtn.disabled = !genreAnswersList.some((answer) => answer.checked);
      };

      const onSubmitAnswer = (e) => {
        e.preventDefault();

        const isCorrect = genreAnswersList.reduce((result, currentAnswer) => {

          if (levels[state.level].answers[currentAnswer.id].isCorrect) {
            result = result && currentAnswer.checked;
          } else {
            result = result && !currentAnswer.checked;
          }

          return result;
        }, true);

        const notesLeft = isCorrect ? state.notesLeft : state.notesLeft - 1;

        genreAnswersList.forEach((checkbox) => {
          checkbox.checked = false;
        });
        submitAnswerBtn.disabled = true;

        const destination = notesLeft > 0 ? levels[state.level].destination : `level-result`;

        switchAppScreen(Object.assign({}, state, {
          'level': destination,
          'answers': state.answers.concat({isCorrect, time: 30}),
          'notesLeft': notesLeft
        }));

      };

      const genrePlayersList = element.querySelectorAll(`.player`);
      [...genrePlayersList].forEach((trigger) => {

        trigger.addEventListener(`click`, (e) => {
          e.preventDefault();
          playerHandler(trigger);
        });
      });

      answersForm.addEventListener(`change`, onAnswersFormChange);
      answersForm.addEventListener(`submit`, onSubmitAnswer);

      break;

    case levelTypes.LEVEL_RESULT:

      const replayBtn = element.querySelector(`.main-replay`);

      const onReplayBtnClick = (e) => {
        e.preventDefault();
        const destination = levels[state.level].destination;

        switchAppScreen(Object.assign({}, state, {
          'level': destination
        }));
      };

      replayBtn.addEventListener(`click`, onReplayBtnClick);

      break;

    default:
      break;
  }

  app.replaceChild(element, app.querySelector(`.main`));
};

export default switchAppScreen;
