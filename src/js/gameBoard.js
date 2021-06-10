import level from './levels';
export const COLUMNS = 20;
export const squares = [];

class Board {
  constructor() {
    this.levelNumber = 0;
    this.curLevel = level[0];
    this.wrapper = document.getElementById('wrapper');
  }

  createBoard() {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    grid.style.width = `${COLUMNS * 20}px`;
    for (let i = 0; i < this.curLevel.length; i++) {
      const square = document.createElement('div');
      square.classList.add('square');
      grid.appendChild(square);
      squares.push(square);
      if(this.curLevel[i] === 0) {
        squares[i].classList.add('empty', `${i}`)
      } else if (this.curLevel[i] === 1) {
        squares[i].classList.add('wall', `${i}`)
      } else if (this.curLevel[i] === 2) {
        squares[i].classList.add('dot', `${i}`)
      } else if (this.curLevel[i] === 3) {
        squares[i].classList.add('power-pill', `${i}`)
      } else if(this.curLevel[i] === 4) {
        squares[i].classList.add('ghost-lair', `${i}`)
      };
    };
    this.wrapper.appendChild(grid);
  }

  clearBoard() {
    for (let i = 0; i < squares.length; i++) {
      squares[i].className = 'square';
    };
  }
};

export default Board;