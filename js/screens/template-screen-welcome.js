import logo from './logo';

const templateScreenWelcome = `
  <section class="main main--welcome">
    ${logo}
    
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно $3 раза.<br>
      Удачи!
    </p>
  </section>`.trim();


export default templateScreenWelcome;
