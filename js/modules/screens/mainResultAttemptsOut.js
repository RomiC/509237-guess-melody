import getElementFromTemplate from '../getElementFromTemplate';
import switchAppScreen from '../switchAppScreen';
import mainWelcome from './mainWelcome';

const layout = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Какая жалость!</h2>
    <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>
`;

const mainResultAttemptsOut = getElementFromTemplate(layout);
const replayBtn = mainResultAttemptsOut.querySelector(`.main-replay`);

const onPlayBtnClick = (e) => {
  e.preventDefault();
  switchAppScreen(mainWelcome);
};

replayBtn.addEventListener(`click`, onPlayBtnClick);

export default mainResultAttemptsOut;
