const SIZE = 8;

const MOCK_FIELD = [
  ['🥩', '🎲', '💩', '🎲', '🍭', '🥩', '🍫', '🎲'],
  ['🍭', '🍫', '💩', '🎲', '🍬', '🍬', '🍭', '🍬'],
  ['🍫', '💩', '🥩', '🥩', '🎲', '🎲', '🥩', '🍭'],
  ['🎲', '🍭', '🍫', '🍬', '🍫', '💩', '🍬', '💩'],
  ['🍬', '🎲', '🍭', '🍫', '🍭', '🥩', '🎲', '🍭'],
  ['🎲', '🍬', '🎲', '🥩', '🎲', '💩', '🍬', '💩'],
  ['💩', '🥩', '💩', '🎲', '🍫', '🍭', '🎲', '🍫'],
  ['🍬', '🍫', '🍬', '🍭', '🥩', '🍫', '🥩', '🍭'],
].flat();

const field = document.querySelector<HTMLDivElement>('.field');

if (field) {
  field.style.width = `${SIZE}em`;
  field.style.height = `${SIZE}em`;

  const tileElements = MOCK_FIELD.map((tile, idx) => {
    const tileElement = document.createElement('div');

    tileElement.innerText = tile;
    tileElement.classList.add('tile');

    const row = Math.floor(idx / SIZE);
    const col = idx - row * SIZE;

    tileElement.style.top = `${row}em`;
    tileElement.style.left = `${col}em`;

    return tileElement;
  });

  field?.append(...tileElements);
}
