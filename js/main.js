import switchAppScreen from './util/switch-app-screen';
import showWelcome from './screens/welcome';
import {initialState} from "./data/state-data";

switchAppScreen(showWelcome(initialState));
