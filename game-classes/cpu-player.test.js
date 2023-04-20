import CPUPlayer from "./cpu-player.js";

let cpu;
beforeAll(() => {
  cpu = new CPUPlayer();
});

test("CPU board validation", () => {
  for (let y = 0; y <= 9; y++)
    for (let x = 0; x <= 9; x++)
      expect(cpu.board.board[x][y]).toEqual({ ship: null, hit: false });
});

test("Ship placing", () => {
  expect(cpu.placeShip(1)).toEqual(cpu.board.getShips()[0]);
});
