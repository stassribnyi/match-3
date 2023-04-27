import { Board, Tile, Timer } from './models';

import {
  createBoard,
  createGameOverOverlay,
  createGrid,
  createLevel,
  createLevelUpOverlay,
  createMultiplierOverlay,
  createScore,
  createTargetScore,
  createTimer,
  TileElement,
  TileElementHandlers,
} from './ui';
import { createCookingOverlay } from './ui/createCookingOverlay';
import { createGoals } from './ui/createGoals';
import { createMenu } from './ui/createMenu';
import { createTotalScore } from './ui/createTotalScore';

import { delay, loadAudio, setCSSVar } from './utils';

// TODO:
// - level
// - score
// - timer
// - get some currency for extra figures
// - refresh withdraw with scores
// - extra figures tracking:
// - square
// - cross

// Ideas:
// Game should have level based progression,
// each level should have time limit
// time limit should depend on level
// each level should have different goals, for simplicity we can use score target
// score target should depend on level
// there should be some goals based on tiles combinations
// there should be hint with possible combinations and scores

function main() {
  const audioSprite = loadAudio();

  const board = new Board(7, 8);
  const timer = new Timer(30);

  const content = document.createElement('div');
  const container = document.createElement('div');
  const statistics = document.createElement('div');
  content.classList.add('content');
  container.classList.add('container');
  statistics.classList.add('statistics');

  content.appendChild(statistics);
  content.appendChild(container);
  document.body.appendChild(content);

  const cookingOverlay = createCookingOverlay();
  const multiplierOverlay = createMultiplierOverlay();
  const levelUpOverlay = createLevelUpOverlay();
  const gameOverOverlay = createGameOverOverlay({
    onClick: () => {
      gameOverOverlay.hide();

      board.generate();
    },
  });

  (window as any).cookingOverlay = cookingOverlay;
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

        if (board.score >= board.targetScore) {
          board.level += 1;
          timer.reset();
          timer.stop();
          levelUpOverlay.show();
          // TODO: play level up sound
          await delay(400);
          cookingOverlay.show();
          await delay(900);
          board.generate(true);
          await delay(900);
          continue;
        } else {
          timer.add(5);
          multiplierOverlay.show(multiplier);
          await audioSprite.play('pop');
        }

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
  container.appendChild(createGrid(board.width, board.height));

  // TODO: draw field
  container.appendChild(cookingOverlay);
  container.appendChild(multiplierOverlay);
  container.appendChild(levelUpOverlay);
  container.appendChild(gameOverOverlay);

  // TODO: reuse statistic item creation logic
  // create statistics
  const ul = document.createElement('ul');
  ul.appendChild(createTotalScore(board));
  ul.appendChild(createLevel(board));
  // ul.appendChild(createTimer(timer));

  content.appendChild(createMenu(board, timer));
  content.appendChild(createGoals(board, timer));
  //  const help = document.createElement("button");
  //  help.textContent = "?";
  //
  //  help.addEventListener("click", ()=> {
  //    alert('help')
  //  })
  //
  //  const buttonLi = document.createElement('li');
  //  buttonLi.appendChild(help);
  //  ul.appendChild(buttonLi)
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
  // container.style.opacity = '0';
  // ul.style.opacity = '0';

  board.subscribe('level', (level) => {
    board.calculateTargetScore(level);
  });
  board.generate();
  console.table(board.toMatrix());

  container.style.opacity = '1';
  ul.style.opacity = '1';

  // expose board to window to perform debugging in browser
  (window as any).board = board;
  (window as any).timer = timer;
}

setTimeout(() => {
  const loader = document.getElementById('splash');

  if (!loader) {
    return;
  }

  loader.style.opacity = '0';

  main();

  setTimeout(() => {
    loader.style.display = 'none';
  }, 1000);
}, 200);
