import AbstractView from '../view';
import logo from '../includes/logo';


export default class SplashScreen extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
  <section class="main main--welcome">
    ${logo}
    <h2 class="title main-title">Загрузка</h2>
  </section>`.trim();
  }
}
