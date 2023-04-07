import { Player } from "./game-board.js";

(function init() {
  renderMenu();
})();

function renderMenu() {
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

async function startPVP() {
  //const player1 = new Player(await requirePlayerName(1));
  //console.log(player1);
  //await renderPassScreen();
  //const player2 = new Player(await requirePlayerName(2));
  //console.log(player2);
  requireShipAmount();
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
  // Require players the ship amount that will be used in the game
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
}

function renderPassScreen() {
  // Render a pass screen and return a promise of the pressed done button
  clearPage();

  const msg = document.createElement("div");
  msg.textContent = "Passe o dispositivo para o(a) rival...";
  document.body.appendChild(msg);

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Pronto!";
  document.body.appendChild(doneBtn);

  return new Promise((resolve) => {
    doneBtn.addEventListener("click", () => {
      resolve();
    });
  });
}

function clearPage() {
  // Clear all HTML elements
  document.body.innerHTML = "";
}
