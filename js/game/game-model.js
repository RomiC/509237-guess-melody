import {questions} from '../data/state-data';
import {initialState, nextQuestionState, setNotes} from '../data/state-data';
import {getTimer} from '../data/game-data';

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
}
