import { Player } from "../game-board.js";
import clearPage from "./clear-page.js";
import passScreen from "./pass-screen.js";
import placeShips from "./place-ships.js";
import attackScreen from "./attack.js";
import resultsScreen from "./results.js";

export default async function startPVP() {
  // const player1 = new Player(await requirePlayerName(1));
  // await passScreen();
  // const player2 = new Player(await requirePlayerName(2));
  // const shipAmount = await requireShipAmount();
  // await placeShips(player1, shipAmount);
  // await passScreen();
  // await placeShips(player2, shipAmount);
  // await passScreen();

  // Simulating...
  const player1 = new Player("Jogador teste 1");
  const player2 = new Player("Jogador teste 2");
  player1.getBoard().placeShip(1, 0, 0, "horizontal");
  player2.getBoard().placeShip(1, 0, 0, "horizontal");

  // Game loop
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
}

function requirePlayerName(playerNumber) {
  // Render the form, and returns a promise of the name input
  clearPage();

  const form = document.createElement("form");

  const label = document.createElement("label");
  label.setAttribute("for", "name");
  label.textContent = `Jogador ${playerNumber}, digite seu nome`;
  form.appendChild(label);

  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "name");
  form.appendChild(nameInput);

  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("type", "submit");
  submitBtn.textContent = "Confirmar";
  form.appendChild(submitBtn);

  document.body.appendChild(form);

  return new Promise((resolve) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      resolve(e.target.name.value);
    });
  });
}

function requireShipAmount() {
  /* Require players the ship amount that will be used in the game 
  and return a object with the chosen ship config */
  clearPage();

  const title = document.createElement("h2");
  title.textContent = "Escolham a quantidade de navios";
  document.body.appendChild(title);

  const description = document.createElement("div");
  description.textContent = "Até 10 navios, de qualquer tipo";
  document.body.appendChild(description);

  // Create 5 divs with the ships
  for (let i = 0; i < 5; i++) {
    const shipDiv = document.createElement("div");
    shipDiv.setAttribute("class", "ship-amount-group");

    const shipName = document.createElement("div");
    // Switch the ship name
    switch (i) {
      case 0:
        shipName.textContent = "Porta-aviões (tamanho 5)";
        break;
      case 1:
        shipName.textContent = "Couraçado (tamanho 4)";
        break;
      case 2:
        shipName.textContent = "Cruzador (tamanho 3)";
        break;
      case 3:
        shipName.textContent = "Submarino (tamanho 2)";
        break;
      case 4:
        shipName.textContent = "Destróier (tamanho 1)";
        break;
    }
    shipDiv.appendChild(shipName);

    const minusBtn = document.createElement("button");
    minusBtn.setAttribute("class", "minus-button");
    minusBtn.disabled = true;
    minusBtn.textContent = "-";
    shipDiv.appendChild(minusBtn);
    minusBtn.addEventListener("click", updateAmount);

    const shipAmount = document.createElement("span");
    shipAmount.setAttribute("class", "ship-amount");
    shipAmount.textContent = 0;
    shipDiv.appendChild(shipAmount);

    const plusBtn = document.createElement("button");
    plusBtn.setAttribute("class", "plus-button");
    plusBtn.textContent = "+";
    shipDiv.appendChild(plusBtn);
    plusBtn.addEventListener("click", updateAmount);

    document.body.appendChild(shipDiv);

    function updateAmount(e) {
      // Update the ship amount and the disabled status for the buttons
      const counter = e.target.parentElement.querySelector(".ship-amount");
      const operator = e.target.textContent;

      if (operator === "+" && sumShips() < 10) {
        counter.textContent = parseInt(counter.textContent) + 1;
      } else if (operator === "-" && parseInt(counter.textContent) > 0) {
        counter.textContent = parseInt(counter.textContent) - 1;
      }
      // Add a "disabled" class for the - buttons when amount === 0
      const shipGroup = document.querySelectorAll(".ship-amount-group");
      shipGroup.forEach((group) => {
        group.querySelector(".minus-button").disabled =
          parseInt(group.querySelector(".ship-amount").textContent) === 0
            ? true
            : false;
      });
      // Add a "disabled" class for the + buttons when total ships === 10
      const plusBtns = document.querySelectorAll(".plus-button");
      if (sumShips() === 10) {
        plusBtns.forEach((btn) => (btn.disabled = true));
      } else {
        plusBtns.forEach((btn) => (btn.disabled = false));
      }
      // Toggle disabled for the start button
      confirmBtn.disabled = sumShips() > 0 ? false : true;
    }

    function sumShips() {
      let sum = 0;
      const shipAmounts = document.querySelectorAll(".ship-amount");
      shipAmounts.forEach((el) => {
        sum += parseInt(el.textContent);
      });
      return sum;
    }
  }

  const confirmBtn = document.createElement("button");
  confirmBtn.disabled = true;
  confirmBtn.textContent = "Começar!";
  document.body.appendChild(confirmBtn);

  return new Promise((resolve) => {
    confirmBtn.addEventListener("click", () => {
      const amounts = document.querySelectorAll(".ship-amount");
      resolve({
        shipSize5: parseInt(amounts[0].textContent),
        shipSize4: parseInt(amounts[1].textContent),
        shipSize3: parseInt(amounts[2].textContent),
        shipSize2: parseInt(amounts[3].textContent),
        shipSize1: parseInt(amounts[4].textContent),
      });
    });
  });
}
