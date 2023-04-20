/* Render a results screen with the name of the winner and a button for return 
to the main menu */

export default function resultsScreen(winnerPlayer) {
  const content = document.querySelector("#content");
  content.innerHTML = "";

  const title = document.createElement("div");
  title.textContent = "Fim de jogo!";
  content.appendChild(title);

  const winner = document.createElement("div");
  winner.textContent = "Vencedor:";
  content.appendChild(winner);

  const winnerName = document.createElement("div");
  winnerName.textContent = `${winnerPlayer.name}`;
  content.appendChild(winnerName);

  const mainMenuBtn = document.createElement("button");
  mainMenuBtn.textContent = "Voltar para o menu principal";
  content.appendChild(mainMenuBtn);

  return new Promise((resolve) => {
    mainMenuBtn.addEventListener("click", () => {
      resolve();
    });
  });
}
