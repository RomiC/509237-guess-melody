import AbstractView from '../view';
import {InitialState} from '../data/state-data';

const getHeaderTimerValue = (mins, secs) => `
      <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
        <span class="timer-value-mins">${mins}</span><!--
        --><span class="timer-value-dots">:</span><!--
        --><span class="timer-value-secs">${secs}</span>
      </div>`.trim();

const getHeaderMistakes = (notes) => `
    <div class="main-mistakes">
    ${new Array(notes).fill(`<img class="main-mistake" src="img/wrong-answer.png" width="35" height="49">`).join(``)}
    </div>`.trim();

const getHeaderSvgCircle = (state) => `
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

      ${getHeaderTimerValue(state.minutesLeft, state.secondsLeft)}
    </svg>`.trim();

export default class HeaderView extends AbstractView {
  constructor(state = {notesLeft: 0, minutesLeft: 0, secondsLeft: 0}) {
    super();
    this.state = state;
  }

  get template() {
    return `
    ${getHeaderSvgCircle(this.state)}
    ${getHeaderMistakes(InitialState.NOTES - this.state.notesLeft)}`.trim();
  }
}
