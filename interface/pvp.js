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

export default async function startPVP() {
  document.body.innerHTML = "";
  pauseMenu(); // Will be present until the game ends
  const content = document.createElement("div");
  content.setAttribute("id", "content");
  document.body.appendChild(content);

  const player1 = new Player(await requirePlayerName(1));
  await passScreen();
  const player2 = new Player(await requirePlayerName(2));

  const shipAmount = await requireShipAmount();

  await placeShips(player1, shipAmount);
  await passScreen();
  await placeShips(player2, shipAmount);
  await passScreen();

  // Game loop. Loops until one of the players is out of ships
  let winnerPlayer;
  do {
    // Player 1 turn...
    winnerPlayer = await attackScreen(player1, player2);
    if (winnerPlayer) continue;
    await passScreen();
    // Player 2 turn...
    winnerPlayer = await attackScreen(player2, player1);
    if (winnerPlayer) continue;
    await passScreen();
  } while (!winnerPlayer);

  await resultsScreen(winnerPlayer);

  init();
}

function requirePlayerName(playerNumber) {
  // Render the form, and returns the name when submitted
  const content = document.querySelector("#content");
  content.innerHTML = "";

  const form = document.createElement("form");

  const nameLabel = document.createElement("nameLabel");
  nameLabel.setAttribute("for", "name");
  nameLabel.textContent = `Jogador ${playerNumber}, digite seu nome`;
  form.appendChild(nameLabel);

  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "name");
  nameInput.required = true;
  form.appendChild(nameInput);

  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("type", "submit");
  submitBtn.textContent = "Confirmar";
  form.appendChild(submitBtn);

  content.appendChild(form);

  return new Promise((resolve) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      resolve(e.target.name.value);
    });
  });
}
