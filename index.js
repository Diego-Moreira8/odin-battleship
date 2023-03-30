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
    // Creates a 10x10 board ([y][x])
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
    if (x + length > 10 || y + length > 10) {
      console.log("The ship cannot be placed over the border");
      return null;
    }
    if (direction !== "horizontal" && direction !== "vertical") {
      console.log("Invalid direction. Must be: 'horizontal' or 'vertical'");
      return null;
    }

    const ship = new Ship(length);

    if (direction === "horizontal") {
      for (let i = x; i < x + length; i++) {
        this.board[y][i] = ship;
      }
    }

    if (direction === "vertical") {
      for (let i = y; i < y + length; i++) {
        this.board[i][x] = ship;
      }
    }
  }

  isOccupied(x, y) {
    return this.board[y][x] !== undefined ? true : false;
  }

  printBoard() {
    let board = "  0 1 2 3 4 5 6 7 8 9\n";
    let line = 0;

    for (let xAxis of this.board) {
      board += `${line++} `;
      for (let position of xAxis) {
        if (position !== undefined) {
          board += "■ ";
        } else {
          board += "· ";
        }
      }
      board += "\n";
    }

    return board;
  }
}
