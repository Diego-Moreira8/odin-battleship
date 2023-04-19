/* 
* Creates and returns a board element.
* To insert, use, Node.appendChild(renderBoard()).
* For the board be visible, the CSS, must have at least a height for the .board
  and a border color for the .board-position.
* {box-sizing: border-box;} is required too. */

export default function renderBoard() {
  const boardDiv = document.createElement("div");
  boardDiv.setAttribute("class", "board");
  boardDiv.style.display = "grid";
  boardDiv.style.grid = "repeat(10, 1fr) / repeat(10, 1fr)";

  for (let y = 0; y <= 9; y++) {
    for (let x = 0; x <= 9; x++) {
      const position = document.createElement("div");
      position.setAttribute("x-coord", x);
      position.setAttribute("y-coord", y);
      position.setAttribute("class", "board-position");
      boardDiv.appendChild(position);
    }
  }

  return boardDiv;
}
