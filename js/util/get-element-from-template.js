const getElementFromTemplate = (template) => {
  const outer = document.createElement(`div`);
  outer.innerHTML = template;

  return outer.firstElementChild;
};

export default getElementFromTemplate;
