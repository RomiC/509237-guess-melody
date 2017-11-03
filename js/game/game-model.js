import {questions} from '../data/state-data';
import {initialState} from '../data/state-data';
import {getTimer} from '../data/game-data';


const getQuestion = (num) => questions[num];

const nextQuestionState = (state) => {
  const currentQuestion = state.question;

  let nextQuestion = currentQuestion;

  if (getQuestion(currentQuestion + 1)) {

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
  constructor(state = initialState) {
    this.state = state;
    this.state.answers = [];
    this.questions = questions;
  }

  nextQuestionScreen() {
    this.state = nextQuestionState(this.state);
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
    return !!getQuestion(this.state.question + 1);
  }

  cleanState() {
    const {notesLeft, timeLeft, answers} = this.state;
    this.state = {notesLeft, timeLeft, answers};
  }
}
