import {getTimer, incrementQuestion, setNotes, getQuestion} from './game-data';


class GameModel {
  constructor(questions) {
    this.state = {};
    this.state.answers = [];
    this.questions = questions;
  }

  updateState(newState) {
    this.state = Object.assign({}, newState);
  }

  cleanState(result) {
    const {notesLeft, timeLeft, answers} = this.state;

    this.state = {notesLeft, timeLeft, answers, result};
  }

  incrementQuestionInState() {
    this.state = incrementQuestion(this.state, this.questions);
  }

  tick() {
    const timer = getTimer(this.state.timeLeft);
    this.state.timeLeft = timer.tick().value;
  }

  canMistake() {
    return this.state.notesLeft > 0;
  }

  makeMistake() {
    if (this.canMistake()) {
      this.state = setNotes(this.state, this.state.notesLeft - 1);
    }
  }

  pushAnswer(answer) {
    this.state.answers.push(answer);
  }

  checkNextQuestionAvailable() {
    return !!getQuestion(this.questions, this.state.question + 1);
  }
}


export default GameModel;
