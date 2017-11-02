import {initialState} from "../data/state-data";

const timeConverter = (timeLeft, initTime = initialState.timeLeft) => {
  const timeSpend = initTime - timeLeft;
  const minutesLeft = Math.floor(timeLeft / 60);
  const secondsLeft = timeLeft - minutesLeft * 60;
  const minutesSpend = Math.floor(timeSpend / 60);
  const secondsSpend = timeSpend - minutesSpend * 60;

  return {timeSpend, minutesLeft, secondsLeft, minutesSpend, secondsSpend};

};

export default timeConverter;
