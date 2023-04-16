import clearPage from "./clear-page.js";
import renderBoard from "./render-board.js";

export default function placeShips(player, passedShipAmount) {
  // Clone shipAmount so this function doesn't make changes on the passed object
  let shipAmount = structuredClone(passedShipAmount);

  clearPage();

  // Page Title
  const title = document.createElement("h2");
  title.textContent = `${player.getName()}, posicione suas embarcações!`;
  document.body.appendChild(title);

  renderOptionsDiv(shipAmount);
  document.body.appendChild(renderBoard());
  hoverEffect();
  clickPositionAction(player, shipAmount);

  // This function will return when doneBtn is clicked
  const doneBtn = doneButton();
  return new Promise((resolve) => {
    doneBtn.addEventListener("click", () => {
      alert();
      resolve();
    });
  });
}

function renderOptionsDiv(shipAmount) {
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

  document.body.appendChild(controlsDiv);
}

function hoverEffect() {
  const positions = document.querySelectorAll(".board-position");
  positions.forEach((position) => {
    ["mouseenter", "mouseleave"].forEach((event) => {
      position.addEventListener(event, () => {
        /* Clear the hover classes to prevent the class to not be removed
        after place a ship*/
        document
          .querySelectorAll(".place-hover, .place-hover-invalid")
          .forEach((el) => {
            el.classList.remove("place-hover");
            el.classList.remove("place-hover-invalid");
          });

        // Hover to delete
        const deleteShipBtn = document.querySelector("#delete-ship");
        if (deleteShipBtn.classList.contains("active")) {
          position.classList.toggle("delete-hover");
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
        let hoverClass = "place-hover";

        // Search for invalid positions and populates toBeHovered
        if (currDirection === "horizontal") {
          for (let i = 0; i < currShipLength; i++) {
            const position = document.querySelector(
              `[x-coord='${x + i}'][y-coord='${y}']`
            );

            // If the ship cross the edge or finds an occupied position
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
          if (el !== null) el.classList.toggle(hoverClass);
        });
      });
    });
  });
}

function clickPositionAction(player, shipAmount) {
  const positions = document.querySelectorAll(".board-position");
  positions.forEach((position) => {
    position.addEventListener("click", () => {
      // Current ship coordinates
      const x = parseInt(position.getAttribute("x-coord"));
      const y = parseInt(position.getAttribute("y-coord"));

      // Delete ship
      const deleteShipBtn = document.querySelector("#delete-ship");
      if (deleteShipBtn.classList.contains("active")) {
        const recoveredShip = player.getBoard().deleteShip(x, y);
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
      // Place ship
      const direction = document
        .querySelector("#direction")
        .getAttribute("data-current-direction");
      const length = parseInt(
        document.querySelector(".ship.active").getAttribute("key").slice(-1)
      );
      // If succeed on placing ship
      if (player.getBoard().placeShip(length, x, y, direction) !== null) {
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
        if (player.getBoard().isOccupied(x, y))
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
  return shipBtns.reduce((acc, cur) => acc && cur.disabled);
}

function doneButton() {
  const doneBtn = document.createElement("button");
  doneBtn.setAttribute("type", "button");
  doneBtn.setAttribute("id", "done");
  doneBtn.disabled = true;
  doneBtn.textContent = "Pronto!";
  document.body.appendChild(doneBtn);
  return doneBtn;
}
