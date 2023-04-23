/*
 * Adds a pause button that opens a menu with options to resume and quit game

 * The menu will persist in all game loop.
*/

import init from "../index.js";

export default function pauseMenu() {
  const pauseBtn = document.createElement("button");
  pauseBtn.setAttribute("type", "button");
  pauseBtn.setAttribute("id", "pause");
  pauseBtn.textContent = "||";
  pauseBtn.addEventListener("click", () => menuDiv.classList.add("active"));

  const menuDiv = document.createElement("div");
  menuDiv.setAttribute("id", "pause-menu");

  const returnBtn = document.createElement("button");
  returnBtn.textContent = "Continuar o jogo";
  returnBtn.addEventListener("click", () => menuDiv.classList.remove("active"));

  const quitBtn = document.createElement("button");
  quitBtn.textContent = "Sair do jogo";
  quitBtn.addEventListener("click", () => quitConfirm.classList.add("active"));

  const quitConfirm = document.createElement("div");
  quitConfirm.setAttribute("id", "quit-confirm");
  quitConfirm.textContent =
    "Tem certeza que deseja sair do jogo? Todo o progresso será perdido!";

  const yesBtn = document.createElement("button");
  yesBtn.textContent = "Sim";
  yesBtn.addEventListener("click", init);

  const noBtn = document.createElement("button");
  noBtn.textContent = "Não";
  noBtn.addEventListener("click", () => quitConfirm.classList.remove("active"));

  [yesBtn, noBtn].forEach((btn) => quitConfirm.appendChild(btn));

  [returnBtn, quitBtn, quitConfirm].forEach((btn) => menuDiv.appendChild(btn));

  [pauseBtn, menuDiv].forEach((el) => document.body.appendChild(el));
}
