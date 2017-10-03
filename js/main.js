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

  if (e.altKey && e.key === `ArrowLeft`) {
    currentScreenIndex = currentScreenIndex ? currentScreenIndex - 1 : currentScreenIndex;
    switchAppScreen(currentScreenIndex, appScreensList);
  } else if (e.altKey && e.key === `ArrowRight`) {
    currentScreenIndex = currentScreenIndex === appScreensList.length - 1 ? currentScreenIndex : currentScreenIndex + 1;
    switchAppScreen(currentScreenIndex, appScreensList);
  }
};

document.addEventListener(`keydown`, onKeyPress);
