import { Board } from 'src/board';
import { Tile } from 'src/tile';

import { createTile, TileElement } from './createTile';

export type BoardElement = HTMLDivElement &
  Readonly<{
    destroy: () => void;
  }>;

export type FieldElementHandlers = Readonly<{
  onTileSelect: (this: HTMLDivElement, ev: MouseEvent) => void;
}>;

export const createBoard = (
  board: Board,
  { onTileSelect }: FieldElementHandlers
) => {
  const el = document.createElement('div') as BoardElement;
  el.classList.add('field');

  const destroyChildren = () =>
    Array.from<TileElement>(el.children as any).forEach((tile) =>
      tile.destroy()
    );

  const handleTilesChange = (tiles: Array<Tile>) => {
    destroyChildren();

    el.replaceChildren(
      ...tiles.map((tile) =>
        createTile(tile, {
          onClick: onTileSelect,
        })
      )
    );
  };

  board.subscribe('tiles', handleTilesChange);

  return Object.assign(el, {
    destroy: () => {
      board.unsubscribe('tiles', handleTilesChange);

      destroyChildren();
    },
  });
};
