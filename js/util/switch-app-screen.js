import screenTemplate from './get-template-screen';
import getElementFromTemplate from './get-element-from-template';
import {initialState, screens, screenTypes, questions, questionTypes} from '../data/state-data';
import {playerHandler} from '../screens/player';

const app = document.querySelector(`.app`);

const switchAppScreen = (state) => {

  const element = getElementFromTemplate(screenTemplate(screens[state.screen], questions[state.question], state));

  switch (screens[state.screen].type) {

    case screenTypes.SCREEN_WELCOME:
      const playBtn = element.querySelector(`.main-play`);

      const onPlayBtnClick = (e) => {
        e.preventDefault();

        const nextScreen = screens[state.screen].destination;

        switchAppScreen(Object.assign({}, state, {
          'screen': nextScreen,
          'question': initialState.question,
          'notesLeft': initialState.notesLeft,
          'timeLeft': initialState.timeLeft,
          'answers': initialState.answers
        }));
      };

      playBtn.addEventListener(`click`, onPlayBtnClick);

      break;

    case screenTypes.SCREEN_GAME:

      switch (questions[state.question].type) {

        case questionTypes.QUESTION_ARTIST:

          const artistAnswersList = element.querySelectorAll(`.main-answer-r`);

          [...artistAnswersList].forEach((trigger) => {
            trigger.addEventListener(`click`, (e) => {
              e.preventDefault();
              onAnswerClick(e);
            });
          });

          const onAnswerClick = (e) => {

            const isCorrect = questions[state.question].answers[e.target.id].isCorrect;
            const notesLeft = isCorrect ? state.notesLeft : state.notesLeft - 1;

            e.preventDefault();

            const nextQuestion = state.question + 1;
            const nextScreen = notesLeft > 0 && nextQuestion ? `screen-game` : screens[state.screen].destination;

            switchAppScreen(Object.assign({}, state, {
              'screen': nextScreen,
              'question': nextQuestion,
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

        case questionTypes.QUESTION_GENRE:

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

              if (questions[state.question].answers[currentAnswer.id].isCorrect) {
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

            const nextQuestion = state.question + 1;
            const nextScreen = notesLeft > 0 && questions[nextQuestion] ? `screen-game` : screens[state.screen].destination;

            switchAppScreen(Object.assign({}, state, {
              'screen': nextScreen,
              'question': nextQuestion,
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

      }

      break;

    case screenTypes.SCREEN_RESULT:

      const replayBtn = element.querySelector(`.main-replay`);

      const onReplayBtnClick = (e) => {
        e.preventDefault();

        switchAppScreen(Object.assign({}, state, {
          'screen': initialState.screen,
          'notesLeft': initialState.notesLeft,
          'timeLeft': initialState.timeLeft,
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
