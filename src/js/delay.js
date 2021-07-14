import { startDelay } from './index';

//Every nested array has a message that the user can see after starting the game (0 index)
//and a delay (1 index) before this message
export const delayCounter = [
  [3, 800],
  [2, 800],
  [1, 800],
  ['GO', 400]
];

export const delayStart = function(delayArr) {
  const promise = (time) => {
    return new Promise((resolve, reject) => setTimeout(resolve, time));
  };

  promise(delayArr[0][1])
  .then(() => {
    startDelay.textContent = delayArr[0][0];
    return promise(delayArr[1][1]);
  })
  .then(() => {
    startDelay.textContent = delayArr[1][0];
    return promise(delayArr[2][1]);
  })
  .then(() => {
    startDelay.textContent = delayArr[2][0];
    return promise(delayArr[3][1]);
  })
  .then(() => {
    startDelay.textContent = delayArr[3][0];
  });
}