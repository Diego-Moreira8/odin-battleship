import clearPage from "./clear-page.js";

export default function passScreen() {
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
