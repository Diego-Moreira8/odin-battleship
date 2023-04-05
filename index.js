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
  const player1 = new Player(await requirePlayerName(1));
  console.log(player1);
  await renderPassScreen();
  const player2 = new Player(await requirePlayerName(2));
  console.log(player2);
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
