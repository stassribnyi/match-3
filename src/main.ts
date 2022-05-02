import { Board } from './board';
import { Tile } from './tile';
import { Timer } from './timer';

import { delay } from './utils';

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

const field = document.getElementById('field');
const score = document.getElementById('score');
const time = document.getElementById('time');
const level = document.getElementById('level');

function setElementPosition(element: TileElement, position: Tile['position']) {
  element.style.top = `${position.y}em`;
  element.style.left = `${position.x}em`;
}

const board = new Board(SIZE);
const timer = new Timer(30);

let currentTile: TileElement | null = null;
const getTileClickHandler = (
  tileElement: TileElement
): (() => Promise<void>) => {
  return async () => {
    if (!currentTile) {
      currentTile = tileElement;
      tileElement.classList.add('active');
      timer.start();

      return;
    }

    currentTile.classList.remove('active');

    if (currentTile === tileElement) {
      currentTile = null;

      return;
    }

    // TODO: extract into separate function
    if (Board.areSwappable(currentTile.tile, tileElement.tile)) {
      board.swapTiles(currentTile.tile, tileElement.tile);
      await swap.play();

      if (board.hasMatches()) {
        do {
          await delay(400);

          board.resolveMatches();
          board.shiftItems();
          board.calculateScore();
          timer.add(5);

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

      timer.start();

      console.table(board.toMatrix());
    }

    currentTile = null;
  };
};

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

    tileElement.addEventListener('click', getTileClickHandler(tileElement));

    return tileElement;
  });

  field.replaceChildren(...tileElements);
});

board.subscribe('score', (value) => {
  if (!score) {
    return;
  }

  score.innerText = `${value}`;
});

timer.subscribe('time', (value) => {
  if (!time) {
    return;
  }

  if (value === 0) {
    timer.reset();
    board.generate();

    return;
  }

  time.innerText = `${new Date(value * 1000).toISOString().substring(14, 19)}`;
});

board.generate();

// expose board to window to perform debugging in browser
(window as any).board = board;
(window as any).timer = timer;
