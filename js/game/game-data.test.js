import assert from 'assert';
import {getScore, getResultString, getTimer, getQuickAnswersCount, getDeclension, QUICK_ANSWER_TIME} from './game-data';


describe(`getScore`, () => {
  it(`should return -1 when less than 10 answers`, () => {
    assert.equal(-1, getScore([[1, 0]], 3));
  });
  it(`should return -1 if no answers`, () => {
    assert.equal(-1, getScore([], 3));
  });
  it(`should return 20 when quickly answered 10 questions`, () => {
    assert.equal(20, getScore(new Array(10).fill([1, 10]), 3));
  });
  it(`should return 10 when slowly answered 10 questions`, () => {
    assert.equal(10, getScore(new Array(10).fill([1, 30]), 3));
  });
  it(`should return 7 when slowly answered 10 questions and notes left = 0`, () => {
    assert.equal(7, getScore(new Array(10).fill([1, 30]), 0));
  });
  it(`should return 0 if no correct answers`, () => {
    assert.equal(0, getScore(new Array(10).fill([0, 30]), 3));
  });
  it(`should return 0 if no correct answers and notes left = 0`, () => {
    assert.equal(0, getScore(new Array(10).fill([0, 30]), 0));
  });
});

describe(`getResultString`, () => {
  it(`Time Out`, () => {
    assert.equal(`Время вышло!<br>Вы не успели отгадать все мелодии`,
        getResultString([4, 5, 8, 10, 11], {scoreCount: 0, notesLeft: 3, timeLeft: 0}));
  });
  it(`Attempts Out`, () => {
    assert.equal(`У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!`,
        getResultString([4, 5, 8, 10, 11], {scoreCount: 0, notesLeft: 0, timeLeft: 30}));
  });
  it(`2-nd place with 5 gamers`, () => {
    assert.equal(`Вы заняли 2-ое место из 5 игроков. Это лучше чем у 60% игроков`,
        getResultString([4, 5, 8, 11], {scoreCount: 10, notesLeft: 3, timeLeft: 30}));
  });
  it(`1-nd place with 5 gamers`, () => {
    assert.equal(`Вы заняли 1-ое место из 5 игроков. Это лучше чем у 80% игроков`,
        getResultString([4, 5, 8, 9], {scoreCount: 10, notesLeft: 3, timeLeft: 30}));
  });
  it(`5-nd place with 5 gamers`, () => {
    assert.equal(`Вы заняли 5-ое место из 5 игроков. Это лучше чем у 0% игроков`,
        getResultString([4, 5, 8, 9], {scoreCount: 3, notesLeft: 3, timeLeft: 30}));
  });
  it(`1-st place with 0 gamers`, () => {
    assert.equal(`Вы заняли 1-ое место из 1 игрока. Это лучше чем у 0% игроков`,
        getResultString([], {scoreCount: 3, notesLeft: 3, timeLeft: 30}));
  });
});

describe(`getTimer`, () => {
  it(`should return timer.value = 29 and timer.done = false when tick getTimer(30)`, () => {
    let timer = getTimer(30);
    const timerResult = timer.tick();
    assert.equal(29, timerResult.value);
    assert.equal(false, timerResult.done);
  });
  it(`should return timer.value = 0 and timer.done = true when tick getTimer(2) two times`, () => {
    let timer = getTimer(2);
    timer.tick();
    const timerResult = timer.tick();
    assert.equal(0, timerResult.value);
    assert.equal(true, timerResult.done);
  });
  it(`should return 0, not a negative value when tick a timer that is already done`, () => {
    let timer = getTimer(2);
    timer.tick();
    timer.tick();
    const timerResult = timer.tick();
    assert.equal(0, timerResult.value);
    assert.equal(true, timerResult.done);
  });
});

describe(`getQuickAnswersCount`, () => {
  it(`should return 0 when 1 incorrect quick answer and  0 correct quick answers`, () => {
    assert.equal(0, getQuickAnswersCount([[0, QUICK_ANSWER_TIME]], [1, QUICK_ANSWER_TIME - 1]));
  });
  it(`should return 1 when 1 correct quick answer`, () => {
    assert.equal(1, getQuickAnswersCount([[1, QUICK_ANSWER_TIME]], [1, QUICK_ANSWER_TIME - 1]));
  });
});


// https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_and_Plurals
// Plural rule #7 (3 forms)
// Families: Slavic (Belarusian, Bosnian, Croatian, Serbian, Russian, Ukrainian)
// ends in 1, excluding 11: 1, 21, 31, 41, 51, 61, 71, 81, 91, 101, 121, 131, 141, 151, 161, 171, 181, 191, 201, 221, ...
// ends in 2-4, excluding 12-14: 2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44, 52, 53, 54, 62, 63, 64, 72, 73, 74, 82, ...
// everything else: 0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 26, 27, 28, 29, 30, 35, 36, 37, ...

describe(`getDeclension`, () => {
  it(`1 минуту`, () => {
    assert.equal(`минуту`, getDeclension(1, [`минуту`, `минуты`, `минут`]));
  });
  it(`2 минуты`, () => {
    assert.equal(`минуты`, getDeclension(2, [`минуту`, `минуты`, `минут`]));
  });
  it(`0 минут`, () => {
    assert.equal(`минут`, getDeclension(0, [`минуту`, `минуты`, `минут`]));
  });
  it(`11 минут`, () => {
    assert.equal(`минут`, getDeclension(11, [`минуту`, `минуты`, `минут`]));
  });
  it(`12 минут`, () => {
    assert.equal(`минут`, getDeclension(12, [`минуту`, `минуты`, `минут`]));
  });
  it(`13 минут`, () => {
    assert.equal(`минут`, getDeclension(13, [`минуту`, `минуты`, `минут`]));
  });
  it(`14 минут`, () => {
    assert.equal(`минут`, getDeclension(14, [`минуту`, `минуты`, `минут`]));
  });
});
