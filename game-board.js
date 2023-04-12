export class Ship {
  constructor(_length) {
    this.length = _length;
    this.hitsTaken = 0;
    this.sunk = false;
  }

  hit() {
    if (this.isSunk()) return null;
    this.hitsTaken++;
    if (this.hitsTaken === this.length) this.sunk = true;
  }

  isSunk() {
    return this.sunk;
  }
}

export class GameBoard {
  constructor() {
    // Creates a 10x10 board ([x][y])
    this.board = this.createBoard();
  }

  createBoard() {
    let board = [...Array(10)].map(() => Array(10));

    for (let x = 0; x <= 9; x++) {
      for (let y = 0; y <= 9; y++) {
        board[x][y] = { ship: null, hit: false };
      }
    }

    return board;
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

    if (length < 0 || length > 5) {
      console.log("Invalid ship length");
      return null;
    }

    if (x > 9 || y > 9) {
      console.log("Invalid coordinates");
      return null;
    }

    if (direction === "horizontal" && length > 1) {
      if (x + length > 10) {
        console.log("Ships cannot be placed over the border");
        return null;
      }
    }

    if (direction === "vertical" && length > 1) {
      if (y + length > 10) {
        console.log("Ships cannot be placed over the border");
        return null;
      }
    }

    if (direction !== "horizontal" && direction !== "vertical") {
      console.log("Invalid direction. Must be: 'horizontal' or 'vertical'");
      return null;
    }

    const ship = new Ship(length);

    if (direction === "horizontal") {
      // Verify if there are occupied positions
      for (let i = x; i < x + length; i++) {
        if (this.isOccupied(i, y)) {
          console.log("One or more coordinates are occupied");
          return null;
        }
      }

      for (let i = x; i < x + length; i++) {
        this.board[i][y].ship = ship;
      }
    }

    if (direction === "vertical") {
      // Verify if there are occupied positions
      for (let i = y; i < y + length; i++) {
        if (this.isOccupied(x, i)) {
          console.log("One or more coordinates are occupied");
          return null;
        }
      }

      for (let i = y; i < y + length; i++) {
        this.board[x][i].ship = ship;
      }
    }
  }

  isOccupied(x, y) {
    return this.board[x][y].ship !== null ? true : false;
  }

  printBoard() {
    let board = "  0 1 2 3 4 5 6 7 8 9\n";
    let line = 0;

    for (let y = 0; y <= 9; y++) {
      board += `${line++} `;
      for (let x = 0; x <= 9; x++) {
        if (this.board[x][y].ship !== null) {
          board += "■ ";
        } else {
          board += "· ";
        }
      }
      board += "\n";
    }

    console.log(board);
    return board;
  }

  receiveAttack(x, y) {
    const position = this.board[x][y];

    if (!position.hit) position.hit = true;
    else return null;

    if (position.ship) position.ship.hit();
    else return null;
  }
}

export class Player {
  constructor(_name = "Unnamed") {
    this.name = _name;
    this.playerBoard = new GameBoard();
  }

  getName() {
    return this.name;
  }

  getBoard() {
    return this.playerBoard;
  }
}

export const cpuPlayer = {
  player: new Player(),
  positionShips() {
    function placeShips(length) {
      let placed;
      do {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        const direction =
          Math.floor(Math.random() * 2) === 0 ? "horizontal" : "vertical";

        placed = this.player.getBoard().placeShip(length, x, y, direction);
      } while (placed === null);
    }

    placeShips.bind(this)(1);
    placeShips.bind(this)(2);
    placeShips.bind(this)(3);
    placeShips.bind(this)(4);
  },
  attack(player) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);

    return player.getBoard().receiveAttack(x, y);
  },
};
