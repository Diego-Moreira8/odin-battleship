import Ship from "./ship.js";

export default class GameBoard {
  constructor() {
    this.board = this.createBoard();
    this.shipsPlaced = 0; // This will be the ID of the placed ships
  }

  createBoard() {
    /* Returns a 10x10 board where each position is an object with the ship 
    and a boolean value for the hit */
    let board = [...Array(10)].map(() => Array(10));

    for (let x = 0; x <= 9; x++)
      for (let y = 0; y <= 9; y++) board[x][y] = { ship: null, hit: false };

    return board;
  }

  placeShip(length, x, y, direction) {
    // Place the ship in the given coordinates in the game board
    // Validate arguments
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

    const ship = new Ship(length, ++this.shipsPlaced);

    // Verify if there are occupied positions, if not, place the ship
    if (direction === "horizontal") {
      for (let i = x; i < x + length; i++) {
        if (this.isOccupied(i, y)) {
          console.log("One or more coordinates are occupied");
          return null;
        }
      }

      for (let i = x; i < x + length; i++) this.board[i][y].ship = ship;
    }

    if (direction === "vertical") {
      // Verify if there are occupied positions
      for (let i = y; i < y + length; i++) {
        if (this.isOccupied(x, i)) {
          console.log("One or more coordinates are occupied");
          return null;
        }
      }

      for (let i = y; i < y + length; i++) this.board[x][i].ship = ship;
    }
  }

  isOccupied(x, y) {
    /* Verify if the passed coordinates is occupied. 
    Returns true if it is, or false if it's not occupied */
    return this.board[x][y].ship !== null ? true : false;
  }

  printBoard() {
    // Print the board with the placed ships in the console. Doesn't prints hits
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
  }

  receiveAttack(x, y) {
    /* Receive an attack on the passed coordinates.
    Returns null if the position was already hit or if doesn't hit a ship */
    const position = this.board[x][y];

    if (!position.hit) position.hit = true;
    else return null;

    if (position.ship) position.ship.hit();
    else return null;
  }

  deleteShip(x, y) {
    /* Delete the ship that occupies the given coordinates and 
    returns the deleted ship if succeed or null if fail*/
    if (!this.isOccupied(x, y)) {
      console.log("There is no ship to be deleted");
      return null;
    }

    const shipID = this.board[x][y].ship.getID();
    const shipCopy = this.board[x][y].ship;

    for (let y = 0; y <= 9; y++) {
      for (let x = 0; x <= 9; x++) {
        const currShip = this.board[x][y].ship;
        if (currShip !== null && currShip.getID() === shipID) {
          this.board[x][y] = { ship: null, hit: false };
        }
      }
    }

    return shipCopy;
  }

  isHit(x, y) {
    // Returns the hit value (true or false) of the passed coordinates
    return this.board[x][y].hit;
  }

  getShips() {
    // Returns an array with the ships placed in this board
    const ships = [];
    const verifiedIDs = [];

    for (let x = 0; x <= 9; x++) {
      for (let y = 0; y <= 9; y++) {
        if (this.isOccupied(x, y)) {
          const currShip = this.board[x][y].ship;
          if (!verifiedIDs.includes(currShip.getID())) {
            ships.push(currShip);
            verifiedIDs.push(currShip.getID());
          }
        }
      }
    }

    return ships;
  }
}
