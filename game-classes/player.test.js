import Player from "./player.js";

describe("Game board - ship placement", () => {
  let player;

  beforeEach(() => {
    player = new Player("Name");
  });

  test("Invalid inputs", () => {
    expect(player.board.placeShip(1, 10, 10, "horizontal")).toBeNull();
    expect(player.board.placeShip(1, 1, 1, "wrong string")).toBeNull();
    expect(player.board.placeShip(-1, 0, 0, "horizontal")).toBeNull();
    expect(player.board.placeShip(6, 0, 0, "horizontal")).toBeNull();
    expect(player.board.placeShip(6, 0, 0, 0, "horizontal")).toBeNull();
    expect(player.board.placeShip(6)).toBeNull();
    expect(player.board.placeShip("a", 0, 0, "vertical")).toBeNull();
    expect(player.board.placeShip(1, "a", 0, "vertical")).toBeNull();
    expect(player.board.placeShip(1, 0, "a", "vertical")).toBeNull();
    expect(player.board.placeShip(1, 0, 0, 1)).toBeNull();
  });

  test("Horizontal placement", () => {
    expect(player.board.placeShip(2, 4, 5, "horizontal")).not.toBeNull();
    console.log(player.board.printBoard());
    expect(player.board.isOccupied(3, 5)).toBeFalsy();
    expect(player.board.isOccupied(4, 5)).toBeTruthy();
    expect(player.board.isOccupied(5, 5)).toBeTruthy();
    expect(player.board.isOccupied(6, 5)).toBeFalsy();

    expect(player.board.placeShip(4, 3, 9, "horizontal")).not.toBeNull();
  });

  test("Vertical placement", () => {
    expect(player.board.placeShip(3, 5, 2, "vertical")).not.toBeNull();
    console.log(player.board.printBoard());
    expect(player.board.isOccupied(5, 1)).toBeFalsy();
    expect(player.board.isOccupied(5, 2)).toBeTruthy();
    expect(player.board.isOccupied(5, 3)).toBeTruthy();
    expect(player.board.isOccupied(5, 4)).toBeTruthy();
    expect(player.board.isOccupied(5, 5)).toBeFalsy();
  });

  test("Going over the edge", () => {
    expect(player.board.placeShip(2, 9, 0, "horizontal")).toBeNull();
    expect(player.board.placeShip(3, 9, 0, "horizontal")).toBeNull();
    expect(player.board.placeShip(4, 9, 0, "horizontal")).toBeNull();

    expect(player.board.placeShip(3, 8, 0, "horizontal")).toBeNull();
    expect(player.board.placeShip(4, 8, 0, "horizontal")).toBeNull();

    expect(player.board.placeShip(4, 7, 0, "horizontal")).toBeNull();

    expect(player.board.placeShip(2, 0, 9, "vertical")).toBeNull();
    expect(player.board.placeShip(3, 0, 9, "vertical")).toBeNull();
    expect(player.board.placeShip(4, 0, 9, "vertical")).toBeNull();

    expect(player.board.placeShip(3, 0, 8, "vertical")).toBeNull();
    expect(player.board.placeShip(4, 0, 8, "vertical")).toBeNull();

    expect(player.board.placeShip(4, 0, 7, "vertical")).toBeNull();
  });

  test("Placing in occupied coordinates", () => {
    player.board.placeShip(1, 0, 0, "horizontal");
    expect(player.board.placeShip(1, 0, 0, "horizontal")).toBeNull();

    player.board.placeShip(4, 5, 1, "horizontal");

    expect(player.board.placeShip(4, 2, 1, "horizontal")).toBeNull();
    expect(player.board.placeShip(4, 3, 1, "horizontal")).toBeNull();
    expect(player.board.placeShip(4, 4, 1, "horizontal")).toBeNull();
    expect(player.board.placeShip(4, 5, 1, "horizontal")).toBeNull();
    expect(player.board.placeShip(4, 6, 1, "horizontal")).toBeNull();
    expect(player.board.placeShip(3, 7, 1, "horizontal")).toBeNull();
    expect(player.board.placeShip(2, 8, 1, "horizontal")).toBeNull();

    expect(player.board.placeShip(4, 1, 1, "horizontal")).not.toBeNull();
    expect(player.board.placeShip(1, 9, 1, "horizontal")).not.toBeNull();

    player.board.placeShip(4, 0, 5, "vertical");

    expect(player.board.placeShip(4, 0, 2, "vertical")).toBeNull();
    expect(player.board.placeShip(4, 0, 3, "vertical")).toBeNull();
    expect(player.board.placeShip(4, 0, 4, "vertical")).toBeNull();
    expect(player.board.placeShip(4, 0, 5, "vertical")).toBeNull();
    expect(player.board.placeShip(4, 0, 6, "vertical")).toBeNull();
    expect(player.board.placeShip(3, 0, 7, "vertical")).toBeNull();
    expect(player.board.placeShip(2, 0, 8, "vertical")).toBeNull();

    expect(player.board.placeShip(4, 0, 1, "vertical")).not.toBeNull();
    expect(player.board.placeShip(1, 0, 9, "vertical")).not.toBeNull();
  });

  test("Attacking", () => {
    expect(player.board.receiveAttack(0, 0)).toBeNull();

    player.board.placeShip(1, 1, 1, "horizontal");
    expect(player.board.receiveAttack(1, 1)).not.toBeNull();
    expect(player.board.receiveAttack(1, 1)).toBeNull();

    player.board.placeShip(4, 0, 2, "horizontal");
    expect(player.board.receiveAttack(0, 2)).not.toBeNull();
    expect(player.board.receiveAttack(1, 2)).not.toBeNull();
    expect(player.board.receiveAttack(2, 2)).not.toBeNull();
    expect(player.board.receiveAttack(3, 2)).not.toBeNull();
    expect(player.board.receiveAttack(0, 2)).toBeNull();
    expect(player.board.receiveAttack(1, 2)).toBeNull();
    expect(player.board.receiveAttack(2, 2)).toBeNull();
    expect(player.board.receiveAttack(3, 2)).toBeNull();
  });
});

