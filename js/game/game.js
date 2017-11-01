import {questions, questionTypes, initialState, getQuestion} from '../data/state-data';
import switchAppScreen from '../util/switch-app-screen';

import GameModel from './game-model';

import GameArtistView from './game-artist-view';
import GameGenreView from './game-genre-view';

import App from '../application';


const getView = (state) => {

  switch (questions[state.question].type) {

    case questionTypes.QUESTION_ARTIST:

      return new GameArtistView(state);

    case questionTypes.QUESTION_GENRE:

      return new GameGenreView(state);

  }

  throw new Error(`Unknown question type ${questions[state.question].type}`);

};


class GameScreen {

  init(state = initialState) {
    this.model = new GameModel(state);
    this.changeQuestion();
  }


  changeQuestion() {

    this.model.nextQuestionScreen();
    this.level = getView(this.model.state);
    const startedTime = this.model.state.timeLeft;

    this.level.onAnswer = (isCorrect) => {
      this.stopTimer();

      if (!isCorrect) {
        this.model.mistake();
      }

      this.model.pushAnswer({isCorrect, time: startedTime - this.model.state.timeLeft});

      // Если попытки кончились или вопросов больше нет - переход на экран результата
      if (this.model.state.notesLeft <= 0 || !getQuestion(this.model.state.question + 1)) {
        App.result(this.model.state);
      } else {
        switchAppScreen(this.level);
        this.changeQuestion();
      }
    };

    switchAppScreen(this.level);

    this.tick();
  }

  tick() {
    this.model.tick();
    this.level.updateTime(this.model.state.minutesLeft, this.model.state.secondsLeft);

    this.timer = setTimeout(() => this.tick(), 1000);

    // Если время вышло - переход на экран результата
    if (this.model.state.timeLeft <= 0) {
      this.stopTimer();
      App.result(this.model.state);
    }
  }

  stopTimer() {
    clearTimeout(this.timer);
  }
}

export default new GameScreen();
