/* Render the main menu, with buttons that start the selected game mode */

import startPVP from "./interface/pvp.js";
import startPlayerVsIA from "./interface/player-vs-ia.js";

init();

export default function init() {
  document.body.innerHTML = "";
  renderMainMenu();
}

function renderMainMenu() {
  // Render the main menu and add the triggers for the buttons
  // Game title
  const gameTitle = document.createElement("h1");
  gameTitle.textContent = "Batalha Naval";
  document.body.appendChild(gameTitle);

  // Menu buttons
  const pvpBtn = document.createElement("button");
  pvpBtn.textContent = "Jogador vs Jogador";
  pvpBtn.setAttribute("type", "button");
  pvpBtn.addEventListener("click", startPVP);
  document.body.appendChild(pvpBtn);

  const playerVsIA = document.createElement("button");
  playerVsIA.setAttribute("type", "button");
  playerVsIA.textContent = "Jogador vs Computador";
  playerVsIA.addEventListener("click", startPlayerVsIA);
  document.body.appendChild(playerVsIA);
}
