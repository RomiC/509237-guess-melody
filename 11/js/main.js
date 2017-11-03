(function () {
'use strict';

const INIT_NOTES = 3;
const INIT_TIME = 300;

const initialState = {
  question: 0,
  notesLeft: INIT_NOTES,
  timeLeft: INIT_TIME,
};

const timeConverter = (timeLeft, initTime = initialState.timeLeft) => {
  const timeSpend = initTime - timeLeft;
  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft - minutesLeft * 60;
  const minutesSpend = Math.floor(timeSpend / 60);
  const secondsSpend = timeSpend - minutesSpend * 60;

  return {timeSpend, minutesLeft, secondsLeft, minutesSpend, secondsSpend};

};

const QUICK_ANSWER_TIME = 30;
const TOTAL_QUESTIONS = 10;

const questionTypes = {

  QUESTION_ARTIST: `artist`,
  QUESTION_GENRE: `genre`
};

const resultTypes = {
  WIN: `win`,
  LOOSE: `loose`
};

const getScore = (answersArray = [], notesLeft = 0, totalQuestions = TOTAL_QUESTIONS) => {

  // Пример массива с ответом:
  // [1, 30] = Правильный ответ за 30 секунд
  // [0, 12] = Неправильный ответ за 12 секунд

  let scoreCount = 0;

  // Если игрок ответил меньше, чем на 10 вопросов, то игра считается непройденой и функция должна вернуть -1
  if (answersArray.length < totalQuestions) {
    scoreCount = -1;
    return scoreCount;
  }

  // Подсчет баллов если все 10 вопросов отвечены
  scoreCount = answersArray.reduce((accumulator, currentAnswer) => {

    let scoreAnswer = 0;

    if (currentAnswer[0]) {
      // За правильный ответ 1 балл
      if (currentAnswer[1] >= QUICK_ANSWER_TIME) {
        scoreAnswer = 1;
      } else {
        // За быстрый правильный ответ (менее 30 секунд) — 2 балла
        scoreAnswer = 2;
      }
    }

    return accumulator + scoreAnswer;
  }, 0);

  // За каждую соверешнную ошибку вычитается 2 балла, но в 0 уйти нельзя
  scoreCount = Math.max(0, scoreCount - (INIT_NOTES - notesLeft));


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

    if (currentAnswer[0]) {

      if (currentAnswer[1] <= QUICK_ANSWER_TIME) {
        accumulator += 1;
      }
    }

    return accumulator;
  }, 0);
};

const getStatString = (state, initialState$$1, scoreCount) => {
  const timeInfo = timeConverter(state.timeLeft);

  return `За ${timeInfo.minutesSpend} минуты и ${timeInfo.secondsSpend} секунд
   <br>вы набрали ${scoreCount} баллов (${getQuickAnswersCount(state.answers)} быстрых)
   <br>совершив ${initialState$$1.notesLeft - state.notesLeft} ошибки`.trim();
};

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
    const timeInfo = timeConverter(this.state.timeLeft);

    return (`
  <section class="main main--welcome">
    ${logo}
    
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты — зa ${timeInfo.minutesLeft} минут ответить на все вопросы.<br>
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

class WelcomeScreen {

  init() {
    this.state = {};
    this.state.notesLeft = INIT_NOTES;
    this.state.timeLeft = INIT_TIME;
    this.view = new WelcomeView(this.state);

    switchAppScreen(this.view);

    this.view.onStart = () => {
      Application.startGame();
    };
  }
}


var welcomeScreen = new WelcomeScreen();

const getQuestion = (questions, num) => questions[num];

const nextQuestionState = (state, questions) => {
  const currentQuestion = state.question;

  let nextQuestion = currentQuestion;

  if (getQuestion(questions, currentQuestion + 1)) {

    nextQuestion = currentQuestion + 1;

  }

  const nextState = Object.assign({}, state);
  nextState.question = nextQuestion;

  return nextState;
};

const setNotes = (state, notes) => {
  if (notes < 0) {
    throw new RangeError(`Can't set negative lives`);
  }
  state = Object.assign({}, state);
  state.notesLeft = notes;
  return state;
};

class GameModel {
  constructor(questions) {
    this.state = {};
    this.state.answers = [];
    this.questions = questions;
  }

  update(newState) {
    return Object.assign(this.state, newState);
  }

  nextQuestionScreen() {
    this.state = nextQuestionState(this.state, this.questions);
  }

  tick() {
    const timer = getTimer(this.state.timeLeft);
    this.state.timeLeft = timer.tick().value;
  }

