import {InitialState} from '../data/state-data';
import switchAppScreen from '../util/switch-app-screen';

import GameModel from './game-model';

import HeaderView from '../header/header-view';
import GameArtistView from './game-artist-view';
import GameGenreView from './game-genre-view';

import App from '../application';

import {QuestionTypes} from './game-data';

const getView = (questions, state) => {

  const header = new HeaderView(state);
  const question = questions[state.question];
  const questionType = question.type;

  switch (questionType) {

    case QuestionTypes.QUESTION_ARTIST:

      return new GameArtistView(header, question);

    case QuestionTypes.QUESTION_GENRE:

      return new GameGenreView(header, question);

  }

  throw new Error(`Unknown question type ${questionType}`);

};


export default class GameScreen {

  constructor(questions) {
    this.model = new GameModel(questions);
    this.model.questions = questions;
  }

  init(state = InitialState) {
    this.model.updateState(state);
    this.changeQuestion(false);
  }

  changeQuestion(incrementQuestion = true) {

    if (incrementQuestion) {
      this.model.incrementQuestionInState();
    }
    this.level = getView(this.model.questions, this.model.state);
    const startedTime = this.model.state.timeLeft;

    this.stopTimer();

    this.level.onAnswer = (isCorrect) => {

      // Если попытки кончились - переход на экран результата без статуса выйгрыша
      if (this.model.state.notesLeft <= 0 && !isCorrect) {
        this.model.cleanState(false);
        App.showResult(this.model.state);
      } else if (!this.model.nextQuestionAvailable()) {

        // Если вопросов больше нет - переход на экран результата со статусом выйгрыша
        this.model.cleanState(true);
        App.showResult(this.model.state);
      } else {

        //  Играем дальше
        if (!isCorrect) {
          this.model.mistake();
        }

        this.model.pushAnswer([+isCorrect, startedTime - this.model.state.timeLeft]);

        switchAppScreen(this.level);
        this.changeQuestion();
      }
    };

    switchAppScreen(this.level);

    this.tick();
  }

  tick() {
    this.model.tick();
    this.level.updateTime(this.model.state.timeLeft);

    this.timer = setTimeout(() => this.tick(), 1000);

    // Если время вышло - переход на экран результата без статуса выйгрыша
    if (this.model.state.timeLeft <= 0) {
      this.stopTimer();
      this.model.cleanState(false);
      App.showResult(this.model.state);
    }
  }

  stopTimer() {
    clearTimeout(this.timer);
  }
}
