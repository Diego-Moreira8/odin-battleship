import renderBoard from "./render-board.js";
import clearPage from "./clear-page.js";

export default function attackScreen(currentPlayer, rivalPlayer) {
  clearPage();
  popUpAttackResult();
  header(currentPlayer);
  getBoards(currentPlayer, rivalPlayer);
  sendHitEventListener(currentPlayer, rivalPlayer);

  const positions = document.querySelectorAll(
    ".rival-player .board .board-position:not(.hit):not(.water)"
  );

  // When attack, evaluates if one of the players still have ships
  // If one of them is out of ships, returns true. If not, returns false
  return new Promise((resolve) => {
    positions.forEach((pos) => {
      pos.addEventListener("click", () => {
        // const currPlayerLost = currentPlayer
        //   .getBoard()
        //   .getShips()
        //   .reduce((acc, cur) => acc && cur.sunk, true);

        // const rivalPlayerLost = rivalPlayer
        //   .getBoard()
        //   .getShips()
        //   .reduce((acc, cur) => acc && cur.sunk, true);

        setTimeout(() => {
          // resolve(currPlayerLost || rivalPlayerLost);
          // If the enemy loses, the currentPlayer (the winner) object, if not, returns null
          resolve(
            rivalPlayer
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
  const popUpDiv = document.createElement("div");
  popUpDiv.setAttribute("id", "pop-up-attack-result");
  document.body.appendChild(popUpDiv);
}

function header(currentPlayer) {
  const headerDiv = document.createElement("div");
  headerDiv.textContent = `Vez de ${currentPlayer.getName()}`;
  document.body.appendChild(headerDiv);
}

function getBoards(currentPlayer, rivalPlayer) {
  // Create and configure boards
  const currPlayerBoard = document.createElement("div");
  const currPlayerBoardTitle = document.createElement("div");
  currPlayerBoardTitle.textContent = "Suas embarcações";
  currPlayerBoard.appendChild(currPlayerBoardTitle);
  currPlayerBoard.appendChild(getPlayerShips(currentPlayer));
  currPlayerBoard.appendChild(renderBoard());
  currPlayerBoard.classList.add("current-player");
  document.body.appendChild(currPlayerBoard);

  const rivalBoard = document.createElement("div");
  const rivalBoardTitle = document.createElement("div");
  rivalBoardTitle.textContent = `Embarcações de ${rivalPlayer.getName()}`;
  rivalBoard.appendChild(rivalBoardTitle);
  rivalBoard.appendChild(getPlayerShips(rivalPlayer));
  rivalBoard.appendChild(renderBoard());
  rivalBoard.classList.add("rival-player");
  document.body.appendChild(rivalBoard);

  syncBoards(currentPlayer, rivalPlayer);

  function getPlayerShips(currentPlayer) {
    const ships = currentPlayer.getBoard().getShips();

    const shipsDiv = document.createElement("div");

    for (let ship of ships) {
      const shipDiv = document.createElement("div");

      let shipName;
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

function sendHitEventListener(currentPlayer, rivalPlayer) {
  /* Add a send hit action event listener to all positions on the rival board,
  except the ones which have .hit and .water */

  document
    .querySelectorAll(
      ".rival-player .board .board-position:not(.hit):not(.water)"
    )
    .forEach((pos) => {
      pos.addEventListener("click", (e) => {
        const x = e.target.getAttribute("x-coord");
        const y = e.target.getAttribute("y-coord");

        const attackResult = rivalPlayer.getBoard().receiveAttack(x, y);
        syncBoards(currentPlayer, rivalPlayer);

        const popUpResult = document.querySelector("#pop-up-attack-result");
        popUpResult.textContent =
          attackResult === null
            ? "Acertou a água..."
            : "Acertou uma embarcação!";
        popUpResult.style.display = "flex";
      });
    });
}

function syncBoards(currentPlayer, rivalPlayer) {
  const rivalBoard = document.querySelector(".rival-player .board");
  const currPlayerBoard = document.querySelector(".current-player .board");

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
