import timeConverter from '../util/time-converter';
import {INIT_NOTES} from './state-data';


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

const getStatString = (state, initialState, scoreCount) => {
  const timeInfo = timeConverter(state.timeLeft);

  return `За ${timeInfo.minutesSpend} минуты и ${timeInfo.secondsSpend} секунд
   <br>вы набрали ${scoreCount} баллов (${getQuickAnswersCount(state.answers)} быстрых)
   <br>совершив ${initialState.notesLeft - state.notesLeft} ошибки`.trim();
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


export {getScore, getResultString, getStatString, getTimer, getQuickAnswersCount, QUICK_ANSWER_TIME, questionTypes, resultTypes};
