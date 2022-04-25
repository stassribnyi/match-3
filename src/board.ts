import { Point } from './point';
import { Icon } from './Icon';
import { Tile } from './tile';

const MOCK_FIELD = [
  [
    Icon.Beacon,
    Icon.Dice,
    Icon.Poop,
    Icon.Dice,
    Icon.Lollypop,
    Icon.Beacon,
    Icon.Chocolate,
    Icon.Dice,
  ],
  [
    Icon.Lollypop,
    Icon.Chocolate,
    Icon.Poop,
    Icon.Dice,
    Icon.Candy,
    Icon.Candy,
    Icon.Lollypop,
    Icon.Candy,
  ],
  [
    Icon.Chocolate,
    Icon.Poop,
    Icon.Beacon,
    Icon.Beacon,
    Icon.Dice,
    Icon.Dice,
    Icon.Beacon,
    Icon.Lollypop,
  ],
  [
    Icon.Dice,
    Icon.Lollypop,
    Icon.Chocolate,
    Icon.Candy,
    Icon.Chocolate,
    Icon.Poop,
    Icon.Candy,
    Icon.Poop,
  ],
  [
    Icon.Candy,
    Icon.Dice,
    Icon.Lollypop,
    Icon.Chocolate,
    Icon.Lollypop,
    Icon.Beacon,
    Icon.Dice,
    Icon.Lollypop,
  ],
  [
    Icon.Dice,
    Icon.Candy,
    Icon.Dice,
    Icon.Beacon,
    Icon.Dice,
    Icon.Poop,
    Icon.Candy,
    Icon.Poop,
  ],
  [
    Icon.Poop,
    Icon.Beacon,
    Icon.Poop,
    Icon.Dice,
    Icon.Chocolate,
    Icon.Lollypop,
    Icon.Dice,
    Icon.Chocolate,
  ],
  [
    Icon.Candy,
    Icon.Chocolate,
    Icon.Candy,
    Icon.Lollypop,
    Icon.Beacon,
    Icon.Chocolate,
    Icon.Beacon,
    Icon.Lollypop,
  ],
].flat();

export class Board {
  public tiles: Array<Tile> = [];

  constructor(public size: number = 8) {}

  generate(): void {
    this.tiles = MOCK_FIELD.map((icon, idx) => {
      const row = Math.floor(idx / this.size);
      const col = idx - row * this.size;

      return new Tile(new Point(col, row), icon);
    });
  }

  static areSwappable(tile1: Tile, tile2: Tile): boolean {
    if (tile1.icon === tile2.icon) {
      return false;
    }

    if (!tile1.icon || !tile2.icon) {
      return false;
    }

    if (Point.areSiblings(tile1.position, tile2.position)) {
      return true;
    }

    return false;
  }

  static swapTiles(tile1: Tile, tile2: Tile) {
    const position = tile1.position;
    tile1.position = tile2.position;
    tile2.position = position;
  }
}
