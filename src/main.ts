import { Board, Tile, Timer } from './models';

import {
  createBoard,
  createGameOverOverlay,
  createGrid,
  createMultiplierOverlay,
  createScore,
  createTimer,
  TileElement,
  TileElementHandlers,
} from './ui';

import { delay, loadAudio, setCSSVar } from './utils';

const audioSprite = loadAudio();

const board = new Board(7, 8);
const timer = new Timer(30);

const container = document.getElementById('container');
const statistics = document.getElementById('statistics');

const multiplierOverlay = createMultiplierOverlay();
const gameOverOverlay = createGameOverOverlay({
  onClick: () => {
    gameOverOverlay.hide();

    board.generate();
  },
});

if (!container || !statistics) {
  document.body.innerText = 'Invalid markup, please refresh the page!';

  throw new Error('Invalid markup, please refresh the page!');
}

setCSSVar('--board-rows', `${board.height}`);
setCSSVar('--board-columns', `${board.width}`);

const performTurn = async (tile1: Tile, tile2: Tile) => {
  if (!Board.areSwappable(tile1, tile2)) {
    return;
  }

  board.swapTiles(tile1, tile2);
  await audioSprite.play('swap');

  board.findMatches();

  let multiplier = 0;

  if (board.hasMatches()) {
    do {
      multiplier++;

      board.resolveMatches();
      board.shiftItems();
      board.calculateScore(multiplier);
      timer.add(5);

      multiplierOverlay.show(multiplier);

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

  // display board state inbetween turns
  console.table(board.toMatrix());
};

let selectedTile: TileElement | null = null;
const handleTileClick: TileElementHandlers['onClick'] = async (event) => {
  const tileElement = event.target as TileElement;

  if (!Board.canBeSelected(tileElement.tile)) {
    return;
  }

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

// create board elements
container.appendChild(createBoard(board, { onTileSelect: handleTileClick }));
container.appendChild(createGrid(board))

// TODO: draw field
container.appendChild(multiplierOverlay);
container.appendChild(gameOverOverlay);

// create statistics
const ul = document.createElement('ul');
ul.appendChild(createScore(board));
ul.appendChild(createTimer(timer));
statistics.appendChild(ul);

timer.subscribe('time', (value) => {
  if (value !== 0) {
    return;
  }

  // wait before timer sets time value
  delay(1000).then(() => {
    timer.reset();

    gameOverOverlay.show();
  });
});

// TODO: loader
container.style.opacity = '0';
ul.style.opacity = '0';

board.generate();
console.table(board.toMatrix());

setTimeout(() => {
  const loader = document.getElementById('splash');

  if (!loader) {
    return;
  }

  loader.style.opacity = '0';

  container.style.opacity = "1";
  ul.style.opacity = '1';

  setTimeout(() => {
    loader.style.display = 'none';

  }, 1000);
}, 4000);

// expose board to window to perform debugging in browser
(window as any).board = board;
(window as any).timer = timer;