describe("Delete ship", () => {
  let player;

  beforeEach(() => {
    player = new Player("Name");
  });

  test("Delete on unoccupied coordinates", () => {
    expect(player.board.deleteShip(0, 0)).toBeNull();
  });

  test("Delete a length 1 ship", () => {
    player.board.placeShip(1, 0, 0, "horizontal");
    expect(player.board.deleteShip(0, 0)).not.toBeNull();
    expect(player.board.isOccupied(0, 0)).toBeFalsy();
  });

  test("Delete a length 2 ship", () => {
    player.board.placeShip(2, 0, 0, "horizontal");
    expect(player.board.deleteShip(0, 0)).not.toBeNull();
    expect(player.board.isOccupied(0, 0)).toBeFalsy();
    expect(player.board.isOccupied(1, 0)).toBeFalsy();
  });

  test("Delete among other ships", () => {
    player.board.placeShip(4, 0, 0, "horizontal");
    player.board.placeShip(4, 0, 1, "horizontal");

    expect(player.board.deleteShip(0, 0)).not.toBeNull();

    expect(player.board.isOccupied(0, 0)).toBeFalsy();
    expect(player.board.isOccupied(1, 0)).toBeFalsy();
    expect(player.board.isOccupied(2, 0)).toBeFalsy();
    expect(player.board.isOccupied(3, 0)).toBeFalsy();

    expect(player.board.isOccupied(0, 1)).toBeTruthy();
    expect(player.board.isOccupied(1, 1)).toBeTruthy();
    expect(player.board.isOccupied(2, 1)).toBeTruthy();
    expect(player.board.isOccupied(3, 1)).toBeTruthy();
  });
});

describe("Get ships", () => {
  let player;

  beforeEach(() => {
    player = new Player("Name");
  });

  test("Get ships", () => {
    expect(player.board.placeShip(1, 0, 0, "horizontal")).not.toBeNull();
    expect(player.board.placeShip(4, 6, 9, "horizontal")).not.toBeNull();
    expect(player.board.placeShip(1, 0, 1, "horizontal")).not.toBeNull();
    expect(player.board.placeShip(1, 0, 2, "horizontal")).not.toBeNull();
    expect(player.board.placeShip(1, 0, 3, "horizontal")).not.toBeNull();
    expect(player.board.placeShip(1, 0, 4, "horizontal")).not.toBeNull();
    expect(player.board.placeShip(1, 0, 5, "horizontal")).not.toBeNull();

    expect(typeof player.board.getShips()).toBe("object");

    expect(player.board.getShips().length).toEqual(7);

    expect(
      player.board.getShips().find((ship) => ship.shipID === 1)
    ).not.toBeUndefined();
    expect(
      player.board.getShips().find((ship) => ship.shipID === 2)
    ).not.toBeUndefined();
    expect(
      player.board.getShips().find((ship) => ship.shipID === 3)
    ).not.toBeUndefined();
    expect(
      player.board.getShips().find((ship) => ship.shipID === 4)
    ).not.toBeUndefined();
    expect(
      player.board.getShips().find((ship) => ship.shipID === 5)
    ).not.toBeUndefined();
    expect(
      player.board.getShips().find((ship) => ship.shipID === 6)
    ).not.toBeUndefined();
    expect(
      player.board.getShips().find((ship) => ship.shipID === 7)
    ).not.toBeUndefined();
    expect(
      player.board.getShips().find((ship) => ship.shipID === 8)
    ).toBeUndefined();
  });
});
