/* 
* Render a screen with buttons with the available ships, a button to delete a 
  ship, a button to rotate the ship and an empty board.

* Ships can be placed by clicking on a empty position. If the placing is valid,
  a instance of Ship object is created and placed on the player game-board.

* The positions on the board have a hover event listener, that add a class to 
  highlight valid and invalid placing positions.
*/

import renderBoard from "./render-board.js";

export default function placeShips(player, passedShipAmount) {
  // Clone shipAmount object so this module doesn't change the original
  let shipAmount = structuredClone(passedShipAmount);

  const content = document.querySelector("#content");
  content.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent =
    player.name === null
      ? "Posicione suas embarcações!"
      : `${player.name}, posicione suas embarcações!`;
  content.appendChild(title);

  renderOptionsDiv(shipAmount);
  content.appendChild(renderBoard());
  hoverEffect();
  clickPositionAction(player, shipAmount);

  const doneBtn = doneButton();
  return new Promise((resolve) => {
    doneBtn.addEventListener("click", () => {
      resolve();
    });
  });
}

function renderOptionsDiv(shipAmount) {
  // Render a div with buttons to manage ship placing
  const controlsDiv = document.createElement("div");

  // Delete button
  const deleteShipBtn = document.createElement("button");
  deleteShipBtn.setAttribute("type", "button");
  deleteShipBtn.setAttribute("id", "delete-ship");
  deleteShipBtn.textContent = "Apagar embarcação";
  deleteShipBtn.addEventListener("click", () => {
    deleteShipBtn.classList.toggle("active");
  });
  controlsDiv.appendChild(deleteShipBtn);

  // Rotate button
  const rotateBtn = document.createElement("button");
  rotateBtn.setAttribute("type", "button");
  rotateBtn.setAttribute("id", "direction");
  rotateBtn.setAttribute("data-current-direction", "horizontal");
  rotateBtn.textContent = "↻ Horizontal";
  rotateBtn.addEventListener("click", () => {
    const currDirection = rotateBtn.getAttribute("data-current-direction");
    if (currDirection === "horizontal") {
      rotateBtn.textContent = "↻ Vertical";
      rotateBtn.setAttribute("data-current-direction", "vertical");
    } else {
      rotateBtn.textContent = "↻ Horizontal";
      rotateBtn.setAttribute("data-current-direction", "horizontal");
    }
  });
  controlsDiv.appendChild(rotateBtn);

  // Ships buttons
  for (let key in shipAmount) {
    if (shipAmount[key] > 0) {
      const shipBtn = document.createElement("button");
      shipBtn.setAttribute("type", "button");
      shipBtn.setAttribute("class", "ship");
      switch (key) {
        case "shipSize1":
          shipBtn.textContent = `Destróier`;
          break;
        case "shipSize2":
          shipBtn.textContent = `Submarino`;
          break;
        case "shipSize3":
          shipBtn.textContent = `Cruzador`;
          break;
        case "shipSize4":
          shipBtn.textContent = `Couraçado`;
          break;
        case "shipSize5":
          shipBtn.textContent = `Porta-aviões`;
          break;
      }
      shipBtn.setAttribute("key", `${key}`);

      const shipAmountSpan = document.createElement("span");
      shipAmountSpan.setAttribute("class", "remaining-ships");
      shipAmountSpan.textContent = shipAmount[key];
      shipBtn.appendChild(shipAmountSpan);

      shipBtn.addEventListener("click", () => {
        deleteShipBtn.classList.remove("active");

        controlsDiv
          .querySelectorAll(".ship")
          .forEach((btn) => btn.classList.remove("active"));
        shipBtn.classList.add("active");
      });

      controlsDiv.appendChild(shipBtn);
    }
  }
  // Adds an "active" class on the first ship button
  controlsDiv.querySelector(".ship").classList.add("active");

  document.querySelector("#content").appendChild(controlsDiv);
}

