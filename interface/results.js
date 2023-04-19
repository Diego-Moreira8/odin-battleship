import clearPage from "./clear-page.js";

export default function resultsScreen(winnerPlayer) {
  clearPage();

  const title = document.createElement("div");
  title.textContent = "Fim de jogo!";
  document.body.appendChild(title);

  const winner = document.createElement("div");
  winner.textContent = "Vencedor:";
  document.body.appendChild(winner);

  const winnerName = document.createElement("div");
  winnerName.textContent = `${winnerPlayer.getName()}`;
  document.body.appendChild(winnerName);

  const mainMenuBtn = document.createElement("button");
  mainMenuBtn.textContent = "Voltar para o menu principal";
  document.body.appendChild(mainMenuBtn);

  return new Promise((resolve) => {
    mainMenuBtn.addEventListener("click", () => {
      resolve();
    });
  });
}