  canMistake() {
    return this.state.notesLeft > 0;
  }

  mistake() {
    if (this.canMistake()) {
      this.state = setNotes(this.state, this.state.notesLeft - 1);
    }
  }

  pushAnswer(answer) {
    this.state.answers.push(answer);
  }

  nextQuestionAvailable() {
    return !!getQuestion(this.questions, this.state.question + 1);
  }

  cleanState(resultWin = false) {
    const {notesLeft, timeLeft, answers} = this.state;

    if (resultWin) {
      this.state = {notesLeft, timeLeft, answers, result: resultTypes.WIN};
    } else {
      this.state = {notesLeft, timeLeft, answers, result: resultTypes.LOOSE};
    }
  }
}

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

class HeaderView extends AbstractView {
  constructor(state = {notesLeft: 0, minutesLeft: 0, secondsLeft: 0}) {
    super();
    this.state = state;
  }

  get template() {
    return `
    ${headerSvgCircle(this.state)}
    ${headerMistakes(this.state.notesLeft)}`.trim();
  }
}

const playerWrapper = (id, src) => `
      <div class="player-wrapper">
        <div class="player">
          <audio src="${src}" id="audio-${id}"></audio>
          <button class="player-control player-control--play"></button>
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
      if (button.classList.contains(`player-control--play`)) {
        audio.play();
        button.classList.remove(`player-control--play`);
        button.classList.add(`player-control--pause`);
      } else {
        button.classList.remove(`player-control--pause`);
        button.classList.add(`player-control--play`);
        audio.pause();
      }
    } else {
      audio.pause();
      button.classList.remove(`player-control--pause`);
      button.classList.add(`player-control--play`);
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
  constructor(header, question) {
    super();
    this.question = question;
    this.header = header;
  }

  get template() {
    return (`
  <section class="main main--level main--level-artist">
    ${this.header.template}

    <div class="main-wrap">
      <h2 class="title main-title">${this.question.question}</h2>

      ${playerWrapper(0, this.question.src)}
      
      <form class="main-list">

      ${this.question.answers.map((answer, index) => artistAnswerWrapper(index, answer.title, answer.image.url)).join(``)}
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
        const isCorrect = this.question.answers[e.target.id].isCorrect;
        this.onAnswer(isCorrect);
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

  static onAnswer(isCorrect) {

    return isCorrect;
  }

}

const genreAnswerWrapper = (id, src) => `
        <div class="genre-answer">
          ${playerWrapper(id, src)}
          <input type="checkbox" name="answer" value="${id}" id="${id}">
          <label class="genre-answer-check" for="${id}"></label>
        </div>`.trim();

class GameGenreView extends AbstractView {
  constructor(header, question) {
    super();
    this.question = question;
    this.header = header;
  }

