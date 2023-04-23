// Render a pass device screen and returns when done button is clicked

export default function passScreen() {
  const content = document.querySelector("#content");
  content.innerHTML = "";

  const passScreenDiv = document.createElement("div");
  passScreenDiv.setAttribute("id", "pass-screen");

  const msg = document.createElement("div");
  msg.textContent = "Passe o dispositivo para o(a) inimigo(a)...";
  passScreenDiv.appendChild(msg);

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Pronto!";
  passScreenDiv.appendChild(doneBtn);

  content.appendChild(passScreenDiv);

  return new Promise((resolve) => {
    doneBtn.addEventListener("click", () => {
      resolve();
    });
  });
}
