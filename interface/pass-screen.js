// Render a pass device screen and returns when done button is clicked

export default function passScreen() {
  document.body.innerHTML = "";

  const msg = document.createElement("div");
  msg.textContent = "Passe o dispositivo para o(a) inimigo(a)...";
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
