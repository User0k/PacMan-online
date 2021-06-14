import { COLUMNS } from './gameBoard';

export const DIRECTIONS = {
  ArrowLeft: {
    direction: - 1,
    rotate: 180,
  },
  ArrowUp: {
    direction: - COLUMNS,
    rotate: -90,
  },
  ArrowRight: {
    direction: 1,
    rotate: 0,
  },
  ArrowDown: {
    direction: COLUMNS,
    rotate: 90,
  }
};