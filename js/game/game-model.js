import {initialState, nextQuestionScreen, setNotes} from '../data/state-data';
import {tick} from '../data/game-data';

export default class GameModel {
  constructor(state = initialState) {
    this.state = state;
  }

  nextQuestionScreen() {
    this.state = nextQuestionScreen(this.state);
  }

  tick() {
    this.state = tick(this.state);
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
