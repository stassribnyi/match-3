import { Board } from './board';
import { Tile } from './tile';
import { Timer } from './timer';
import {
  createBoard,
  createGameOverOverlay,
  createMultiplier,
  createScore,
  createTimer,
  TileElement,
  TileElementHandlers,
} from './ui';

import { delay, loadAudio, setCSSVar } from './utils';

const audioSprite = loadAudio();

const board = new Board(8);
const timer = new Timer(10);

const fieldContainer = document.querySelector('.field-container');
const statistics = document.getElementById('statistics');

const multiplierElement = createMultiplier();
const gameOverElement = createGameOverOverlay({
  onClick: () => {
    gameOverElement.hide();

    board.generate();
  },
});

setCSSVar('--field-height', `${board.size}em`);
setCSSVar('--field-width', `${board.size}em`);

const performTurn = async (tile1: Tile, tile2: Tile) => {
  let multiplier = 0;

  if (!Board.areSwappable(tile1, tile2)) {
    return;
  }

  board.swapTiles(tile1, tile2);
  await audioSprite.play('swap');

  board.findMatches();

  if (board.hasMatches()) {
    do {
      multiplier++;

      board.resolveMatches();
      board.shiftItems();
      board.calculateScore(multiplier);
      timer.add(5);

      multiplierElement.show(multiplier);

      await audioSprite.play('pop');

      board.fillUp();
      board.findMatches();

      await delay(400);
    } while (board.hasMatches());
  } else {
    // revert swap
    board.swapTiles(tile1, tile2);
    await audioSprite.play('swap');
  }

  // console.table(board.toMatrix());
};

let selectedTile: TileElement | null = null;
const handleTileClick: TileElementHandlers['onClick'] = async (event) => {
  const tileElement = event.target as TileElement;

  if (!selectedTile) {
    selectedTile = tileElement;
    tileElement.classList.add('active');
    timer.start();

    return;
  }

  selectedTile.classList.remove('active');

  if (selectedTile === tileElement) {
    selectedTile = null;

    return;
  }

  await performTurn(selectedTile.tile, tileElement.tile);

  selectedTile = null;
};

if (fieldContainer) {
  fieldContainer.appendChild(
    createBoard(board, { onTileSelect: handleTileClick })
  );

  fieldContainer.appendChild(multiplierElement);
  fieldContainer.appendChild(gameOverElement);
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

    gameOverElement.show();
  });
});

board.generate();

// expose board to window to perform debugging in browser
(window as any).board = board;
(window as any).timer = timer;
