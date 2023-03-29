import { Ship, GameBoard } from "./index.js";

test("Ship creation", () => {
  const testShip = new Ship(2);

  expect(testShip.isSunk()).toBeFalsy();

  testShip.hit();
  testShip.hit();

  expect(testShip.isSunk()).toBeTruthy();
});

describe("Gameboard - ship placement", () => {
  let testBoard;

  beforeEach(() => {
    testBoard = new GameBoard();
  });

  test("Invalid inputs", () => {
    expect(testBoard.placeShip(1, 10, 10, "horizontal")).toBeNull();
    expect(testBoard.placeShip(1, 1, 1, "wrong string")).toBeNull();
    expect(testBoard.placeShip(-1, 0, 0, "horizontal")).toBeNull();
    expect(testBoard.placeShip(5, 0, 0, "horizontal")).toBeNull();
    expect(testBoard.placeShip(5, 0, 0, 0, "horizontal")).toBeNull();
    expect(testBoard.placeShip(5)).toBeNull();
    expect(testBoard.placeShip("a", 0, 0, "vertical")).toBeNull();
    expect(testBoard.placeShip(1, "a", 0, "vertical")).toBeNull();
    expect(testBoard.placeShip(1, 0, "a", "vertical")).toBeNull();
    expect(testBoard.placeShip(1, 0, 0, 1)).toBeNull();
  });

  test("Horizontal placement", () => {
    expect(testBoard.placeShip(2, 4, 5, "horizontal")).not.toBeNull();
    console.log(testBoard.printBoard());
    expect(testBoard.isOccupied(3, 5)).toBeFalsy();
    expect(testBoard.isOccupied(4, 5)).toBeTruthy();
    expect(testBoard.isOccupied(5, 5)).toBeTruthy();
    expect(testBoard.isOccupied(6, 5)).toBeFalsy();
  });

  test("Vertical placement", () => {
    expect(testBoard.placeShip(3, 5, 2, "vertical")).not.toBeNull();
    console.log(testBoard.printBoard());
    expect(testBoard.isOccupied(5, 1)).toBeFalsy();
    expect(testBoard.isOccupied(5, 2)).toBeTruthy();
    expect(testBoard.isOccupied(5, 3)).toBeTruthy();
    expect(testBoard.isOccupied(5, 4)).toBeTruthy();
    expect(testBoard.isOccupied(5, 5)).toBeFalsy();
  });
});
