const app = document.querySelector(`.app`);

const switchAppScreen = (element) => {
  app.replaceChild(element, app.querySelector(`.main`));
};

export default switchAppScreen;
