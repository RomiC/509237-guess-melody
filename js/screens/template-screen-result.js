import logo from './logo';

const templateScreenResult = (resultData) => `
  <section class="main main--result">
    ${logo}
    
    <h2 class="title">${resultData.title}</h2>
    <div class="main-stat">${resultData.stat}</div>
    <span class="main-comparison">${resultData.comparison}</span>
    <span role="button" tabindex="0" class="main-replay">${resultData.replay}</span>
  </section>`.trim();


export default templateScreenResult;
