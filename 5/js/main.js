(function () {
'use strict';

const getElementFromTemplate = (template) => {
  const outer = document.createElement(`div`);
  outer.innerHTML = template;
  return outer.firstElementChild;
};

const app = document.querySelector(`.app`);

const switchAppScreen = (element) => {
  app.replaceChild(element, app.querySelector(`.main`));
};

const layout$3 = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Вы настоящий меломан!</h2>
    <div class="main-stat">За&nbsp;3&nbsp;минуты и 25&nbsp;секунд
      <br>вы&nbsp;набрали 12 баллов (8 быстрых)
      <br>совершив 3 ошибки</div>
    <span class="main-comparison">Вы заняли 2 место из 10. Это&nbsp;лучше чем у&nbsp;80%&nbsp;игроков</span>
    <span role="button" tabindex="0" class="main-replay">Сыграть ещё раз</span>
  </section>`;

const mainResult = getElementFromTemplate(layout$3);
const replayBtn = mainResult.querySelector(`.main-replay`);

const onPlayBtnClick$1 = (e) => {
  e.preventDefault();
  switchAppScreen(mainWelcome);
};

replayBtn.addEventListener(`click`, onPlayBtnClick$1);

const layout$4 = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Какая жалость!</h2>
    <div class="main-stat">У вас закончились все попытки.<br>Ничего, повезёт в следующий раз!</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>
`;

const mainResultAttemptsOut = getElementFromTemplate(layout$4);
const replayBtn$1 = mainResultAttemptsOut.querySelector(`.main-replay`);

const onPlayBtnClick$2 = (e) => {
  e.preventDefault();
  switchAppScreen(mainWelcome);
};

replayBtn$1.addEventListener(`click`, onPlayBtnClick$2);

const layout$5 = `
  <section class="main main--result">
    <section class="logo" title="Угадай мелодию"><h1>Угадай мелодию</h1></section>

    <h2 class="title">Увы и ах!</h2>
    <div class="main-stat">Время вышло!<br>Вы не успели отгадать все мелодии</div>
    <span role="button" tabindex="0" class="main-replay">Попробовать ещё раз</span>
  </section>
`;

const mainResultTimeOut = getElementFromTemplate(layout$5);
const replayBtn$2 = mainResultTimeOut.querySelector(`.main-replay`);

const onPlayBtnClick$3 = (e) => {
  e.preventDefault();
  switchAppScreen(mainWelcome);
};

replayBtn$2.addEventListener(`click`, onPlayBtnClick$3);

const layout$2 = `
  <section class="main main--level main--level-genre">
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">05</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">00</span>
      </div>
    </svg>
    <div class="main-mistakes">
      <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
      <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
      <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
    </div>

    <div class="main-wrap">
      <h2 class="title">Выберите инди-рок треки</h2>
      <form class="genre">
        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-1">
          <label class="genre-answer-check" for="a-1"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-2">
          <label class="genre-answer-check" for="a-2"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-3">
          <label class="genre-answer-check" for="a-3"></label>
        </div>

        <div class="genre-answer">
          <div class="player-wrapper">
            <div class="player">
              <audio></audio>
              <button class="player-control player-control--play"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>
          <input type="checkbox" name="answer" value="answer-1" id="a-4">
          <label class="genre-answer-check" for="a-4"></label>
        </div>

        <button class="genre-answer-send" type="submit">Ответить</button>
      </form>
    </div>
  </section>`;

const mainLevelGenre = getElementFromTemplate(layout$2);

const submitAnswerBtn = mainLevelGenre.querySelector(`.genre-answer-send`);
submitAnswerBtn.disabled = true;

const answersForm = mainLevelGenre.querySelector(`.genre`);
const answersList$1 = [...answersForm.answer];

const onAnswersFormChange = (e) => {
  e.preventDefault();
  submitAnswerBtn.disabled = !answersList$1.some((answer) => answer.checked);
};

const resultScreensList = [mainResult, mainResultAttemptsOut, mainResultTimeOut];

const onSubmitAnswer = (e) => {
  e.preventDefault();
  const randomScreenIndex = Math.floor(Math.random() * resultScreensList.length);
  const randomScreen = resultScreensList[randomScreenIndex];
  switchAppScreen(randomScreen);
  answersList$1.forEach((checkbox) => {
    checkbox.checked = false;
  });
  submitAnswerBtn.disabled = true;
};

answersForm.addEventListener(`change`, onAnswersFormChange);
answersForm.addEventListener(`submit`, onSubmitAnswer);

const layout$1 = `
  <section class="main main--level main--level-artist">
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">05</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">00</span>
      </div>
    </svg>
    <div class="main-mistakes">
      <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
      <img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">
    </div>

    <div class="main-wrap">
      <h2 class="title main-title">Кто исполняет эту песню?</h2>
      <div class="player-wrapper">
        <div class="player">
          <audio></audio>
          <button class="player-control player-control--pause"></button>
          <div class="player-track">
            <span class="player-status"></span>
          </div>
        </div>
      </div>
      <form class="main-list">
        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-1" name="answer" value="val-1"/>
          <label class="main-answer" for="answer-1">
            <img class="main-answer-preview" src="http://placehold.it/134x134"
                 alt="Пелагея" width="134" height="134">
            Пелагея
          </label>
        </div>

        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-2" name="answer" value="val-2"/>
          <label class="main-answer" for="answer-2">
            <img class="main-answer-preview" src="http://placehold.it/134x134"
                 alt="Краснознаменная дивизия имени моей бабушки" width="134" height="134">
            Краснознаменная дивизия имени моей бабушки
          </label>
        </div>

        <div class="main-answer-wrapper">
          <input class="main-answer-r" type="radio" id="answer-3" name="answer" value="val-3"/>
          <label class="main-answer" for="answer-3">
            <img class="main-answer-preview" src="http://placehold.it/134x134"
                 alt="Lorde" width="134" height="134">
            Lorde
          </label>
        </div>
      </form>
    </div>
  </section>
`;

const mainLevelArtist = getElementFromTemplate(layout$1);

const answersList = mainLevelArtist.querySelector(`.main-list`);

const onAnswerClick = (e) => {
  e.preventDefault();
  switchAppScreen(mainLevelGenre);
};

answersList.addEventListener(`click`, onAnswerClick);

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

switchAppScreen(mainWelcome);

}());

//# sourceMappingURL=main.js.map
