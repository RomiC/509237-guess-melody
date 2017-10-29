(function () {
'use strict';

const app = document.querySelector(`.app`);


const switchAppScreen = (screen) => {
  app.replaceChild(screen.element, app.querySelector(`.main`));
};

const getElementFromTemplate = (template) => {
  const outer = document.createElement(`div`);
  outer.innerHTML = template;
  return outer.firstElementChild;
};

class AbstractView {

  get template() {
    throw new Error(`You have to define template for view`);
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {

  }

  getMarkup() {
    this._element = this.render();
    this.bind();
  }

  get element() {
    if (!this._element) {
      this.getMarkup();
    }
    return this._element;
  }

}

const logo = `<section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>`;

class WelcomeView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return (`
  <section class="main main--welcome">
    ${logo}
    
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты — зa ${this.state.minutesLeft} минут ответить на все вопросы.<br>
      Ошибиться можно ${this.state.notesLeft} раза.<br>
      Удачи!
    </p>
  </section>`.trim()
    );
  }

  bind() {
    const buttonPlay = this.element.querySelector(`.main-play`);

    buttonPlay.onclick = (e) => {
      e.preventDefault();
      this.onStart();
    };
  }

  onStart() {

  }
}

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
  screen: `welcome`,
  question: 0,
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
  'welcome': {
    type: screenTypes.SCREEN_WELCOME,
    destination: `game`
  },
  'game': {
    type: screenTypes.SCREEN_GAME,
    destination: `result`
  },
  'result': {
    type: screenTypes.SCREEN_RESULT,
    destination: `welcome`
  }
};

const questions = [
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  },
  {
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
    ]
  }
];

const headerTimerValue = (mins, secs) => `
      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${mins}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${secs}</span>
      </div>`.trim();

const headerMistakes = (notesLeft) => `
    <div class="main-mistakes">
    ${new Array(notesLeft).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``)}
    </div>`.trim();

const headerSvgCircle = (state) => `
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      ${headerTimerValue(state.minutesLeft, state.secondsLeft)}
    </svg>`.trim();

