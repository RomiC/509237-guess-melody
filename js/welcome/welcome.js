import switchAppScreen from '../util/switch-app-screen';
import WelcomeView from './welcome-view';
import App from '../application';


class WelcomeScreen {

  init(state) {

    this.state = state;
    this.view = new WelcomeView(state);

    switchAppScreen(this.view);

    this.view.onStart = () => {
      App.startGame();
    };
  }
}


export default new WelcomeScreen();
