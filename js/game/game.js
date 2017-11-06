import {InitialState} from '../data/state-data';
import switchAppScreen from '../util/switch-app-screen';

import GameModel from './game-model';

import HeaderView from '../header/header-view';
import GameArtistView from './game-artist-view';
import GameGenreView from './game-genre-view';

import App from '../application';

import {QuestionTypes, ResultTypes} from './game-data';


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

  init(state = {notesLeft: InitialState.NOTES,
    timeLeft: InitialState.TIME,
    question: InitialState.QUESTION,
    answers: []
  }) {
    this.model.updateState(state);
    this.changeQuestion(false);
  }

  changeQuestion(incrementQuestion = true) {

    if (incrementQuestion) {
      this.model.incrementQuestionInState();
    }
    this.level = getView(this.model.questions, this.model.state);

    this.stopTimer();
    this.level.onAnswer = (isCorrect) => this.onAnswer(isCorrect);

    switchAppScreen(this.level);

    this.tick();
  }

  onAnswer(isCorrect) {

    const startedTime = this.model.state.timeLeft;

    // Если попытки кончились - переход на экран результата со статусом пройгрыша по количеству попыток
    if (this.model.state.notesLeft <= 0 && !isCorrect) {
      this.model.cleanState(ResultTypes.LOOSE_NOTES);
      App.showResult(this.model.state);
    } else if (!this.model.checkNextQuestionAvailable()) {

      // Если вопросов больше нет - переход на экран результата со статусом выйгрыша
      this.model.pushAnswer([+isCorrect, startedTime - this.model.state.timeLeft]);
      this.model.cleanState(ResultTypes.WIN);
      App.showResult(this.model.state);
    } else {

      //  Играем дальше
      if (!isCorrect) {
        this.model.makeMistake();
      }

      this.model.pushAnswer([+isCorrect, startedTime - this.model.state.timeLeft]);

      switchAppScreen(this.level);
      this.changeQuestion();
    }
  }

  tick() {
    this.model.tick();
    this.level.updateTime(this.model.state.timeLeft);

    this.timer = setTimeout(() => this.tick(), 1000);

    // Если время вышло - переход на экран результата без статуса пройгрыша по времени
    if (this.model.state.timeLeft <= 0) {
      this.stopTimer();
      this.model.cleanState(ResultTypes.LOOSE_TIME);
      App.showResult(this.model.state);
    }
  }

  stopTimer() {
    clearTimeout(this.timer);
  }
}
