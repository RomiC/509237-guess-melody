import convertTime from '../util/convert-time';
import {InitialState} from '../data/state-data';


const QUICK_ANSWER_TIME = 30;
const TOTAL_QUESTIONS = 10;
const RED_TIMER_VALUE = 30;

const QuestionTypes = {

  QUESTION_ARTIST: `artist`,
  QUESTION_GENRE: `genre`
};

const ResultTypes = {
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
  scoreCount = Math.max(0, scoreCount - (InitialState.notesLeft - notesLeft));

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
  const resultPercent = Math.floor((betterResultsCount / statisticsCount) * 100);

  const totalPlayersString = getDeclension(statisticsCount, [`игрока`, `игроков`, `игроков`]);
  const betterPlayersString = getDeclension(resultPercent, [`игрока`, `игроков`, `игроков`]);

  return `Вы заняли ${resultPlace}-ое место из ${statisticsCount} ${totalPlayersString}. Это лучше чем у ${resultPercent}% ${betterPlayersString}`;
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

const getStatString = (state, initialState, scoreCount) => {
  const timeInfo = convertTime(state.timeLeft);
  const quickAnswersCount = getQuickAnswersCount(state.answers);
  const mistakesCount = initialState.notesLeft - state.notesLeft;

  const minutesString = getDeclension(timeInfo.minutesSpend, [`минуту`, `минуты`, `минут`]);
  const secondsString = getDeclension(timeInfo.secondsSpend, [`секунду`, `секунды`, `секунд`]);
  const scoreString = getDeclension(scoreCount, [`балл`, `балла`, `баллов`]);
  const quickAnswersString = getDeclension(quickAnswersCount, [`быстрый`, `быстрых`, `быстрых`]);
  const mistakesString = getDeclension(mistakesCount, [`ошибку`, `ошибки`, `ошибок`]);

  return `За ${timeInfo.minutesSpend} ${minutesString} и ${timeInfo.secondsSpend} ${secondsString}
   <br>вы набрали ${scoreCount} ${scoreString} (${quickAnswersCount} ${quickAnswersString})
   <br>совершив ${mistakesCount} ${mistakesString}`.trim();
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

const getQuestion = (questions, num) => questions[num];

const incrementQuestion = (state, questions) => {
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

const getDeclension = (num, titles) => {

  if (num % 10 === 1 && num % 100 !== 11) {

    // Минут
    return titles[0];
  } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {

    // Минуту
    return titles[1];
  } else {

    // Минуты
    return titles[2];
  }

};

const updateTimeElements = (timeLeft, timerElement, timeMinsElement, timeSecsElement) => {
  const timeInfo = convertTime(timeLeft);
  timeMinsElement.textContent = `${timeInfo.minutesLeft}`;
  timeSecsElement.textContent = `${timeInfo.secondsLeft}`.padStart(2, `0`);

  if (timeLeft < RED_TIMER_VALUE) {
    timerElement.classList.add(`timer-value--finished`);
  }
};


export {getScore, getResultString, getStatString, getTimer, getQuickAnswersCount, getQuestion, incrementQuestion, setNotes, getDeclension, updateTimeElements, QUICK_ANSWER_TIME, RED_TIMER_VALUE, QuestionTypes, ResultTypes};
