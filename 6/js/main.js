(function () {
'use strict';

// Music from https://www.youtube.com/audiolibrary/music?feature=blog
var musicData = [
  {
    artist: `Kevin MacLeod`,
    name: `Long Stroll`,
    image: `https://yt3.ggpht.com/-fkDeGauT7Co/AAAAAAAAAAI/AAAAAAAAAAA/dkF5ZKkrxRo/s900-c-k-no-mo-rj-c0xffffff/photo.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=91624fdc22fc54ed`,
    genre: `Jazz`
  },
  {
    artist: `Jingle Punks`,
    name: `In the Land of Rhinoplasty`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dc3b4dc549becd6b`,
    genre: `Rock`
  },
  {
    artist: `Audionautix`,
    name: `Travel Light`,
    image: `http://4.bp.blogspot.com/-kft9qu5ET6U/VPFUBi9W-MI/AAAAAAAACYM/UxXilXKYwOc/s1600/audionautix%2BHalf%2BSize.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=a127d9b7de8a17cf`,
    genre: `Country`
  },
  {
    artist: `Riot`,
    name: `	Level Plane`,
    image: `https://i.ytimg.com/vi/jzgM3m8Vp1k/maxresdefault.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=dfb828f40096184c`,
    genre: `R&B`
  },
  {
    artist: `Jingle Punks`,
    name: `Lucky Day`,
    image: `https://i.vimeocdn.com/portrait/992615_300x300`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Pop`
  },
  {
    artist: `Gunnar Olsen`,
    name: `Home Stretch`,
    image: `https://f4.bcbits.com/img/0004181452_10.jpg`,
    src: `https://www.youtube.com/audiolibrary_download?vid=bcbe5be936a32fb1`,
    genre: `Electronic`
  }
];

const INIT_NOTES = 3;
const INIT_TIME = 300;

const initialState = {
  screen: `screen-welcome`,
  question: `question-1`,
  notesLeft: INIT_NOTES,
  timeLeft: INIT_TIME,
  statistics: [],
  answers: [],

  get timeSpend() {
    return INIT_TIME - this.timeLeft;
  },

  get minutesLeft() {
    return Math.floor(this.timeLeft / 60);
  },

  get secondsLeft() {
    return this.timeLeft - this.minutesLeft * 60;
  },

  get minutesSpend() {
    return Math.floor(this.timeSpend / 60);
  },

  get secondsSpend() {
    return this.timeSpend - this.minutesSpend * 60;
  }
};

const questionTypes = {

  QUESTION_ARTIST: `levelArtist`,
  QUESTION_GENRE: `levelGenre`
};

const screenTypes = {
  SCREEN_WELCOME: `screenWelcome`,
  SCREEN_GAME: `screenGame`,
  SCREEN_RESULT: `screenResult`
};

const screens = {
  'screen-welcome': {
    type: screenTypes.SCREEN_WELCOME,
    destination: `screen-game`
  },
  'screen-game': {
    type: screenTypes.SCREEN_GAME,
    destination: `screen-result`
  },
  'screen-result': {
    type: screenTypes.SCREEN_RESULT,
    destination: `screen-welcome`
  }
};

const questions = {
  'question-1': {
    type: questionTypes.QUESTION_ARTIST,
    title: `Кто исполняет эту песню?`,
    answers: [
      {
        isCorrect: true,
        track: musicData[0]
      },
      {
        isCorrect: false,
        track: musicData[1]
      },
      {
        isCorrect: false,
        track: musicData[2]
      }
    ],
    next: `question-2`
  },

  'question-2': {
    type: questionTypes.QUESTION_GENRE,
    title: `Выберите инди-рок треки`,
    answers: [
      {
        isCorrect: true,
        track: musicData[0]
      },
      {
        isCorrect: false,
        track: musicData[1]
      },
      {
        isCorrect: false,
        track: musicData[2]
      },
      {
        isCorrect: false,
        track: musicData[3]
      }
    ],
    next: `question-3`
  },

  'question-3': {
    type: questionTypes.QUESTION_ARTIST,
    title: `Кто исполняет эту песню?`,
    answers: [
      {
        isCorrect: true,
        track: musicData[0]
      },
      {
        isCorrect: false,
        track: musicData[1]
      },
      {
        isCorrect: false,
        track: musicData[2]
      }
    ],
    next: `question-4`
  },

  'question-4': {
    type: questionTypes.QUESTION_GENRE,
    title: `Выберите инди-рок треки`,
    answers: [
      {
        isCorrect: true,
        track: musicData[0]
      },
      {
        isCorrect: false,
        track: musicData[1]
      },
      {
        isCorrect: false,
        track: musicData[2]
      },
      {
        isCorrect: false,
        track: musicData[3]
      }
    ],
    next: `question-5`
  },

  'question-5': {
    type: questionTypes.QUESTION_ARTIST,
    title: `Кто исполняет эту песню?`,
    answers: [
      {
        isCorrect: true,
        track: musicData[0]
      },
      {
        isCorrect: false,
        track: musicData[1]
      },
      {
        isCorrect: false,
        track: musicData[2]
      }
    ],
    next: `question-6`
  },

  'question-6': {
    type: questionTypes.QUESTION_GENRE,
    title: `Выберите инди-рок треки`,
    answers: [
      {
        isCorrect: true,
        track: musicData[0]
      },
      {
        isCorrect: false,
        track: musicData[1]
      },
      {
        isCorrect: false,
        track: musicData[2]
      },
      {
        isCorrect: false,
        track: musicData[3]
      }
    ],
    next: `question-7`
  },

  'question-7': {
    type: questionTypes.QUESTION_ARTIST,
    title: `Кто исполняет эту песню?`,
    answers: [
      {
        isCorrect: true,
        track: musicData[0]
      },
      {
        isCorrect: false,
        track: musicData[1]
      },
      {
        isCorrect: false,
        track: musicData[2]
      }
    ],
    next: `question-8`
  },

  'question-8': {
    type: questionTypes.QUESTION_GENRE,
    title: `Выберите инди-рок треки`,
    answers: [
      {
        isCorrect: true,
        track: musicData[0]
      },
      {
        isCorrect: false,
        track: musicData[1]
      },
      {
        isCorrect: false,
        track: musicData[2]
      },
      {
        isCorrect: false,
        track: musicData[3]
      }
    ],
    next: `question-9`
  },

  'question-9': {
    type: questionTypes.QUESTION_ARTIST,
    title: `Кто исполняет эту песню?`,
    answers: [
      {
        isCorrect: true,
        track: musicData[0]
      },
      {
        isCorrect: false,
        track: musicData[1]
      },
      {
        isCorrect: false,
        track: musicData[2]
      }
    ],
    next: `question-10`
  },

  'question-10': {
    type: questionTypes.QUESTION_GENRE,
    title: `Выберите инди-рок треки`,
    answers: [
      {
        isCorrect: true,
        track: musicData[0]
      },
      {
        isCorrect: false,
        track: musicData[1]
      },
      {
        isCorrect: false,
        track: musicData[2]
      },
      {
        isCorrect: false,
        track: musicData[3]
      }
    ],
    next: ``
  },
};

const getScore = (answersArray = [], notesLeft = 0, totalQuestions = 10) => {

  // Пример объекта с ответом:
  // {
  //   isCorrect: true,
  //   time: 30
  // }

  let scoreCount = 0;

  // Если игрок ответил меньше, чем на 10 вопросов, то игра считается непройденой и функция должна вернуть -1
  if (answersArray.length < totalQuestions) {
    scoreCount = -1;
    return scoreCount;
  }

  // Подсчет баллов если все 10 вопросов отвечены
  scoreCount = answersArray.reduce((accumulator, currentAnswer) => {

    let scoreAnswer = 0;

    if (currentAnswer.isCorrect) {
      // За правильный ответ 1 балл
      if (currentAnswer.time >= 30) {
        scoreAnswer = 1;
      } else {
        // За быстрый правильный ответ (менее 30 секунд) — 2 балла
        scoreAnswer = 2;
      }
    }

    return accumulator + scoreAnswer;
  }, 0);

  // За каждую соверешнную ошибку вычитается 2 балла, но в 0 уйти нельзя
  scoreCount = Math.max(0, scoreCount - (3 - notesLeft));


  return scoreCount;

};

const getResultString = (statistics = [], result) => {

  if (result.timeLeft === 0) {
    return `Время вышло! Вы не успели отгадать все мелодии`;
  }

  if (result.notesLeft === 0) {
    return `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  }

  statistics.push(result.scoreCount);
  statistics.sort((a, b) => a - b);

  const statisticsCount = statistics.length;
  const betterResultsCount = statistics.findIndex((it) => it === result.scoreCount);
  const resultPlace = statisticsCount - betterResultsCount;
  const resultPercent = (betterResultsCount / statisticsCount) * 100;


  return `Вы заняли ${resultPlace}-ое место из ${statisticsCount} игроков. Это лучше чем у ${resultPercent}% игроков`;
};

const logo = `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>`;

const templateScreenWelcome = (state) => `
  <section class="main main--welcome">
    ${logo}
    
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты — зa ${state.minutesLeft} минут ответить на все вопросы.<br>
      Ошибиться можно ${state.notesLeft} раза.<br>
      Удачи!
    </p>
  </section>`.trim();

const headerTimerValue = (mins, secs) => `
      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${mins}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${secs}</span>
      </div>`.trim();

const headerMistakes = (notesLeft) => `
    <div class="main-mistakes">
    ${new Array(notesLeft).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(`\n`)}
    </div>`.trim();

const headerSvgCircle = `
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      ${headerTimerValue(`05`, `00`)}
    </svg>`.trim();

const templateHeader = (state) => `
    ${headerSvgCircle}
    ${headerMistakes(state.notesLeft)}`;

const playerWrapper = (id, src) => `
      <div class="player-wrapper">
        <div class="player">
          <audio src="${src}" id="audio-${id}"></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>`.trim();


const playerHandler = (trigger) => {

  const audio = trigger.querySelector(`audio`);
  const button = trigger.querySelector(`button`);
  if (button.classList.contains(`player-control--pause`)) {
    audio.play();
    button.classList.remove(`player-control--pause`);
    button.classList.add(`player-control--play`);
  } else {
    button.classList.remove(`player-control--play`);
    button.classList.add(`player-control--pause`);
    audio.pause();
  }
};

const artistAnswerWrapper = (id, artist, image) => `
        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="${id}" name="answer" value="${id}"/>
          <label class="main-answer" for="${id}">
            <img class="main-answer-preview" src="${image}"
                 alt="${artist}" width="134" height="134">
            ${artist}
          </label>
        </div>`.trim();

const templateScreenArtist = (question, state) => `
  <section class="main main--level main--level-artist">
    ${templateHeader(state)}

    <div class="main-wrap">
      <h2 class="title main-title">${question.title}</h2>

      ${playerWrapper(0, question.answers.reduce((correctAnswer, currentAnswer) => {
    correctAnswer = currentAnswer.isCorrect ? currentAnswer : correctAnswer;
    return correctAnswer;
  }, {}).track.src)}
      
      <form class="main-list">

      ${question.answers.map((answer, index) => artistAnswerWrapper(index, answer.track.artist, answer.track.image)).join(``)}
      </form>
    </div>
  </section>`.trim();

const genreAnswerWrapper = (id, src) => `
        <div class="genre-answer">
          ${playerWrapper(id, src)}
          <input type="checkbox" name="answer" value="${id}" id="${id}">
          <label class="genre-answer-check" for="${id}"></label>
        </div>`.trim();

const templateScreenGenre = (question, state) => `
  <section class="main main--level main--level-genre">
    ${templateHeader(state)}

    <div class="main-wrap">
      <h2 class="title">${question.title}</h2>
      <form class="genre">
        ${question.answers.map((answer, index) => genreAnswerWrapper(index, answer.track.src)).join(``)}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>`.trim();

const templateScreenResult = (resultData) => `
  <section class="main main--result">
    ${logo}
    
    <h2 class="title">${resultData.title}</h2>
    <div class="main-stat">${resultData.stat}</div>
    <span class="main-comparison">${resultData.comparison}</span>
    <span role="button" tabindex="0" class="main-replay">${resultData.replay}</span>
  </section>`.trim();

const data = {
  win: {
    title: `Вы настоящий меломан!`,
    // stat: `За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
    //   <br>вы&nbsp;набрали 12 баллов (8 быстрых)
    //   <br>совершив 3 ошибки`,
    // comparison: `Вы заняли 2 место из 10. Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков`,
    replay: `Сыграть ещё раз`
  },
  attemptsOut: {
    title: `Какая жалость!`,
    // stat: `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`,
    comparison: ``,
    replay: `Попробовать ещё раз`
  },
  timeOut: {
    title: `Увы и ах!`,
    // stat: `Время вышло!<br>Вы не успели отгадать все мелодии`,
    comparison: ``,
    replay: `Попробовать ещё раз`
  },

};

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

const getElementFromTemplate = (template) => {
  const outer = document.createElement(`div`);
  outer.innerHTML = template;
  return outer.firstElementChild;
};

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

            const nextQuestion = questions[state.question].next;
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

            const nextQuestion = questions[state.question].next;
            const nextScreen = notesLeft > 0 && nextQuestion ? `screen-game` : screens[state.screen].destination;

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

switchAppScreen(initialState);

}());

//# sourceMappingURL=main.js.map
