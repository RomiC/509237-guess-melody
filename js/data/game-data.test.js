import assert from 'assert';
import {getScore, getResultString, getTimer} from './game-data';

describe(`getScore`, () => {
  it(`should return -1 when less than 10 answers`, () => {
    assert.equal(-1, getScore([{time: 0, isCorrect: true}], 3));
  });
  it(`should return -1 if no answers`, () => {
    assert.equal(-1, getScore([], 3));
  });
  it(`should return 20 when quickly answered 10 questions`, () => {
    assert.equal(20, getScore(new Array(10).fill({time: 10, isCorrect: true}), 3));
  });
  it(`should return 10 when slowly answered 10 questions`, () => {
    assert.equal(10, getScore(new Array(10).fill({time: 30, isCorrect: true}), 3));
  });
  it(`should return 7 when slowly answered 10 questions and notes left = 0`, () => {
    assert.equal(7, getScore(new Array(10).fill({time: 30, isCorrect: true}), 0));
  });
  it(`should return 0 if no correct answers`, () => {
    assert.equal(0, getScore(new Array(10).fill({time: 30, isCorrect: false}), 3));
  });
  it(`should return 0 if no correct answers and notes left = 0`, () => {
    assert.equal(0, getScore(new Array(10).fill({time: 30, isCorrect: false}), 0));
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
    assert.equal(`Вы заняли 1-ое место из 1 игроков. Это лучше чем у 0% игроков`,
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
