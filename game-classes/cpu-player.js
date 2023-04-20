import GameBoard from "./game-board.js";

export default class CPUPlayer {
  constructor() {
    this.board = new GameBoard();
  }

  placeShip(length) {
    /*
     * Places a ship with the passed length on random coordinates of the board.
     * For better performance, start placing by the larger to shortest ship.
     */
    let x, y, direction, ship;
    // let counter = 0; // For verify the amount of loops until place ships

    do {
      x = Math.floor(Math.random() * 9);
      y = Math.floor(Math.random() * 9);
      direction =
        Math.floor(Math.random() * 2) === 0 ? "horizontal" : "vertical";
      ship = this.board.placeShip(length, x, y, direction);
      // counter++;
    } while (ship === null);

    // console.log(counter);
    this.board.printBoard(); // Remove on the final game
    return ship;
  }
}
