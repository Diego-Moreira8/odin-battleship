import { Ship, GameBoard } from "./index.js";

test("Ship creation", () => {
  const testShip = new Ship(2);

  expect(testShip.isSunk()).toBeFalsy();

  testShip.hit();
  testShip.hit();

  expect(testShip.isSunk()).toBeTruthy();
});

test("Board Creation", () => {
  const testBoard = new GameBoard();
  expect(testBoard.placeShip(1, 10, 10, "horizontal")).toBeNull;
  expect(testBoard.placeShip(1, 1, 1, "wrong string")).toBeNull;
});
