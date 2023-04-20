import GameBoard from "./game-board.js";

export default class Player {
  constructor(name = null) {
    this.name = name;
    this.board = new GameBoard();
  }
}
