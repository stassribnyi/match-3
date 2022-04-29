import { Board } from './board';
import { Tile } from './tile';

import destroyUrl from 'url:../public/sounds/pop.m4a';
import swapUrl from 'url:../public/sounds/swipe.m4a';

const destroy = new Audio(destroyUrl);
const swap = new Audio(swapUrl);

// destroy.playbackRate = 1.5;
// swap.playbackRate = 1.5;
destroy.volume = 0.07;
swap.volume = 0.07;

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
  const board = new Board(SIZE);
  board.generate();

  // expose board to window to perform debugging in browser
  (window as any).board = board;

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
        await swap.play();

        console.table(board.toMatrix());

        if (board.hasMatches()) {
          do {
            await delay(400);

            board.resolveMatches();
            board.shiftItems();

            await destroy.play();
            await delay(400);

            board.fillUp();
          } while (board.hasMatches());
        } else {
          // revert swap
          await delay(400);
          await swap.play();

          board.swapTiles(currentTile.tile, tileElement.tile);
        }
      }

      currentTile = null;
    });

    return tileElement;
  });

  field?.append(...tileElements);
}
