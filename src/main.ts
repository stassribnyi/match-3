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

    setElementPosition(tileElement, tile.position);

    tile.subscribe('position', (position) => {
      setElementPosition(tileElement, position);
    });

    tileElement.addEventListener('click', () => {
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
        Board.swapTiles(currentTile.tile, tileElement.tile);
        board.sort();

        for (let index = 0; index < SIZE; index++) {
          const line = board.tiles.filter((tile) => tile.position.y === index);

          const clustersToResolve = Board.findClusters(line).filter(
            (cluster) => cluster.length >= 3 && cluster[0].icon
          );

          console.log(clustersToResolve);
        }
      }

      currentTile = null;
    });

    return tileElement;
  });

  field?.append(...tileElements);
}
