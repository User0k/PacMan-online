import { squares } from './gameBoard';
import { scaredTimer, unscare } from './index';

class Ghost {
  constructor(ghostName, ghostLocation) {
    this.ghostName = ghostName;
    this.ghostLocation = ghostLocation;
    this.isScared = false;
  }

  scare() {
    this.isScared = true;
    squares[this.ghostLocation].classList.add('scared-ghost');
    squares[this.ghostLocation].classList.remove('ghost');
    setTimeout(unscare, scaredTimer);
  }
};
export default Ghost;