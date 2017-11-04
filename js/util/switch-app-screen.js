const appElement = document.querySelector(`.app`);

const switchAppScreen = (screen) => {
  appElement.replaceChild(screen.element, appElement.querySelector(`.main`));
};

export default switchAppScreen;
