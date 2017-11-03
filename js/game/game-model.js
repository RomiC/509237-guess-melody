import {getTimer} from '../data/game-data';
import {resultTypes} from '../data/game-data';

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

export default class GameModel {
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
