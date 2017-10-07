const app = document.querySelector(`.app`);
const appTemplates = document.getElementById(`templates`);
const appScreensList = appTemplates.content.querySelectorAll(`.main`);
const welcomeScreenIndex = 0;


const switchAppScreen = (screenId, screenList) => {
  app.replaceChild(screenList[screenId], app.querySelector(`.main`));
};

let currentScreenIndex = welcomeScreenIndex;
switchAppScreen(currentScreenIndex, appScreensList);

const onKeyPress = (e) => {

  let newScreenIndex = currentScreenIndex;

  if (e.altKey && e.key === `ArrowLeft`) {
    newScreenIndex = Math.max(currentScreenIndex - 1, 0);
  } else if (e.altKey && e.key === `ArrowRight`) {
    newScreenIndex = Math.min(appScreensList.length - 1, currentScreenIndex + 1);
  }

  if (newScreenIndex !== currentScreenIndex) {
    currentScreenIndex = newScreenIndex;
    switchAppScreen(currentScreenIndex, appScreensList);
  }
};

document.addEventListener(`keydown`, onKeyPress);
