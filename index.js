export class Ship {
  constructor(_length) {
    this.length = _length;
    this.hitsTaken = 0;
    this.sunk = false;
  }

  hit() {
    this.hitsTaken++;
  }

  isSunk() {
    return this.length === this.hitsTaken ? true : false;
  }
}

export class GameBoard {
  constructor() {
    // Creates a 10x10 board
    this.board = [...Array(10)].map(() => Array(10));
  }

  getBoard() {
    return this.board;
  }

  placeShip(length, x, y, direction) {
    if (x > 9 || y > 9) {
      console.log("Invalid coordinates");
      return null;
    }
    if (direction !== "horizontal" || direction !== "vertical") {
      console.log("Invalid direction. Must be: 'horizontal' or 'vertical'");
      return null;
    }

    const ship = new Ship(length);
  }
}
