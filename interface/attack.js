/* 
* Render a screen with the enemy's and current player boards and active ships,
  where the current player can attack the enemy without seeing it's ships.

* When the current player attacks (by clicking on a not hit position), the
  attackScreen function evaluates if the enemy still have active ships. If no,
  returns the currentPlayer (the winner) object, which will stop the game loop 
  and be used on the results screen. If yes, returns null and the loop keeps on.
*/

import renderBoard from "./render-board.js";
import clearPage from "./clear-page.js";

export default function attackScreen(currentPlayer, enemyPlayer) {
  // Render screen
  clearPage();
  popUpAttackResult();
  header(currentPlayer);
  getBoards(currentPlayer, enemyPlayer);
  sendHitEventListener(currentPlayer, enemyPlayer);

  const positions = document.querySelectorAll(
    ".enemy-player .board .board-position:not(.hit):not(.water)"
  );

  // Enemy ships evaluation
  return new Promise((resolve) => {
    positions.forEach((pos) => {
      pos.addEventListener("click", () => {
        setTimeout(() => {
          resolve(
            enemyPlayer
              .getBoard()
              .getShips()
              .reduce((acc, cur) => acc && cur.sunk, true)
              ? currentPlayer
              : null
          );
        }, 3000);
      });
    });
  });
}

function popUpAttackResult() {
  // An overlay div with the results of the attack
  const popUpDiv = document.createElement("div");
  popUpDiv.setAttribute("id", "pop-up-attack-result");
  document.body.appendChild(popUpDiv);
}

function header(currentPlayer) {
  const headerDiv = document.createElement("div");
  headerDiv.textContent = `Vez de ${currentPlayer.getName()}`;
  document.body.appendChild(headerDiv);
}

function getBoards(currentPlayer, enemyPlayer) {
  // Set and render the players boards
  // Current player board
  const currPlayerBoard = document.createElement("div");
  const currPlayerBoardTitle = document.createElement("div");
  currPlayerBoardTitle.textContent = "Suas embarcações";
  currPlayerBoard.appendChild(currPlayerBoardTitle);
  currPlayerBoard.appendChild(getPlayerShips(currentPlayer));
  currPlayerBoard.appendChild(renderBoard());
  currPlayerBoard.classList.add("current-player");
  document.body.appendChild(currPlayerBoard);
  // Enemy's board
  const enemyBoard = document.createElement("div");
  const enemyBoardTitle = document.createElement("div");
  enemyBoardTitle.textContent = `Embarcações de ${enemyPlayer.getName()}`;
  enemyBoard.appendChild(enemyBoardTitle);
  enemyBoard.appendChild(getPlayerShips(enemyPlayer));
  enemyBoard.appendChild(renderBoard());
  enemyBoard.classList.add("enemy-player");
  document.body.appendChild(enemyBoard);

  syncBoards(currentPlayer, enemyPlayer);

  function getPlayerShips(currentPlayer) {
    // Load the current player ships and its status
    const ships = currentPlayer.getBoard().getShips();

    const shipsDiv = document.createElement("div");

    // Creates a div for each ship
    for (let ship of ships) {
      const shipDiv = document.createElement("div");
      let shipName;
      // Switch the ship name based on its length
      switch (ship.length) {
        case 1:
          shipName = "Destróier";
          break;
        case 2:
          shipName = "Submarino";
          break;
        case 3:
          shipName = "Cruzador";
          break;
        case 4:
          shipName = "Couraçado";
          break;
        case 5:
          shipName = "Porta-aviões";
          break;
      }
      shipDiv.textContent = `${shipName}: ${ship.sunk ? "Destruído" : "Ativo"}`;
      shipsDiv.appendChild(shipDiv);
    }

    return shipsDiv;
  }
}

function sendHitEventListener(currentPlayer, enemyPlayer) {
  /* 
  * Add a send hit event listener to all not hit positions on the
    enemy board.
  * When send the hit, displays the pop up with the result.     
  */

  document
    .querySelectorAll(
      ".enemy-player .board .board-position:not(.hit):not(.water)"
    )
    .forEach((pos) => {
      pos.addEventListener("click", (e) => {
        const x = e.target.getAttribute("x-coord");
        const y = e.target.getAttribute("y-coord");

        const attackResult = enemyPlayer.getBoard().receiveAttack(x, y);
        syncBoards(currentPlayer, enemyPlayer);

        // Bring the result pop up
        const popUpResult = document.querySelector("#pop-up-attack-result");
        popUpResult.textContent =
          attackResult === null
            ? "Acertou a água..."
            : "Acertou uma embarcação!";
        popUpResult.style.display = "flex";
      });
    });
}

function syncBoards(currentPlayer, enemyPlayer) {
  // Add classes with the status on the positions of the boards

  const enemyBoard = document.querySelector(".enemy-player .board");
  const currPlayerBoard = document.querySelector(".current-player .board");

  // Load enemy's hits
  for (let y = 0; y <= 9; y++)
    for (let x = 0; x <= 9; x++)
      if (enemyPlayer.getBoard().isHit(x, y))
        enemyBoard
          .querySelector(`[x-coord='${x}'][y-coord='${y}']`)
          .classList.add(
            enemyPlayer.getBoard().isOccupied(x, y) ? "hit" : "water"
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
