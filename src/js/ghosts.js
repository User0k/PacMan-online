import { squares, COLUMNS } from './gameBoard';
import { scaredTimer, globalSpeed, initTimer, ghostMeetPacman } from './index';

class Ghost {
  constructor(ghostName, ghostLocation) {
    this.ghostName = ghostName;
    this.ghostLocation = ghostLocation;
    this.nextLocation = ghostLocation;
    this.isScared = false;
    this.freeze = false;
    this.speed = globalSpeed / 3.5;
    this.directions = [1, -COLUMNS, -1, COLUMNS];
  }

  tryMove() {
    this.nextLocation = this.ghostLocation + this.directions[Math.floor(Math.random() * this.directions.length)];
    this.walkThroughGrid();
    if (squares[this.nextLocation].classList.contains('wall') ||
        squares[this.nextLocation].classList.contains('ghost') ||
        this.freeze === true)
        this.nextLocation = this.ghostLocation;
    else {
      squares[this.ghostLocation].classList.remove(this.ghostName, 'ghost', 'scared-ghost');
      this.ghostLocation = this.nextLocation;
      squares[this.ghostLocation].classList.add(this.ghostName, 'ghost');
      if(this.isScared === true) squares[this.ghostLocation].classList.add('scared-ghost');
      this.meetPacman();
    };
  }

  //this method will replace the ghost to another side of the board if the ghost has reached it and still moving
  walkThroughGrid() {
    if (this.ghostLocation % COLUMNS === 19 && this.nextLocation === this.ghostLocation + 1)
      this.nextLocation = this.ghostLocation - COLUMNS + 1;
    if (this.ghostLocation % COLUMNS === 0 && this.nextLocation === this.ghostLocation - 1)
      this.nextLocation = this.ghostLocation + COLUMNS - 1;
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