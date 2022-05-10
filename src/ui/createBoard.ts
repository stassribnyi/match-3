import { Board, Tile } from 'src/models';

import { createTile, TileElement } from './createTile';

export type BoardElement = HTMLDivElement &
  Readonly<{
    destroy: () => void;
  }>;

export type BoardElementHandlers = Readonly<{
  onTileSelect: (this: HTMLDivElement, ev: MouseEvent) => void;
}>;

export const createBoard = (
  board: Board,
  { onTileSelect }: BoardElementHandlers
) => {
  const el = document.createElement('div') as BoardElement;
  el.classList.add('board');

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
