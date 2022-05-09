import { Board } from './board';
import { Timer } from './timer';
import {
  createBoard,
  createScore,
  createTimer,
  TileElement,
  TileElementHandlers,
} from './ui';

import { delay, loadAudio } from './utils';

const audioSprite = loadAudio();

const SIZE = 8;

const fieldContainer = document.querySelector('.field-container');
const statistics = document.getElementById('statistics');

const multiplierElement = document.getElementById('multiplier');
const gameOverElement = document.getElementById('game-over');

const multiplierAnimation = new Animation(
  new KeyframeEffect(
    multiplierElement,
    [{ opacity: 1 }, { transform: 'scale(1.5)' }, { opacity: 0 }],
    {
      duration: 500,
      direction: 'normal',
      easing: 'ease-in-out',
      fill: 'forwards',
    }
  ),
  document.timeline
);

const board = new Board(SIZE);
const timer = new Timer(10);

document.documentElement.style.setProperty('--field-height', `${board.size}em`);
document.documentElement.style.setProperty('--field-width', `${board.size}em`);

let currentTile: TileElement | null = null;
const handleTileClick: TileElementHandlers['onClick'] = async (event) => {
  const tileElement = event.target as TileElement;

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

    board.findMatches();

    if (board.hasMatches()) {
      do {
        multiplier++;

        board.resolveMatches();
        board.shiftItems();
        board.calculateScore(multiplier);
        timer.add(5);

        if (multiplierElement) {
          multiplierElement.innerText = `${multiplier}X`;
          multiplierAnimation.play();
        }

        await audioSprite.play('pop');

        board.fillUp();
        board.findMatches();

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

if (fieldContainer) {
  fieldContainer.appendChild(
    createBoard(board, { onTileSelect: handleTileClick })
  );
}

if (statistics) {
  const ul = document.createElement('ul');
  ul.appendChild(createScore(board));
  ul.appendChild(createTimer(timer));

  statistics.appendChild(ul);
}

timer.subscribe('time', (value) => {
  if (value !== 0) {
    return;
  }

  // wait before timer sets time value
  delay(1000).then(() => {
    timer.reset();

    if (gameOverElement) {
      gameOverElement.style.opacity = '1';
      gameOverElement.style.pointerEvents = 'all';
    }
  });
});

gameOverElement?.addEventListener('click', () => {
  gameOverElement.style.pointerEvents = '';
  gameOverElement.style.opacity = '';

  board.generate();
});

board.generate();

// expose board to window to perform debugging in browser
(window as any).board = board;
(window as any).timer = timer;
(window as any).animation = multiplierAnimation;
