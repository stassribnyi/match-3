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

  sort(): void {
    this.tiles.sort((t1, t2) => this.findIndex(t1) - this.findIndex(t2));
  }

  findIndex(tile: Tile): number {
    if (!tile) {
      return -1;
    }

    return tile.position.x * this.size + tile.position.y;
  }

  static areSwappable(t1: Tile, t2: Tile): boolean {
    if (t1.icon === t2.icon) {
      return false;
    }

    if (!t1.icon || !t2.icon) {
      return false;
    }

    if (Point.areSiblings(t1.position, t2.position)) {
      return true;
    }

    return false;
  }

  static findClusters(tiles: Array<Tile>): Array<Array<Tile>> {
    const clusters: Array<Array<Tile>> = [];
    let cluster: Array<Tile> = [];

    for (let i = 0; i < tiles.length; i++) {
      const element = tiles[i];

      if (!cluster.length) {
        cluster.push(element);

        continue;
      }

      if (cluster[0].icon === element.icon) {
        cluster.push(element);

        continue;
      }

      clusters.push(cluster);
      cluster = [element];
    }

    clusters.push(cluster);

    return clusters;
  }

  static swapTiles(t1: Tile, t2: Tile) {
    const position = t1.position;
    t1.position = t2.position;
    t2.position = position;
  }
}
