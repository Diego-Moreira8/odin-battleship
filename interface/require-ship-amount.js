/* Require players the ship amount that will be used in the game 
and return a object with the chosen ship config */

export default function requireShipAmount() {
  const content = document.querySelector("#content");
  content.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = "Escolha a quantidade de navios";
  content.appendChild(title);

  const description = document.createElement("div");
  description.textContent = "Até 10 navios, de qualquer tipo";
  content.appendChild(description);

  // Create 5 divs with the ships ("i" is the ship length)
  for (let i = 0; i < 5; i++) {
    const shipDiv = document.createElement("div");
    shipDiv.setAttribute("class", "ship-amount-group");

    const shipName = document.createElement("div");
    // Switch the ship name based on the length
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

    content.appendChild(shipDiv);

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
  content.appendChild(confirmBtn);

  return new Promise((resolve) => {
    confirmBtn.addEventListener("click", () => {
      const amounts = document.querySelectorAll(".ship-amount");
      resolve({
        shipSize5: parseInt(amounts[0].textContent),
        shipSize4: parseInt(amounts[1].textContent),
        shipSize3: parseInt(amounts[2].textContent),
        shipSize2: parseInt(amounts[3].textContent),
        shipSize1: parseInt(amounts[4].textContent),
      });
    });
  });
}
