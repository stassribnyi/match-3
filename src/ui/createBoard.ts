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

// TODO: extract
export const createGrid = (board: Board) => {
  const el = document.createElement('div') as BoardElement;
  el.classList.add('grid');

  for (let x = 0; x < board.width; x++) {
    const row = document.createElement('div');
    for (let y = 0; y < board.height; y++) {
      row.appendChild(document.createElement('div'));
    }

    el.appendChild(row);
  }

  return el;
};
