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

  // Create buttons with the chosen ships

  // return new Promise((resolve) => {
  //   resolve(0);
  // });
}
