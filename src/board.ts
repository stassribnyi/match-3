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

  findByPosition(x: number, y: number): Tile | undefined {
    return this.tiles[x * this.size + y];
  }

  findVerticalLine(index: number): Array<Tile> {
    const line: Array<Tile> = [];

    // using for loop helps to reduce unnecessary steps while searching required item
    for (let x = 0; x < this.size; x++) {
      const tile = this.findByPosition(x, index);
      if (!tile) {
        continue;
      }

      line.push(tile);
    }

    return line;
  }

  findHorizontalLine(index: number): Array<Tile> {
    const line: Array<Tile> = [];

    // using for loop helps to reduce unnecessary steps while searching required item
    for (let x = 0; x < this.size; x++) {
      const tile = this.findByPosition(index, x);
      if (!tile) {
        continue;
      }

      line.push(tile);
    }

    return line;
  }

  swapTiles(t1: Tile, t2: Tile): void {
    const idxT1 = this.tiles.indexOf(t1);
    const idxT2 = this.tiles.indexOf(t2);

    if (idxT1 < 0 || idxT2 < 0) {
      return;
    }

    const position = t1.position;
    t1.position = t2.position;
    t2.position = position;

    this.tiles[idxT1] = t2;
    this.tiles[idxT2] = t1;
  }

  resolveMatches(): void {
    for (let i = 0; i < this.size; i++) {
      [
        ...Board.findClusters(this.findVerticalLine(i)),
        ...Board.findClusters(this.findHorizontalLine(i)),
      ]
        .filter((tile) => tile.length >= 3)
        .flat()
        .forEach((tile) => (tile.icon = null));
    }
  }

  hasMatches(): boolean {
    for (let i = 0; i < this.size; i++) {
      const hasMatches =
        [
          ...Board.findClusters(this.findVerticalLine(i)),
          ...Board.findClusters(this.findHorizontalLine(i)),
        ].filter((tile) => tile.length >= 3).length > 0;

      if (hasMatches) {
        return true;
      }
    }

    return false;
  }

  shiftItems() {
    for (let x = 0; x < this.size; x++) {
      const line = this.findVerticalLine(x);

      for (let i = line.length - 1; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
          const current = line[i];
          const next = line[j];

          if (!current.icon && !next.icon) {
            continue;
          }

          if (!current.icon && next.icon) {
            this.swapTiles(current, next);
            line[i] = next;
            line[j] = current;
          }
        }
      }
    }

    // move all empty tiles out of boundaries
    this.tiles.forEach((tile) => {
      if (tile.icon) {
        return;
      }

      tile.position = new Point(tile.position.x, tile.position.y - this.size);
    });
  }

  fillUp() {
    this.tiles.forEach((tile) => {
      if (tile.icon) {
        return;
      }

      const position = new Point(tile.position.x, tile.position.y + this.size);

      tile.position = position;
      tile.icon = this.getIcon(position);
    });
  }

  getIcon({ x, y }: Point): Icon {
    let possibleTypes = [
      Icon.Beacon,
      Icon.Candy,
      Icon.Chocolate,
      Icon.Dice,
      Icon.Lollypop,
      Icon.Poop,
    ];

    // get top left and top elements in order to get icons we dont want to omit
    // this approach helps to ensure absents of existing matches on generation step
    const previousLeft = this.findByPosition(x, y - 1);
    const previousTop = this.findByPosition(x - 1, y);

    possibleTypes = possibleTypes.filter(
      (icon) => ![previousTop?.icon, previousLeft?.icon].includes(icon)
    );

    return possibleTypes[Math.floor(Math.random() * possibleTypes.length)];
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

  /**
   * Convert array to matrix, for debugging purposes
   * @returns Matrix with icons
   */
  toMatrix(): Array<Array<Tile['icon'] | undefined>> {
    const matrix = [];

    for (let y = 0; y < this.size; y++) {
      const row = [];
      for (let x = 0; x < this.size; x++) {
        row.push(this.findByPosition(x, y)?.icon);
      }

      matrix.push(row);
    }

    return matrix;
  }
}
