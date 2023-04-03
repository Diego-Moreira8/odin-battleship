import { Player, cpuPlayer } from "./game-board.js";

(function init() {
  createBoard();
})();

function createBoard() {
  const boardDiv = document.createElement("div");
  boardDiv.setAttribute("id", "game-board");

  const player1board = document.createElement("div");
  player1board.setAttribute("class", "board");
  const player2board = document.createElement("div");
  player2board.setAttribute("class", "board");

  [player1board, player2board].forEach((board) => {
    for (let y = 0; y <= 9; y++) {
      for (let x = 0; x <= 9; x++) {
        const position = document.createElement("div");
        position.setAttribute("class", "position");
        position.setAttribute("x-coord", `${x}`);
        position.setAttribute("y-coord", `${y}`);
        board.appendChild(position);
      }
    }
  });

  boardDiv.appendChild(player1board);
  boardDiv.appendChild(player2board);

  document.body.appendChild(boardDiv);
}
