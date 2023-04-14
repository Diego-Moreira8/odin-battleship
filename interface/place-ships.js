import clearPage from "./clear-page.js";
import renderBoard from "./render-board.js";

export default function placeShips(player, passedShipAmount) {
  // Clone shipAmount so this function doesn't make changes on the passed object
  let shipAmount = structuredClone(passedShipAmount);

  // Render page ###############################################################
  clearPage();

  const title = document.createElement("h2");
  title.textContent = `${player.getName()}, posicione suas embarcações!`;
  document.body.appendChild(title);

  // Div for controls
  const controlsDiv = document.createElement("div");

  // Delete button
  const deleteShipBtn = document.createElement("button");
  deleteShipBtn.setAttribute("type", "button");
  deleteShipBtn.textContent = "Apagar embarcação";
  controlsDiv.appendChild(deleteShipBtn);
  deleteShipBtn.addEventListener("click", (e) => {
    e.target.classList.add("active");
  });

  // Rotate button
  let currDirection = "horizontal";
  const rotateBtn = document.createElement("button");
  rotateBtn.setAttribute("type", "button");
  rotateBtn.textContent = "↻ Horizontal";
  rotateBtn.addEventListener("click", () => {
    if (rotateBtn.textContent === "↻ Horizontal") {
      rotateBtn.textContent = "↻ Vertical";
      currDirection = "vertical";
    } else {
      rotateBtn.textContent = "↻ Horizontal";
      currDirection = "horizontal";
    }
  });
  controlsDiv.appendChild(rotateBtn);

  // Ships buttons
  let currShip; // Store a key from the shipAmount object
  for (let key in shipAmount) {
    if (shipAmount[key] > 0) {
      // Initialize currShip with the biggest ship on the shipAmount object
      if (currShip === undefined) currShip = key;

      const shipBtn = document.createElement("button");
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

      shipBtn.addEventListener("click", (e) => {
        deleteShipBtn.classList.remove("active");
        currShip = e.target.getAttribute("key");
      });

      controlsDiv.appendChild(shipBtn);
    }
  }
  document.body.appendChild(controlsDiv);

  // Board
  document.body.appendChild(renderBoard());

  // Done button
  const doneBtn = document.createElement("button");
  doneBtn.setAttribute("type", "button");
  doneBtn.disabled = true;
  doneBtn.textContent = "Pronto!";
  document.body.appendChild(doneBtn);

  // Hover effect ##############################################################
  const positions = document.querySelectorAll(".board-position");
  positions.forEach((pos) => {
    let currPosition = {
      x: undefined,
      y: undefined,
    };
    let positionsToHover = [];
    let hoverClass;
    let hoverSize;

    pos.addEventListener("mouseenter", (e) => {
      if (deleteShipBtn.classList.contains("active")) {
        return;
      }

      if (currShip === null) return; // Create a error message

      currPosition.x = parseInt(e.target.getAttribute("x-coord"));
      currPosition.y = parseInt(e.target.getAttribute("y-coord"));

      hoverSize = parseInt(currShip.slice(-1));

      // Creates an array with the positions that need to be highlighted
      positionsToHover = [];
      if (currDirection === "horizontal") {
        for (let i = 0; i < hoverSize; i++) {
          positionsToHover.push(
            document.querySelector(
              `[x-coord='${currPosition.x + i}'][y-coord='${currPosition.y}']`
            )
          );
        }
      } else {
        for (let i = 0; i < hoverSize; i++) {
          positionsToHover.push(
            document.querySelector(
              `[x-coord='${currPosition.x}'][y-coord='${currPosition.y + i}']`
            )
          );
        }
      }

      // Verify if the position will be valid for placing a ship
      hoverClass =
        (currDirection === "horizontal" &&
          hoverSize > 1 &&
          currPosition.x + hoverSize > 10) ||
        (currDirection === "vertical" &&
          hoverSize > 1 &&
          currPosition.y + hoverSize > 10)
          ? "hover-invalid"
          : "hover";

      // Verify if there are positions occupied
      for (let entry of positionsToHover) {
        if (entry !== null && entry.classList.contains("occupied")) {
          hoverClass = "hover-invalid";
          break;
        }
      }

      // Apply the class
      positionsToHover.forEach((pos) => {
        if (pos !== null) pos.classList.add(hoverClass);
      });
    });

    pos.addEventListener("mouseleave", () => {
      positionsToHover.forEach((pos) => {
        if (pos !== null) pos.classList.remove(hoverClass);
      });
    });
  });

  // Place/delete ship #########################################################
  positions.forEach((pos) => {
    pos.addEventListener("click", (e) => {
      const x = parseInt(e.target.getAttribute("x-coord"));
      const y = parseInt(e.target.getAttribute("y-coord"));

      // If deleting ship button is active:
      if (deleteShipBtn.classList.contains("active")) {
        let recoveredShip = player.getBoard().deleteShip(x, y);

        if (recoveredShip === null) return;

        // Finds the recovered ship in the shipAmount object and increments it
        for (let key in shipAmount)
          if (parseInt(key.slice(-1)) === recoveredShip.length)
            shipAmount[key] += 1;

        updateControlsDiv();
        syncBoard();
        doneButtonStatus();
        return;
      }

      // If there are no ships left
      if (currShip === null) return; // Create a error message

      // If placing a ship
      const length = currShip === null ? null : parseInt(currShip.slice(-1));
      if (player.getBoard().placeShip(length, x, y, currDirection) !== null) {
        shipAmount[currShip] -= 1;
        updateControlsDiv();
        syncBoard();
        doneButtonStatus();
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
    // Update ship amounts and disable when hits 0
    for (let i = 1; i <= 5; i++) {
      const btn = document.querySelector(`[key=shipSize${i}]`);
      if (btn === null) continue; // Btn not present, skip it

      const remShips = btn.querySelector(".remaining-ships");

      remShips.textContent = shipAmount[`shipSize${i}`];

      btn.disabled = shipAmount[`shipSize${i}`] === 0 ? true : false;
    }

    // Update currShip
    let shipAvailable = false;

    for (let key in shipAmount) {
      if (shipAmount[key] > 0) {
        shipAvailable = true;
        currShip = key;
        break;
      }
    }

    if (!shipAvailable) currShip = null;
  }

  function doneButtonStatus() {
    // Verify if there are remaining ships. If no, enables the done button
    let counter = 0;
    for (let key in shipAmount) counter += shipAmount[key];
    doneBtn.disabled = counter > 0 ? true : false;
  }

  return new Promise((resolve) => {
    doneBtn.addEventListener("click", () => {
      resolve();
    });
  });
}
