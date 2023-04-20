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

export default async function startPlayerVsIA() {
  document.body.innerHTML = "";
  pauseMenu(); // Will be present until the game ends
  const content = document.createElement("div");
  content.setAttribute("id", "content");
  document.body.appendChild(content);

  const player = new Player();
  const shipAmount = await requireShipAmount();
  await placeShips(player, shipAmount);
}
