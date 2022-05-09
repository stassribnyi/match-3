import { Point } from './point';
import { Icon } from './Icon';
import { Tile } from './tile';
import { Model } from './model';

interface IBoard {
  readonly size: number;
  score: number;
  tiles: Array<Tile>;
}
export class Board extends Model<IBoard> implements IBoard {
  public score = 0;
  public tiles: Array<Tile> = [];
  private currentMatches: Array<Array<Tile>> = [];

  constructor(public readonly size: number = 8) {
    super();
  }

  generate(): void {
    this.tiles = [];
    this.currentMatches = [];
    this.score = 0;

    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        const position = new Point(x, y);

        this.tiles.push(new Tile(position, this.getIcon(position)));
      }
    }

    this.notify('tiles', this.tiles);
  }

  findByPosition(x: number, y: number): Tile | undefined {
    return this.tiles[x * this.size + y];
  }

  findXLine(x: number): Array<Tile> {
    const line: Array<Tile> = [];

    // using for loop helps to reduce unnecessary steps while searching required item
    for (let y = 0; y < this.size; y++) {
      const tile = this.findByPosition(x, y);
      if (!tile) {
        continue;
      }

      line.push(tile);
    }

    return line;
  }

  findYLine(y: number): Array<Tile> {
    const line: Array<Tile> = [];

    // using for loop helps to reduce unnecessary steps while searching required item
    for (let x = 0; x < this.size; x++) {
      const tile = this.findByPosition(x, y);
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
    this.currentMatches.flat().forEach((tile) => (tile.icon = null));
  }

  findMatches() {
    this.currentMatches = [];

    const matchCondition = (tiles: Array<Tile>) => tiles.length >= 3;

    for (let i = 0; i < this.size; i++) {
      this.currentMatches = [
        ...this.currentMatches,
        ...Board.findClusters(this.findXLine(i)).filter(matchCondition),
        ...Board.findClusters(this.findYLine(i)).filter(matchCondition),
      ];
    }
  }

  hasMatches(): boolean {
    return this.currentMatches.length > 0;
  }

  shiftItems() {
    for (let x = 0; x < this.size; x++) {
      const line = this.findXLine(x);

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

  calculateScore(multiplier: number) {
    this.tiles.forEach((tile) => {
      if (tile.icon) {
        return;
      }

      this.score += 100 * multiplier;
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
    let possibleIcons = [
      Icon.Beacon,
      Icon.Candy,
      Icon.Chocolate,
      Icon.Dice,
      Icon.Lollypop,
      Icon.Poop,
    ];

    // get top left and top elements in order to get icons we want to omit
    // this approach helps to ensure absents of existing matches on generation step
    const previousLeft = this.findByPosition(x, y - 1);
    const previousTop = this.findByPosition(x - 1, y);

    possibleIcons = possibleIcons.filter(
      (icon) => ![previousTop?.icon, previousLeft?.icon].includes(icon)
    );

    return possibleIcons[Math.floor(Math.random() * possibleIcons.length)];
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
