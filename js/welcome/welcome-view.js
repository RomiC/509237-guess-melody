import AbstractView from '../view';
import logo from '../includes/logo';
import timeConverter from '../util/time-converter';

class WelcomeView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const timeInfo = timeConverter(this.state.timeLeft);

    return (`
  <section class="main main--welcome">
    ${logo}
    
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты — зa ${timeInfo.minutesLeft} минут ответить на все вопросы.<br>
      Ошибиться можно ${this.state.notesLeft} раза.<br>
      Удачи!
    </p>
  </section>`.trim()
    );
  }

  bind() {
    const buttonPlay = this.element.querySelector(`.main-play`);

    buttonPlay.onclick = (e) => {
      e.preventDefault();
      this.onStart();
    };
  }

  onStart() {

  }
}


export default WelcomeView;
