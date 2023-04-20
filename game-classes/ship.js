export default class Ship {
  constructor(_length, _shipID) {
    this.length = _length;
    this.shipID = _shipID; // Used to identify the ship in the game-board
    this.hitsTaken = 0;
    this.sunk = false;
  }

  hit() {
    // Records a hit and verify if the ship should be sunk
    if (this.isSunk()) return null;
    this.hitsTaken++;
    if (this.hitsTaken === this.length) this.sunk = true;
  }

  getID() {
    return this.shipID;
  }

  isSunk() {
    return this.sunk;
  }
}