function hoverEffect() {
  const positions = document.querySelectorAll(".board-position");
  positions.forEach((position) => {
    position.addEventListener("mouseenter", () => {
      // Reset positions
      document
        .querySelectorAll(".delete-hover, .place-hover, .place-hover-invalid")
        .forEach((el) => {
          el.classList.remove("delete-hover");
          el.classList.remove("place-hover");
          el.classList.remove("place-hover-invalid");
        });

      // Hover to delete
      const deleteShipBtn = document.querySelector("#delete-ship");
      if (deleteShipBtn.classList.contains("active")) {
        position.classList.add("delete-hover");
        return;
      }

      // Hover to place ship
      if (isOutOfShips()) return;
      const currDirection = document
        .querySelector("#direction")
        .getAttribute("data-current-direction");

      const currShipLength = parseInt(
        document.querySelector(".ship.active").getAttribute("key").slice(-1)
      );

      const x = parseInt(position.getAttribute("x-coord"));
      const y = parseInt(position.getAttribute("y-coord"));

      // Creates an array with the positions to be hovered
      const toBeHovered = [];
      // Class that will be added on the placing positions
      let hoverClass = "place-hover";

      // Search for invalid positions and populates toBeHovered
      if (currDirection === "horizontal") {
        for (let i = 0; i < currShipLength; i++) {
          const position = document.querySelector(
            `[x-coord='${x + i}'][y-coord='${y}']`
          );

          /* If the ship cross the edge or finds an occupied position, change
          the class to invalid */
          if (
            (position !== null &&
              currShipLength > 1 &&
              x + currShipLength > 10) ||
            (position !== null && position.classList.contains("occupied"))
          )
            hoverClass = "place-hover-invalid";

          toBeHovered.push(position);
        }
      } else if (currDirection === "vertical") {
        for (let i = 0; i < currShipLength; i++) {
          const position = document.querySelector(
            `[x-coord='${x}'][y-coord='${y + i}']`
          );
          // If the ship cross the edge or finds an occupied position
          if (
            (position !== null &&
              currShipLength > 1 &&
              y + currShipLength > 10) ||
            (position !== null && position.classList.contains("occupied"))
          )
            hoverClass = "place-hover-invalid";

          toBeHovered.push(position);
        }
      }

      // Set the chosen class
      toBeHovered.forEach((el) => {
        if (el !== null) el.classList.add(hoverClass);
      });
    });
  });
}

function clickPositionAction(player, shipAmount) {
  /* Click event listener for the positions. If delete button is active, delete
  the ship that occupies the clicked position, if not, tries to place the active
  ship */

  const positions = document.querySelectorAll(".board-position");
  positions.forEach((position) => {
    position.addEventListener("click", () => {
      // Current ship coordinates
      const x = parseInt(position.getAttribute("x-coord"));
      const y = parseInt(position.getAttribute("y-coord"));

      // If delete ship is active
      const deleteShipBtn = document.querySelector("#delete-ship");
      if (deleteShipBtn.classList.contains("active")) {
        const recoveredShip = player.board.deleteShip(x, y);
        if (recoveredShip === null) return;
        // Finds the recovered ship in the shipAmount object and increments it
        for (let key in shipAmount)
          if (parseInt(key.slice(-1)) === recoveredShip.length) {
            shipAmount[key] += 1;
          }

        if (isOutOfShips()) document.querySelector("#done").disabled = true;
        updateControlsDiv();
        syncBoard();
        return;
      }

      if (isOutOfShips()) return;

      // Try to place the active ship
      const direction = document
        .querySelector("#direction")
        .getAttribute("data-current-direction");
      const length = parseInt(
        document.querySelector(".ship.active").getAttribute("key").slice(-1)
      );
      // If succeed on placing ship
      if (player.board.placeShip(length, x, y, direction) !== null) {
        const currentShipKey = document
          .querySelector(".ship.active")
          .getAttribute("key");
        shipAmount[currentShipKey] -= 1;
        syncBoard();
        updateControlsDiv();

        if (isOutOfShips()) document.querySelector("#done").disabled = false;
      }
    });
  });

  function syncBoard() {
    // Reset classes of the positions
    document
      .querySelectorAll(".occupied")
      .forEach((el) => el.classList.remove("occupied"));

    // Apply the "occupied" class
    for (let y = 0; y <= 9; y++)
      for (let x = 0; x <= 9; x++)
        if (player.board.isOccupied(x, y))
          document
            .querySelector(`[x-coord='${x}'][y-coord='${y}']`)
            .classList.add("occupied");
  }

  function updateControlsDiv() {
    document.querySelectorAll(".ship").forEach((btn) => {
      btn.classList.remove("active");
      const remShips = btn.querySelector(".remaining-ships");
      const key = btn.getAttribute("key");
      remShips.textContent = shipAmount[key];
      btn.disabled = shipAmount[key] === 0 ? true : false;
    });

    // Update currShip
    const shipsBtns = document.querySelectorAll(".ship");
    for (let btn of shipsBtns) {
      if (!btn.disabled) {
        btn.classList.add("active");
        break;
      }
    }
  }
}

function isOutOfShips() {
  // Verify if out of ships
  let shipBtns = Array.from(document.querySelectorAll(".ship"));
  // If all buttons are disabled, return
  return shipBtns.reduce((acc, cur) => acc && cur.disabled, true);
}

function doneButton() {
  const doneBtn = document.createElement("button");
  doneBtn.setAttribute("type", "button");
  doneBtn.setAttribute("id", "done");
  doneBtn.disabled = true;
  doneBtn.textContent = "Pronto!";
  document.querySelector("#content").appendChild(doneBtn);
  return doneBtn;
}
