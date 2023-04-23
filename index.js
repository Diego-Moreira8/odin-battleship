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
  const mainMenuDiv = document.createElement("div");
  mainMenuDiv.setAttribute("id", "main-menu");
  // Game title
  const gameTitle = document.createElement("h1");
  gameTitle.textContent = "Batalha Naval";
  mainMenuDiv.appendChild(gameTitle);

  // Menu buttons
  const pvpBtn = document.createElement("button");
  pvpBtn.textContent = "Jogador vs Jogador";
  pvpBtn.setAttribute("type", "button");
  pvpBtn.addEventListener("click", startPVP);
  mainMenuDiv.appendChild(pvpBtn);

  const playerVsIA = document.createElement("button");
  playerVsIA.setAttribute("type", "button");
  playerVsIA.textContent = "Jogador vs Computador";
  playerVsIA.addEventListener("click", startPlayerVsIA);
  mainMenuDiv.appendChild(playerVsIA);

  document.body.appendChild(mainMenuDiv);
}