  get template() {
    return (`
  <section class="main main--level main--level-genre">
    ${this.header.template}

    <div class="main-wrap">
      <h2 class="title">${this.question.question}</h2>
      <form class="genre">
        ${this.question.answers.map((answer, index) => genreAnswerWrapper(index, answer.src)).join(``)}
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
      const genreAnswersList = [...answersForm.answer];
      const isCorrect = genreAnswersList.reduce((result, currentAnswer) => {

        if (this.question.answers[currentAnswer.id].genre === this.question.genre) {
          result = result && currentAnswer.checked;
        } else {
          result = result && !currentAnswer.checked;
        }

        return result;
      }, true);
      this.onAnswer(isCorrect);
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

  static onAnswer(isCorrect) {

    return isCorrect;
  }

}

const getView = (questions, state) => {

  const header = new HeaderView(state);

  switch (questions[state.question].type) {

    case questionTypes.QUESTION_ARTIST:

      return new GameArtistView(header, questions[state.question]);

    case questionTypes.QUESTION_GENRE:

      return new GameGenreView(header, questions[state.question]);

  }

  throw new Error(`Unknown question type ${questions[state.question].type}`);

};


class GameScreen {

  constructor(questions) {
    this.model = new GameModel(questions);
    this.model.questions = questions;
  }

  init(state = initialState) {
    this.model.update(state);
    this.changeQuestion(false);
  }


  changeQuestion(incrementQuestion = true) {

    if (incrementQuestion) {
      this.model.nextQuestionScreen();
    }
    this.level = getView(this.model.questions, this.model.state);
    const startedTime = this.model.state.timeLeft;

    this.stopTimer();

    this.level.onAnswer = (isCorrect) => {

      if (!isCorrect) {
        this.model.mistake();
      }

      this.model.pushAnswer([+isCorrect, startedTime - this.model.state.timeLeft]);

      // Если попытки кончились - переход на экран результата без статуса выйгрыша
      if (this.model.state.notesLeft <= 0) {
        this.model.cleanState(false);
        Application.result(this.model.state);
        // Если вопросов больше нет - переход на экран результата со статусом выйгрыша
      } else if (!this.model.nextQuestionAvailable()) {
        this.model.cleanState(true);
        Application.result(this.model.state);
      } else {
        switchAppScreen(this.level);
        this.changeQuestion();
      }
    };

    switchAppScreen(this.level);

    this.tick();
  }

  tick() {
    this.model.tick();
    const timeInfo = timeConverter(this.model.state.timeLeft);
    this.level.updateTime(timeInfo.minutesLeft, timeInfo.secondsLeft);

    this.timer = setTimeout(() => this.tick(), 1000);

    // Если время вышло - переход на экран результата без статуса выйгрыша
    if (this.model.state.timeLeft <= 0) {
      this.stopTimer();
      this.model.cleanState(false);
      Application.result(this.model.state);
    }
  }

  stopTimer() {
    clearTimeout(this.timer);
  }
}

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
  constructor(state) {
    super();
    this.state = state;

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

class ResultScreen {

  init(state) {

    this.state = state;

    let statistics = [];

    if (state.results) {
      for (const result of state.results) {
        const score = getScore(result.answers, result.notesLeft);
        statistics.push(score);
      }
    }

    this.state.statistics = statistics;

    this.view = new ResultView(state);

    switchAppScreen(this.view);

    this.view.onReplay = () => {
      Application.showWelcome();
    };
  }
}

var resultScreen = new ResultScreen();

class SplashScreen extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
  <section class="main main--welcome">
    ${logo}
    <h2 class="title main-title">Загрузка</h2>
  </section>`.trim();
  }
}

const SERVER_URL = `https://es.dump.academy/guess-melody`;

const API_PATHS = {
  QUESTIONS: `questions`,
  STATS: `stats`,
};

const USERNAME = `509237`;

class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/${API_PATHS.QUESTIONS}`).
        then((res) => res.json());
  }

  static loadResults(name = USERNAME) {
    return fetch(`${SERVER_URL}/stats/${name}`).then((res) => res.json());
  }

  static saveResults(data, name = USERNAME) {
    const requestInit = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${name}`, requestInit);
  }
}

const b64Encode = (str) => {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode(`0x` + p1);
      }));
};

const b64Decode = (str) => {
  return decodeURIComponent(atob(str).split(``).map(function (c) {
    return `%` + (`00` + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(``));
};

const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  RESULT: `result`
};

const saveState = (state) => {
  return b64Encode(JSON.stringify(state));
};

const loadState = (dataString) => {
  try {
    return JSON.parse(b64Decode(dataString));
  } catch (e) {
    return initialState;
  }
};

class Application {
  static init(questions) {
    this.routes = {
      [ControllerId.WELCOME]: welcomeScreen,
      [ControllerId.GAME]: new GameScreen(questions),
      [ControllerId.RESULT]: resultScreen
    };

    const hashChangeHandler = () => {
      const hashValue = location.hash.replace(`#`, ``);
      const [id, data] = hashValue.split(`=`);
      this.changeHash(id, data);
    };
    window.onhashchange = hashChangeHandler;
    hashChangeHandler();
  }

  static changeHash(id, data) {
    const controller = this.routes[id];

    if (controller) {
      controller.init(loadState(data));
    }
  }

  static showWelcome() {
    location.hash = ControllerId.WELCOME;
  }

  static startGame(state = initialState) {
    location.hash = `${ControllerId.GAME}=${saveState(state)}`;
  }

  static result(state) {
    if (state.result === resultTypes.WIN) {
      Loader.loadResults().then((jsonData) => {
        Loader.saveResults(state).then(() => {
          state.results = jsonData;
          location.hash = `${ControllerId.RESULT}=${saveState(state)}`;
        }).catch(window.console.error);
      }).catch(window.console.error);
    } else {
      location.hash = `${ControllerId.RESULT}=${saveState(state)}`;
    }
  }

  static showSplash() {
    const splash = new SplashScreen();
    switchAppScreen(splash);

    Loader.loadData().
        then((jsonData) => {
          Application.init(jsonData);
        }).
        catch(window.console.error);
  }
}

Application.showSplash();

}());

//# sourceMappingURL=main.js.map
