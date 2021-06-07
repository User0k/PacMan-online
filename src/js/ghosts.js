import { squares, COLUMNS } from './gameBoard';
import { scaredTimer, initTimer, ghostMeetPacman } from './index';

class Ghost {
  constructor(ghostName, ghostLocation) {
    this.ghostName = ghostName;
    this.ghostLocation = ghostLocation;
    this.nextLocation = ghostLocation;
    this.isScared = false;
    this.freeze = false;
    this.speed = 400;
    this.directions = [-1, -COLUMNS, 1, COLUMNS];
  }

  tryMove() {
    this.nextLocation = this.ghostLocation + this.directions[Math.floor(Math.random() * this.directions.length)];
    if (squares[this.nextLocation].classList.contains('wall') ||
        squares[this.nextLocation].classList.contains('ghost') ||
        this.freeze === true)
        this.nextLocation = this.ghostLocation;
    else {
      squares[this.ghostLocation].classList.remove(this.ghostName, 'ghost', 'scared-ghost');
      this.ghostLocation = this.nextLocation;
      squares[this.ghostLocation].classList.add(this.ghostName, 'ghost');
      if(this.isScared == true) squares[this.ghostLocation].classList.add('scared-ghost');
      this.meetPacman();
    };
  }

  scare() {
    this.isScared = true;
    squares[this.ghostLocation].classList.add('scared-ghost');
    clearTimeout(scaredTimer);
    initTimer();
  }

  meetPacman() {
    if (squares[this.ghostLocation].classList.contains('pacman')) {
      ghostMeetPacman(this.ghostLocation);
    };
  }
};
export default Ghost;