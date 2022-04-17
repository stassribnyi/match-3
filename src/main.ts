const SIZE = 8;

enum TileType {
  Beacon = 'beacon',
  Candy = 'candy',
  Chocolate = 'chocolate',
  Dice = 'dice',
  Lollypop = 'lollypop',
  Poop = 'poop',
}

const MOCK_FIELD = [
  [
    TileType.Beacon,
    TileType.Dice,
    TileType.Poop,
    TileType.Dice,
    TileType.Lollypop,
    TileType.Beacon,
    TileType.Chocolate,
    TileType.Dice,
  ],
  [
    TileType.Lollypop,
    TileType.Chocolate,
    TileType.Poop,
    TileType.Dice,
    TileType.Candy,
    TileType.Candy,
    TileType.Lollypop,
    TileType.Candy,
  ],
  [
    TileType.Chocolate,
    TileType.Poop,
    TileType.Beacon,
    TileType.Beacon,
    TileType.Dice,
    TileType.Dice,
    TileType.Beacon,
    TileType.Lollypop,
  ],
  [
    TileType.Dice,
    TileType.Lollypop,
    TileType.Chocolate,
    TileType.Candy,
    TileType.Chocolate,
    TileType.Poop,
    TileType.Candy,
    TileType.Poop,
  ],
  [
    TileType.Candy,
    TileType.Dice,
    TileType.Lollypop,
    TileType.Chocolate,
    TileType.Lollypop,
    TileType.Beacon,
    TileType.Dice,
    TileType.Lollypop,
  ],
  [
    TileType.Dice,
    TileType.Candy,
    TileType.Dice,
    TileType.Beacon,
    TileType.Dice,
    TileType.Poop,
    TileType.Candy,
    TileType.Poop,
  ],
  [
    TileType.Poop,
    TileType.Beacon,
    TileType.Poop,
    TileType.Dice,
    TileType.Chocolate,
    TileType.Lollypop,
    TileType.Dice,
    TileType.Chocolate,
  ],
  [
    TileType.Candy,
    TileType.Chocolate,
    TileType.Candy,
    TileType.Lollypop,
    TileType.Beacon,
    TileType.Chocolate,
    TileType.Beacon,
    TileType.Lollypop,
  ],
].flat();

const field = document.querySelector<HTMLDivElement>('.field');

if (field) {
  field.style.width = `${SIZE}em`;
  field.style.height = `${SIZE}em`;

  const tileElements = MOCK_FIELD.map((tile, idx) => {
    const tileElement = document.createElement('div');

    tileElement.classList.add('tile', tile);

    const row = Math.floor(idx / SIZE);
    const col = idx - row * SIZE;

    tileElement.style.top = `${row}em`;
    tileElement.style.left = `${col}em`;

    tileElement.setAttribute('draggable', 'true');

    return tileElement;
  });

  field?.append(...tileElements);
}
