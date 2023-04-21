import GameBoard from "./game-board.js";

export default class CPUPlayer {
  constructor() {
    this.board = new GameBoard();
    this.enemyBoard = this.createEnemyBoard();
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

  createEnemyBoard() {
    /* Returns a 10x10 board with null in all positions */
    let board = [...Array(10)].map(() => Array(10));
    for (let x = 0; x <= 9; x++)
      for (let y = 0; y <= 9; y++) board[x][y] = false;
    return board;
  }

  attack(playerBoard) {
    let x, y, attack;

    // Choose a position that has not taken a hit
    do {
      x = Math.floor(Math.random() * 9);
      y = Math.floor(Math.random() * 9);
    } while (this.enemyBoard[x][y] === null);

    this.enemyBoard[x][y] = "hit";
    return playerBoard.receiveAttack(x, y);
  }
}
