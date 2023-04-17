import renderBoard from "./render-board.js";

export default function gameBoard(currentPlayer, rivalPlayer) {
  getBoards(currentPlayer, rivalPlayer);
}

function getBoards(currentPlayer, rivalPlayer) {
  // Create and configure boards
  const currPlayerBoard = document.createElement("div");
  const currPlayerBoardTitle = document.createElement("div");
  currPlayerBoardTitle.textContent = "Suas embarcações";
  currPlayerBoard.appendChild(currPlayerBoardTitle);
  currPlayerBoard.appendChild(renderBoard());
  currPlayerBoard.classList.add("current-player");
  document.body.appendChild(currPlayerBoard);

  const rivalBoard = document.createElement("div");
  const rivalBoardTitle = document.createElement("div");
  rivalBoardTitle.textContent = "Embarcações do inimigo";
  rivalBoard.appendChild(rivalBoardTitle);
  rivalBoard.appendChild(renderBoard());
  rivalBoard.classList.add("rival-player");
  document.body.appendChild(rivalBoard);

  // Load rival player hits
  for (let y = 0; y <= 9; y++)
    for (let x = 0; x <= 9; x++)
      if (rivalPlayer.getBoard().isHit(x, y))
        rivalBoard
          .querySelector(`[x-coord='${x}'][y-coord='${y}']`)
          .classList.add(
            rivalPlayer.getBoard().isOccupied(x, y) ? "hit" : "water"
          );

  // Load current player ships and hits
  for (let y = 0; y <= 9; y++) {
    for (let x = 0; x <= 9; x++) {
      const position = currPlayerBoard.querySelector(
        `[x-coord='${x}'][y-coord='${y}']`
      );

      if (currentPlayer.getBoard().isOccupied(x, y))
        position.classList.add("occupied");

      if (currentPlayer.getBoard().isHit(x, y)) position.classList.add("hit");
    }
  }
}
