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
    // Verify the passed arguments
    if (arguments.length !== 4) {
      console.log("This method requires 4 arguments");
      return null;
    }
    if (
      typeof length !== "number" ||
      typeof x !== "number" ||
      typeof y !== "number" ||
      typeof direction !== "string"
    ) {
      console.log("One or more of the passed arguments are invalid");
      return null;
    }
    if (length < 0 || length > 4) {
      console.log("Invalid ship length");
      return null;
    }
    if (x > 9 || y > 9) {
      console.log("Invalid coordinates");
      return null;
    }
    if (direction !== "horizontal" && direction !== "vertical") {
      console.log("Invalid direction. Must be: 'horizontal' or 'vertical'");
      return null;
    }

    const ship = new Ship(length);

    if (direction === "horizontal") {
      for (let i = x; i < x + length; i++) {
        this.board[i][y] = ship;
      }
    }

    if (direction === "vertical") {
      for (let i = y; i < y + length; i++) {
        this.board[x][i] = ship;
      }
    }
  }

  isOccupied(x, y) {
    return this.board[x][y] !== undefined ? true : false;
  }
}
