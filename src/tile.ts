import { Icon } from './icon';
import { Model } from './model';
import { Point } from './point';

interface ITile {
  position: Point;
  icon: Icon | null;
}

export class Tile extends Model<ITile> implements ITile {
  constructor(public position: Point, public icon: Icon | null) {
    super();
  }
}
