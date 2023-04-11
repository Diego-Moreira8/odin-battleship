import clearPage from "./clear-page.js";
import renderBoard from "./render-board.js";

export default function placeShips(playerName, shipAmount) {
  clearPage();

  const title = document.createElement("h2");
  title.textContent = `${playerName}, posicione suas embarcações!`;
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
          shipBtn.textContent = `Destróier (${shipAmount[key]})`;
          shipBtn.setAttribute("key", `${key}`);
          break;
        case "shipSize2":
          shipBtn.textContent = `Submarino (${shipAmount[key]})`;
          shipBtn.setAttribute("key", `${key}`);
          break;
        case "shipSize3":
          shipBtn.textContent = `Cruzador (${shipAmount[key]})`;
          shipBtn.setAttribute("key", `${key}`);
          break;
        case "shipSize4":
          shipBtn.textContent = `Couraçado (${shipAmount[key]})`;
          shipBtn.setAttribute("key", `${key}`);
          break;
        case "shipSize5":
          shipBtn.textContent = `Porta-aviões (${shipAmount[key]})`;
          shipBtn.setAttribute("key", `${key}`);
          break;
      }
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

  // Hover effect
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

  return new Promise((resolve) => {
    doneBtn.addEventListener("click", () => {
      resolve();
    });
  });
}
