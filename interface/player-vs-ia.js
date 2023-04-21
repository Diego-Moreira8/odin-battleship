/* Starts a Player vs Player match. Asks for the players names, and the amount
of each of the ships that will be used in the game. The total of ships must be 
between 1 and 10. Then starts the game loop. */

import Player from "../game-classes/player.js";
import passScreen from "./pass-screen.js";
import placeShips from "./place-ships.js";
import attackScreen from "./attack.js";
import resultsScreen from "./results.js";
import init from "../index.js";
import pauseMenu from "./pause-menu.js";
import requireShipAmount from "./require-ship-amount.js";
import CPUPlayer from "../game-classes/cpu-player.js";

export default async function startPlayerVsIA() {
  document.body.innerHTML = "";
  pauseMenu(); // Will be present until the game ends
  const content = document.createElement("div");
  content.setAttribute("id", "content");
  document.body.appendChild(content);

  const player = new Player();
  const shipAmount = await requireShipAmount();
  await placeShips(player, shipAmount);
  const cpu = await cpuPlacingShipsScreen(shipAmount);
  console.log(cpu);

  // Game loop. Loops until the player or the IA is out of ships
  let winnerPlayer;
  do {
    // Player turn...
    winnerPlayer = await attackScreen(player, cpu);
    if (winnerPlayer) continue;
    console.log(winnerPlayer);
    // CPU turn...
    cpu.attack(player.board);
  } while (!winnerPlayer);

  await resultsScreen(winnerPlayer);

  init();
}

function cpuPlacingShipsScreen(shipAmount) {
  const content = document.querySelector("#content");
  content.innerHTML = "";

  const waitMsg = document.createElement("div");
  waitMsg.textContent =
    "Por favor aguarde, o computador está posicionando as embarcações...";

  const startBtn = document.createElement("button");
  startBtn.setAttribute("type", "button");
  startBtn.disabled = true;
  startBtn.textContent = "Começar!";

  [waitMsg, startBtn].forEach((el) => content.appendChild(el));

  const cpuPlayer = new CPUPlayer();

  // CPU place ships...
  for (let key in shipAmount)
    if (shipAmount[key] > 0)
      for (let i = 0; i < shipAmount[key]; i++)
        // Slices the key to get the length
        cpuPlayer.placeShip(parseInt(key.slice(-1)));

  waitMsg.textContent =
    "O computador posicionou as embarcações. Pronto para começar?";

  startBtn.disabled = false;

  return new Promise((resolve) => {
    startBtn.addEventListener("click", () => {
      resolve(cpuPlayer);
    });
  });
}
