import { Board } from './board';
import { Tile } from './tile';

type TileElement = HTMLDivElement & {
  tile: Tile;
};

const SIZE = 8;

const field = document.querySelector<HTMLDivElement>('.field');

function setElementPosition(element: TileElement, position: Tile['position']) {
  element.style.top = `${position.y}em`;
  element.style.left = `${position.x}em`;
}

const delay = (timeout: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

if (field) {
  field.style.width = `${SIZE}em`;
  field.style.height = `${SIZE}em`;

  let currentTile: TileElement | null = null;
  const board = new Board();
  board.generate();

  const tileElements = board.tiles.map((tile) => {
    const tileElement = document.createElement('div') as TileElement;

    tileElement.tile = tile;
    tileElement.classList.add('tile', tile.icon || '');

    setElementPosition(tileElement, tile.position);

    tile.subscribe('position', (position) => {
      setElementPosition(tileElement, position);
    });

    tile.subscribe('icon', (icon) => {
      if (!tile.icon && !icon) {
        return;
      }

      if (tile.icon) {
        tileElement.classList.remove(tile.icon);
      }

      if (icon) {
        tileElement.classList.add(icon);
      }
    });

    tileElement.addEventListener('click', async () => {
      if (!currentTile) {
        currentTile = tileElement;
        tileElement.classList.add('active');

        return;
      }

      currentTile.classList.remove('active');

      if (currentTile === tileElement) {
        currentTile = null;

        return;
      }

      if (Board.areSwappable(currentTile.tile, tileElement.tile)) {
        board.swapTiles(currentTile.tile, tileElement.tile);

        console.table(board.toMatrix());

        if (board.hasMatches()) {
          board.resolveMatches();
          board.shiftItems();
          await delay(500);
          board.fillUp();
        }
      }

      currentTile = null;
    });

    return tileElement;
  });

  field?.append(...tileElements);
}
