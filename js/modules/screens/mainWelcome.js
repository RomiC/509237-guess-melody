import getElementFromTemplate from '../getElementFromTemplate';
import switchAppScreen from '../switchAppScreen';
import mainLevelArtist from './mainLevelArtist';

const layout = `
  <section class="main main--welcome">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>
    <button class="main-play">Начать игру</button>
    <h2 class="title main-title">Правила игры</h2>
    <p class="text main-text">
      Правила просты&nbsp;— за&nbsp;5 минут ответить на все вопросы.<br>
      Ошибиться можно 3 раза.<br>
      Удачи!
    </p>
  </section>
`;

const mainWelcome = getElementFromTemplate(layout);
const playBtn = mainWelcome.querySelector(`.main-play`);

const onPlayBtnClick = (e) => {
  e.preventDefault();
  switchAppScreen(mainLevelArtist);
};

playBtn.addEventListener(`click`, onPlayBtnClick);

export default mainWelcome;
