import logo from './logo';

const templateScreenWelcome = (state) => `
  <section class="main main--welcome">
    ${logo}
    
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты — зa ${state.minutesLeft} минут ответить на все вопросы.<br>
      Ошибиться можно ${state.notesLeft} раза.<br>
      Удачи!
    </p>
  </section>`.trim();


export default templateScreenWelcome;
