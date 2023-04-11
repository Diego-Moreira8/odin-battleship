import clearPage from "./clear-page.js";
import renderBoard from "./render-board.js";

export default function placeShips(player, shipAmount) {
  // Render page ###############################################################
  clearPage();

  const title = document.createElement("h2");
  title.textContent = `${player.getName()}, posicione suas embarcações!`;
  document.body.appendChild(title);

  // Div for controls
  const controlsDiv = document.createElement("div");

  // Rotate button
  let currDirection = "horizontal";
  const rotateBtn = document.createElement("button");
  rotateBtn.setAttribute("type", "button");
  rotateBtn.textContent = "↻ Horizontal";
  rotateBtn.addEventListener("click", (e) => {
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
  let currShip;
  for (let key in shipAmount) {
    if (shipAmount[key] > 0) {
      if (currShip === undefined) currShip = key; // Start with the first btn

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
      shipBtn.insertAdjacentElement("beforeend", shipAmountSpan);

      shipBtn.addEventListener("click", (e) => {
        currShip = e.target.getAttribute("key");
      });
      controlsDiv.appendChild(shipBtn);
    }
  }

  document.body.appendChild(controlsDiv);

  document.body.appendChild(renderBoard());

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Pronto!";
  document.body.appendChild(doneBtn);

  // Hover effect ##############################################################
  let currPosition = { x: undefined, y: undefined };
  let hoverSize; // According with the currShip
  let posToHover = []; // Array with the nodes to be hovered
  let hoverClass;

  const positions = document.querySelectorAll(".board-position");
  positions.forEach((pos) => {
    pos.addEventListener("mouseenter", (e) => {
      currPosition.x = parseInt(e.target.getAttribute("x-coord"));
      currPosition.y = parseInt(e.target.getAttribute("y-coord"));
      hoverSize = parseInt(currShip.slice(-1));
      posToHover = []; // Reset array
      // Choose the class that will be added
      hoverClass =
        (currDirection === "horizontal" &&
          hoverSize > 1 &&
          currPosition.x + hoverSize > 10) ||
        (currDirection === "vertical" &&
          hoverSize > 1 &&
          currPosition.y + hoverSize > 10)
          ? "hover-invalid"
          : "hover";

      if (currDirection === "horizontal") {
        for (let i = 0; i < hoverSize; i++) {
          posToHover.push(
            document.querySelector(
              `[x-coord='${currPosition.x + i}'][y-coord='${currPosition.y}']`
            )
          );
        }
      } else {
        for (let i = 0; i < hoverSize; i++) {
          posToHover.push(
            document.querySelector(
              `[x-coord='${currPosition.x}'][y-coord='${currPosition.y + i}']`
            )
          );
        }
      }

      posToHover.forEach((pos) => {
        if (pos !== null) pos.classList.add(hoverClass);
      });
    });

    pos.addEventListener("mouseleave", () => {
      posToHover.forEach((pos) => {
        if (pos !== null) pos.classList.remove(hoverClass);
      });
    });
  });

  // Place ship ################################################################
  positions.forEach((pos) => {
    pos.addEventListener("click", () => {
      player
        .getBoard()
        .placeShip(hoverSize, currPosition.x, currPosition.y, currDirection);

      syncBoard();
      shipAmount[currShip] -= 1;
      updateControlsDiv();
    });
  });

  function syncBoard() {
    for (let y = 0; y <= 9; y++) {
      for (let x = 0; x <= 9; x++) {
        if (player.getBoard().isOccupied(x, y)) {
          document
            .querySelector(`[x-coord='${x}'][y-coord='${y}']`)
            .classList.add("occupied");
        }
      }
    }
  }

  function updateControlsDiv() {
    for (let i = 1; i <= 5; i++) {
      const btn = document.querySelector(`[key=shipSize${i}]`);
      const remShips = btn.querySelector(".remaining-ships");

      remShips.textContent = shipAmount[`shipSize${i}`];

      if (shipAmount[`shipSize${i}`] === 0) {
        btn.disabled = true;
      }
    }
  }

  return new Promise((resolve) => {
    doneBtn.addEventListener("click", () => {
      resolve();
    });
  });
}
