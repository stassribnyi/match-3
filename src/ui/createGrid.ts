export const createGrid = (width: number, height: number) => {
  const grid = document.createElement('div');
  grid.classList.add('grid');

  for (let x = 0; x < width; x++) {
    const row = document.createElement('div');
    row.classList.add('row');

    for (let y = 0; y < height; y++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      row.appendChild(cell);
    }

    grid.appendChild(row);
  }

  return grid;
};
