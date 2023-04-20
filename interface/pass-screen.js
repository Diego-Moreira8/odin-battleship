// Render a pass device screen and returns when done button is clicked

export default function passScreen() {
  const content = document.querySelector("#content");
  content.innerHTML = "";

  const msg = document.createElement("div");
  msg.textContent = "Passe o dispositivo para o(a) inimigo(a)...";
  content.appendChild(msg);

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Pronto!";
  content.appendChild(doneBtn);

  return new Promise((resolve) => {
    doneBtn.addEventListener("click", () => {
      resolve();
    });
  });
}
