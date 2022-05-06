import { Board } from './board';
import { Tile } from './tile';
import { Timer } from './timer';

import { delay, loadAudio } from './utils';

const audioSprite = loadAudio();

type TileElement = HTMLDivElement & {
  tile: Tile;
};

const SIZE = 8;

const field = document.getElementById('field');
const score = document.getElementById('score');
const time = document.getElementById('time');
const multiplierElement = document.getElementById('multiplier');

const effect = new KeyframeEffect(
  multiplierElement,
  [{ opacity: 1 }, { transform: 'scale(1.5)' }, { opacity: 0 }],
  {
    duration: 500,
    direction: 'normal',
    easing: 'ease-in-out',
    fill: 'forwards',
  }
);

const animation = new Animation(effect, document.timeline);

function setElementPosition(element: TileElement, position: Tile['position']) {
  element.style.top = `${position.y}em`;
  element.style.left = `${position.x}em`;
}

const board = new Board(SIZE);
const timer = new Timer(15);

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

    let multiplier = 0;

    // TODO: extract into separate function
    if (Board.areSwappable(currentTile.tile, tileElement.tile)) {
      board.swapTiles(currentTile.tile, tileElement.tile);
      await audioSprite.play('swap');

      if (board.hasMatches()) {
        do {
          multiplier++;

          board.resolveMatches();
          board.shiftItems();
          board.calculateScore(multiplier);
          timer.add(5);

          if (multiplierElement) {
            multiplierElement.innerText = `${multiplier}X`;
            animation.play();
          }

          await audioSprite.play('pop');

          board.fillUp();

          await delay(400);
        } while (board.hasMatches());
      } else {
        // revert swap

        board.swapTiles(currentTile.tile, tileElement.tile);
        await audioSprite.play('swap');
      }

      timer.start();

      // console.table(board.toMatrix());
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

  time.innerText = `${new Date(value * 1000).toISOString().substring(14, 19)}`;

  if (value === 0) {
    // wait before timer sets time value
    // TODO: show game over
    delay(1000).then(() => {
      timer.reset();
      board.generate();
    });

    return;
  }
});

board.generate();

// expose board to window to perform debugging in browser
(window as any).board = board;
(window as any).timer = timer;
(window as any).animation = animation;
