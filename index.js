import startPVP from "./interface/pvp.js";

(function init() {
  renderMainMenu();
})();

function renderMainMenu() {
  // Render the main menu and add the triggers for the buttons
  // Game title
  const gameTitle = document.createElement("h1");
  gameTitle.textContent = "Batalha Naval";
  document.body.appendChild(gameTitle);

  // Menu buttons
  const pvpBtn = document.createElement("button");
  pvpBtn.textContent = "Jogador vs Jogador";
  pvpBtn.addEventListener("click", startPVP);
  document.body.appendChild(pvpBtn);

  const pvIaBtn = document.createElement("button");
  pvIaBtn.textContent = "Jogador vs Computador";
  document.body.appendChild(pvIaBtn);
}
