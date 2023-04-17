import renderBoard from "./render-board.js";

export default function gameBoard(currentPlayer, rivalPlayer) {
  getBoards(currentPlayer, rivalPlayer);
}

function getBoards(currentPlayer, rivalPlayer) {
  // Create and configure boards
  const currPlayerBoard = renderBoard();
  const rivalBoard = renderBoard();

  currPlayerBoard.classList.add("current-player");
  rivalBoard.classList.add("rival-player");

  document.body.appendChild(currPlayerBoard);
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

  // Load current player ships
  for (let y = 0; y <= 9; y++)
    for (let x = 0; x <= 9; x++)
      if (currentPlayer.getBoard().isOccupied(x, y))
        currPlayerBoard
          .querySelector(`[x-coord='${x}'][y-coord='${y}']`)
          .classList.add("occupied");
}
