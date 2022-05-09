import { Tile } from 'src/tile';
import { setElementPosition } from '../utils';

export type TileElement = Readonly<
  HTMLDivElement & {
    tile: Tile;
    destroy: () => void;
  }
>;

export type TileElementHandlers = Readonly<{
  onClick: (this: HTMLDivElement, ev: MouseEvent) => void;
}>;

export const createTile = (tile: Tile, { onClick }: TileElementHandlers) => {
  const el = document.createElement('div') as TileElement;

  el.classList.add('tile');

  const handleIconChange = (icon: Tile['icon']): void => {
    if (!tile.icon && !icon) {
      return;
    }

    if (tile.icon) {
      el.classList.remove(tile.icon);
    }

    if (icon) {
      el.classList.add(icon);
    }
  };

  const handlePositionChange = (position: Tile['position']): void => {
    setElementPosition(el, position);
  };

  handleIconChange(tile.icon);
  handlePositionChange(tile.position);

  tile.subscribe('icon', handleIconChange);
  tile.subscribe('position', handlePositionChange);

  el.addEventListener('click', onClick);

  return Object.assign(el, {
    tile,
    destroy: () => {
      tile.unsubscribe('icon', handleIconChange);
      tile.unsubscribe('position', handlePositionChange);

      el.removeEventListener('click', onClick);
    },
  });
};
