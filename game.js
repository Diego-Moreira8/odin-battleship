import { Player, cpuPlayer } from "./game-board.js";

function game() {
  createBoard();
  const player1 = new Player();
  placeShips(player1);
}

function createBoard() {
  // Place Ship Buttons and active the first
  const btnsDiv = document.createElement("div");

  const rotateBtn = document.createElement("button");
  rotateBtn.setAttribute("id", "rotate");
  rotateBtn.textContent = "↺";
  btnsDiv.appendChild(rotateBtn);

  const length1btn = document.createElement("button");
  length1btn.setAttribute("class", "ship-length active");
  length1btn.textContent = "1";
  btnsDiv.appendChild(length1btn);

  const length2btn = document.createElement("button");
  length2btn.setAttribute("class", "ship-length");
  length2btn.textContent = "2";
  btnsDiv.appendChild(length2btn);

  const length3btn = document.createElement("button");
  length3btn.setAttribute("class", "ship-length");
  length3btn.textContent = "3";
  btnsDiv.appendChild(length3btn);

  const length4btn = document.createElement("button");
  length4btn.setAttribute("class", "ship-length");
  length4btn.textContent = "4";
  btnsDiv.appendChild(length4btn);

  document.body.insertAdjacentElement("afterbegin", btnsDiv);

  // Boards
  const boardDiv = document.createElement("div");
  boardDiv.setAttribute("id", "game-board");

  const player1board = document.createElement("div");
  player1board.setAttribute("id", "p1-board");
  const player2board = document.createElement("div");
  player2board.setAttribute("id", "p2-board");

  [player1board, player2board].forEach((board) => {
    for (let y = 0; y <= 9; y++) {
      for (let x = 0; x <= 9; x++) {
        const position = document.createElement("div");
        position.setAttribute("class", "position");
        position.setAttribute("x-coord", x);
        position.setAttribute("y-coord", y);
        board.appendChild(position);
      }
    }
  });

  boardDiv.appendChild(player1board);
  boardDiv.appendChild(player2board);

  document.body.appendChild(boardDiv);
}

function placeShips(player) {
  const playerPositions = document.querySelectorAll("#p1-board > .position");
  const currLengthBtns = document.querySelectorAll(".ship-length");

  let slcPos; // Selected position
  let currLengthBtn = currLengthBtns[0];
  let currDirection = "horizontal";

  // Updates the direction
  document.getElementById("rotate").addEventListener("click", () => {
    currDirection = currDirection === "horizontal" ? "vertical" : "horizontal";
  });

  // Updates the current button length
  currLengthBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelector(".ship-length.active").classList.remove("active");
      currLengthBtn = e.target;
      e.target.classList.add("active");
    });
  });

  // Event listeners for the positions
  playerPositions.forEach((pos) => {
    pos.addEventListener("click", (e) => {
      slcPos = {
        x: parseInt(e.target.getAttribute("x-coord")),
        y: parseInt(e.target.getAttribute("y-coord")),
      };

      // Place the ship and change the active length button
      if (
        player
          .getBoard()
          .placeShip(
            parseInt(currLengthBtn.innerHTML),
            slcPos.x,
            slcPos.y,
            currDirection
          ) !== null
      ) {
        refreshBoard(player);
        currLengthBtn.classList.remove("active");
        currLengthBtn.disabled = true;
        for (let btn of currLengthBtns) {
          if (!btn.disabled) {
            currLengthBtn = btn;
            btn.classList.add("active");
            break;
          }
        }
      }
    });
  });
}

function refreshBoard(player) {
  for (let x = 0; x <= 9; x++) {
    for (let y = 0; y <= 9; y++) {
      if (player.getBoard().isOccupied(x, y)) {
        document
          .querySelector(`.position[x-coord="${x}"][y-coord="${y}"]`)
          .classList.add("ship");
      }
    }
  }
}