const templateHeader = (state) => `
    ${headerSvgCircle(state)}
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


const playerHandler = (trigger, e, view) => {

  const audioAll = view.element.querySelectorAll(`audio`);
  const audioSelected = e.target.previousElementSibling;

  audioAll.forEach((audio) => {

    const button = audio.nextElementSibling;

    if (audio.id === audioSelected.id) {
      if (button.classList.contains(`player-control--pause`)) {
        audio.play();
        button.classList.remove(`player-control--pause`);
        button.classList.add(`player-control--play`);
      } else {
        button.classList.remove(`player-control--play`);
        button.classList.add(`player-control--pause`);
        audio.pause();
      }
    } else {
      audio.pause();
      button.classList.remove(`player-control--play`);
      button.classList.add(`player-control--pause`);
    }
  });
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


class GameArtistView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return (`
  <section class="main main--level main--level-artist">
    ${templateHeader(this.state)}

    <div class="main-wrap">
      <h2 class="title main-title">${questions[this.state.question].title}</h2>

      ${playerWrapper(0, questions[this.state.question].answers.reduce((correctAnswer, currentAnswer) => {
        correctAnswer = currentAnswer.isCorrect ? currentAnswer : correctAnswer;
        return correctAnswer;
      }, {}).track.src)}
      
      <form class="main-list">

      ${questions[this.state.question].answers.map((answer, index) => artistAnswerWrapper(index, answer.track.artist, answer.track.image)).join(``)}
      </form>
    </div>
  </section>`.trim()
    );
  }

  bind() {

    this.timeMinsElement = this.element.querySelector(`.timer-value-mins`);
    this.timeSecsElement = this.element.querySelector(`.timer-value-secs`);

    const artistAnswersList = this.element.querySelectorAll(`.main-answer-r`);

    [...artistAnswersList].forEach((trigger) => {
      trigger.onclick = (e) => {
        e.preventDefault();
        this.onAnswerClick(e);
      };
    });

    const artistPlayersList = this.element.querySelectorAll(`.player`);

    [...artistPlayersList].forEach((trigger) => {

      trigger.onclick = (e) => {
        e.preventDefault();
        playerHandler(trigger, e, this);
      };

    });
  }

  updateTime(minutes, seconds) {
    this.timeMinsElement.textContent = minutes;
    this.timeSecsElement.textContent = seconds;
  }

  onAnswerClick() {

  }
}

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
    return `Время вышло!<br>Вы не успели отгадать все мелодии`;
  }

  if (result.notesLeft === 0) {
    return `У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`;
  }

  statistics.push(result.scoreCount);
  statistics.sort((a, b) => a - b);

  const statisticsCount = statistics.length;
  const betterResultsCount = statistics.findIndex((it) => it === result.scoreCount);
  const resultPlace = statisticsCount - betterResultsCount;
  const resultPercent = (betterResultsCount / statisticsCount) * 100;


  return `Вы заняли ${resultPlace}-ое место из ${statisticsCount} игроков. Это лучше чем у ${resultPercent}% игроков`;
};

const getQuickAnswersCount = (answersArray) => {

  // Подсчет быстрых ответов
  return answersArray.reduce((accumulator, currentAnswer) => {

    if (currentAnswer.isCorrect) {

      if (currentAnswer.time <= 30) {
        accumulator += 1;
      }
    }

    return accumulator;
  }, 0);
};

const getStatString = (state, initialState, scoreCount) =>
  `За ${state.minutesSpend} минуты и ${state.secondsSpend} секунд
   <br>вы набрали ${scoreCount} баллов (${getQuickAnswersCount(state.answers)} быстрых)
   <br>совершив ${initialState.notesLeft - state.notesLeft} ошибки`.trim();


const getTimer = (value) => {
  return {
    value,
    tick() {
      if (this.value > 0) {
        this.value -= 1;
      }

      return {value: this.value, done: this.value === 0};
    },
  };
};

// This is an assign function that copies full descriptors
function completeAssign(target, ...sources) {
  sources.forEach((source) => {
    let descriptors = Object.keys(source).reduce((descriptor, key) => {
      descriptor[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptor;
    }, {});
    // by default, Object.assign copies enumerable Symbols too
    Object.getOwnPropertySymbols(source).forEach((sym) => {
      let descriptor = Object.getOwnPropertyDescriptor(source, sym);
      if (descriptor.enumerable) {
        descriptors[sym] = descriptor;
      }
    });
    Object.defineProperties(target, descriptors);
  });
  return target;
}

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
        switchAppScreen(changeQuestion$1(newState));
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

    switchAppScreen(changeQuestion$1(newState));
  };

  return gameArtistView;
};

var gameArtist$1 = (state) => gameArtist(state);

const genreAnswerWrapper = (id, src) => `
        <div class="genre-answer">
          ${playerWrapper(id, src)}
          <input type="checkbox" name="answer" value="${id}" id="${id}">
          <label class="genre-answer-check" for="${id}"></label>
        </div>`.trim();

class GameGenreView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return (`
  <section class="main main--level main--level-genre">
    ${templateHeader(this.state)}

    <div class="main-wrap">
      <h2 class="title">${questions[this.state.question].title}</h2>
      <form class="genre">
        ${questions[this.state.question].answers.map((answer, index) => genreAnswerWrapper(index, answer.track.src)).join(``)}
        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>`.trim());

  }

  bind() {

    this.timeMinsElement = this.element.querySelector(`.timer-value-mins`);
    this.timeSecsElement = this.element.querySelector(`.timer-value-secs`);

    const submitAnswerBtn = this.element.querySelector(`.genre-answer-send`);
    submitAnswerBtn.disabled = true;

    const answersForm = this.element.querySelector(`.genre`);

    const genrePlayersList = this.element.querySelectorAll(`.player`);


    [...genrePlayersList].forEach((trigger) => {

      trigger.onclick = (e) => {
        e.preventDefault();


        playerHandler(trigger, e, this);
      };
    });

    answersForm.onchange = (e) => {
      e.preventDefault();
      this.onAnswersFormChange();
    };

    answersForm.onsubmit = (e) => {
      e.preventDefault();
      this.onSubmitAnswer();
    };

  }

  onAnswersFormChange() {
    const submitAnswerBtn = this.element.querySelector(`.genre-answer-send`);
    const answersForm = this.element.querySelector(`.genre`);
    const genreAnswersList = [...answersForm.answer];
    submitAnswerBtn.disabled = !genreAnswersList.some((answer) => answer.checked);
  }

  updateTime(minutes, seconds) {
    this.timeMinsElement.textContent = minutes;
    this.timeSecsElement.textContent = seconds;
  }

  onSubmitAnswer() {

  }

}

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
        switchAppScreen(changeQuestion$1(newState));
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

    switchAppScreen(changeQuestion$1(newState));
  };

  return gameGenreView;
};

var gameGenre$1 = (state) => gameGenre(state);

const data = {
  win: {
    title: `Вы настоящий меломан!`,
    replay: `Сыграть ещё раз`
  },
  attemptsOut: {
    title: `Какая жалость!`,
    replay: `Попробовать ещё раз`
  },
  timeOut: {
    title: `Увы и ах!`,
    replay: `Попробовать ещё раз`
  },

};

class ResultView extends AbstractView {
  constructor(state, onReplay) {
    super();
    this.state = state;
    this.onReplay = onReplay;

    if (!state.timeLeft > 0) {

      const result = {
        scoreCount: getScore(state.answers, state.notesLeft),
        notesLeft: state.notesLeft,
        timeLeft: state.timeLeft
      };
      data.timeOut.stat = getResultString(state.statistics, result);

      this.resultData = data.timeOut;

    } else if (!state.notesLeft > 0) {

      const result = {
        scoreCount: getScore(state.answers, state.notesLeft),
        notesLeft: state.notesLeft,
        timeLeft: state.timeLeft
      };
      data.attemptsOut.stat = getResultString(state.statistics, result);

      this.resultData = data.attemptsOut;

    } else {

      const scoreCount = getScore(state.answers, state.notesLeft);
      const result = {
        scoreCount,
        notesLeft: state.notesLeft,
        timeLeft: state.timeLeft
      };

      data.win.stat = getStatString(state, initialState, scoreCount);

      data.win.comparison = getResultString(state.statistics, result);
      this.resultData = data.win;
    }


  }

  get template() {
    return (`
  <section class="main main--result">
    ${logo}
    
    <h2 class="title">${this.resultData.title}</h2>
    <div class="main-stat">${this.resultData.stat}</div>
    <span class="main-comparison">${this.resultData.comparison ? this.resultData.comparison : ``}</span>
    <span role="button" tabindex="0" class="main-replay">${this.resultData.replay}</span>
  </section>`.trim()
    );
  }

  bind() {
    const replayBtn = this.element.querySelector(`.main-replay`);

    replayBtn.onclick = (e) => {
      e.preventDefault();
      this.onReplay();
    };
  }

  onReplay() {

  }
}

const result = (state) => {

  const onReplay = () => {
    const newState = completeAssign({}, state, {
      'screen': initialState.screen,
      'notesLeft': initialState.notesLeft,
      'timeLeft': initialState.timeLeft,
    });

    switchAppScreen(changeQuestion$1(newState));
  };

  return new ResultView(state, onReplay);

};

var result$1 = (state) => result(state);

const changeQuestion = (state) => {

  switch (screens[state.screen].type) {

    case screenTypes.SCREEN_WELCOME:

      return showWelcome(state);

    case screenTypes.SCREEN_GAME:

      switch (questions[state.question].type) {

        case questionTypes.QUESTION_ARTIST:

          return gameArtist$1(state);

        case questionTypes.QUESTION_GENRE:

          return gameGenre$1(state);

      }

      break;

    case screenTypes.SCREEN_RESULT:

      return result$1(state);

  }

  throw new Error();

};

var changeQuestion$1 = (state) => changeQuestion(state);

const welcome = (state) => {
  const welcomeView = new WelcomeView(state);

  welcomeView.onStart = () => {

    const nextScreen = screens[state.screen].destination;

    const nextState = completeAssign({}, state, {
      'screen': nextScreen,
      'question': initialState.question,
      'notesLeft': initialState.notesLeft,
      'timeLeft': initialState.timeLeft,
      'answers': initialState.answers
    });
    switchAppScreen(changeQuestion$1(nextState));
  };

  return welcomeView;
};

var showWelcome = (state) => welcome(state);

switchAppScreen(showWelcome(initialState));

}());

//# sourceMappingURL=main.js.map
