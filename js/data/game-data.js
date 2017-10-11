const getScore = (answersArray = [], notesLeft = 0, totalQuestions = 10) => {

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
  let resultString = ``;

  if (result.timeLeft === 0) {
    resultString = `Время вышло! Вы не успели отгадать все мелодии`;
  } else if (result.notesLeft === 0) {
    resultString = `У вас закончились все попытки. Ничего, повезёт в следующий раз!`;
  } else {

    statistics.push(result.scoreCount);
    statistics.sort((a, b) => a - b);

    const statisticsCount = statistics.length;
    const betterResultsCount = statistics.findIndex((it) => it === result.scoreCount);
    const resultPlace = statisticsCount - betterResultsCount;
    const resultPercent = (betterResultsCount / statisticsCount) * 100;

    resultString = `Вы заняли ${resultPlace}-ое место из ${statisticsCount} игроков. Это лучше чем у ${resultPercent}% игроков`;
  }


  return resultString;
};

const getTimer = (value) => {
  return {
    value,
    done: (value === 0),
    tick() {
      if (this.done) {
        return getTimer(this.value);
      } else {
        return getTimer(this.value - 1);
      }
    },
  };
};

export {getScore, getResultString, getTimer};
