import { Board } from './board';
import { Tile } from './tile';

import { delay } from './utils/delay';

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
const score = document.getElementById('score');

function setElementPosition(element: TileElement, position: Tile['position']) {
  element.style.top = `${position.y}em`;
  element.style.left = `${position.x}em`;
}

if (field) {
  let currentTile: TileElement | null = null;
  const board = new Board(SIZE);

  // expose board to window to perform debugging in browser
  (window as any).board = board;

  board.subscribe('tiles', (tiles) => {
    if (!field) {
      return;
    }

    field.style.width = `${board.size}em`;
    field.style.height = `${board.size}em`;

    const tileElements = tiles.map((tile) => {
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
              board.calculateScore();

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

    field.append(...tileElements);
  });

  board.subscribe('score', (value) => {
    if (!score) {
      return;
    }

    score.innerText = `${value}`;
  });

  board.generate();
}
