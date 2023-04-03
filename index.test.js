import { Ship, GameBoard } from "./index.js";

test("Ship creation", () => {
  const testShip = new Ship(2);

  expect(testShip.isSunk()).toBeFalsy();

  testShip.hit();
  testShip.hit();

  expect(testShip.isSunk()).toBeTruthy();
});

describe("Game board - ship placement", () => {
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

  test("Going over the edge", () => {
    expect(testBoard.placeShip(2, 9, 0, "horizontal")).toBeNull();
    expect(testBoard.placeShip(3, 9, 0, "horizontal")).toBeNull();
    expect(testBoard.placeShip(4, 9, 0, "horizontal")).toBeNull();

    expect(testBoard.placeShip(3, 8, 0, "horizontal")).toBeNull();
    expect(testBoard.placeShip(4, 8, 0, "horizontal")).toBeNull();

    expect(testBoard.placeShip(4, 7, 0, "horizontal")).toBeNull();

    expect(testBoard.placeShip(2, 9, 0, "vertical")).toBeNull();
    expect(testBoard.placeShip(3, 9, 0, "vertical")).toBeNull();
    expect(testBoard.placeShip(4, 9, 0, "vertical")).toBeNull();

    expect(testBoard.placeShip(3, 8, 0, "vertical")).toBeNull();
    expect(testBoard.placeShip(4, 8, 0, "vertical")).toBeNull();

    expect(testBoard.placeShip(4, 7, 0, "vertical")).toBeNull();
  });

  test("Placing in occupied coordinates", () => {
    testBoard.placeShip(1, 0, 0, "horizontal");
    expect(testBoard.placeShip(1, 0, 0, "horizontal")).toBeNull();

    testBoard.placeShip(4, 5, 1, "horizontal");

    expect(testBoard.placeShip(4, 2, 1, "horizontal")).toBeNull();
    expect(testBoard.placeShip(4, 3, 1, "horizontal")).toBeNull();
    expect(testBoard.placeShip(4, 4, 1, "horizontal")).toBeNull();
    expect(testBoard.placeShip(4, 5, 1, "horizontal")).toBeNull();
    expect(testBoard.placeShip(4, 6, 1, "horizontal")).toBeNull();
    expect(testBoard.placeShip(3, 7, 1, "horizontal")).toBeNull();
    expect(testBoard.placeShip(2, 8, 1, "horizontal")).toBeNull();

    expect(testBoard.placeShip(4, 1, 1, "horizontal")).not.toBeNull();
    expect(testBoard.placeShip(1, 9, 1, "horizontal")).not.toBeNull();

    testBoard.placeShip(4, 0, 5, "vertical");

    expect(testBoard.placeShip(4, 0, 2, "vertical")).toBeNull();
    expect(testBoard.placeShip(4, 0, 3, "vertical")).toBeNull();
    expect(testBoard.placeShip(4, 0, 4, "vertical")).toBeNull();
    expect(testBoard.placeShip(4, 0, 5, "vertical")).toBeNull();
    expect(testBoard.placeShip(4, 0, 6, "vertical")).toBeNull();
    expect(testBoard.placeShip(3, 0, 7, "vertical")).toBeNull();
    expect(testBoard.placeShip(2, 0, 8, "vertical")).toBeNull();

    expect(testBoard.placeShip(4, 0, 1, "vertical")).not.toBeNull();
    expect(testBoard.placeShip(1, 0, 9, "vertical")).not.toBeNull();
  });

  test("Attacking", () => {
    expect(testBoard.receiveAttack(0, 0)).toBeNull();

    testBoard.placeShip(1, 1, 1, "horizontal");
    expect(testBoard.receiveAttack(1, 1)).not.toBeNull();
    expect(testBoard.receiveAttack(1, 1)).toBeNull();

    testBoard.placeShip(4, 0, 2, "horizontal");
    expect(testBoard.receiveAttack(0, 2)).not.toBeNull();
    expect(testBoard.receiveAttack(1, 2)).not.toBeNull();
    expect(testBoard.receiveAttack(2, 2)).not.toBeNull();
    expect(testBoard.receiveAttack(3, 2)).not.toBeNull();
    expect(testBoard.receiveAttack(0, 2)).toBeNull();
    expect(testBoard.receiveAttack(1, 2)).toBeNull();
    expect(testBoard.receiveAttack(2, 2)).toBeNull();
    expect(testBoard.receiveAttack(3, 2)).toBeNull();
  });
});
