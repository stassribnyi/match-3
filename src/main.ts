import { Board } from './board';
import { Tile } from './tile';

type TileElement = HTMLDivElement & {
  tile: Tile;
};

const SIZE = 8;

const field = document.querySelector<HTMLDivElement>('.field');

function swapTiles(tile1: HTMLDivElement, tile2: HTMLDivElement) {
  const currentPosition = { left: tile1.style.left, top: tile1.style.top };

  tile1.style.top = tile2.style.top;
  tile1.style.left = tile2.style.left;

  tile2.style.top = currentPosition.top;
  tile2.style.left = currentPosition.left;
}

if (field) {
  field.style.width = `${SIZE}em`;
  field.style.height = `${SIZE}em`;

  let currentTile: TileElement | null = null;
  const board = new Board();
  board.generate();

  const tileElements = board.tiles.map((tile) => {
    const tileElement = document.createElement('div') as TileElement;

    tileElement.tile = tile;
    tileElement.classList.add('tile', tile.icon);

    tileElement.style.top = `${tile.position.y}em`;
    tileElement.style.left = `${tile.position.x}em`;

    tileElement.addEventListener('click', () => {
      if (!currentTile) {
        currentTile = tileElement;
        tileElement.classList.add('active');

        return;
      }

      currentTile.classList.remove('active');

      if (
        currentTile !== tileElement &&
        board.canBeSwapped(currentTile.tile, tileElement.tile)
      ) {
        swapTiles(currentTile, tileElement);
      }

      currentTile = null;
    });

    return tileElement;
  });

  field?.append(...tileElements);
}
