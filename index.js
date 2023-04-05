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
  clearPage();
  console.log(await requirePlayerName(1));
  clearPage();
  console.log(await requirePlayerName(2));
  clearPage();
}

function requirePlayerName(playerNumber) {
  // Render the form, and returns a promise of the name input
  // Name form
  const form = document.createElement("form");
  // Label
  const label = document.createElement("label");
  label.setAttribute("for", "name");
  label.textContent = `Jogador ${playerNumber}, digite seu nome`;
  form.appendChild(label);
  // Input
  const nameInput = document.createElement("input");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("id", "name");
  form.appendChild(nameInput);
  // Submit btn
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

function clearPage() {
  // Clear all HTML elements
  document.body.innerHTML = "";
}
