import { Board } from 'src/models';

export type LevelElement = HTMLLIElement &
  Readonly<{
    destroy: () => void;
  }>;

export const createLevel = (board: Board): LevelElement => {
  const el = document.createElement('li') as LevelElement;

  const handleLevelChange = (level: number) => {
    el.innerText = `Level:\n${level}`;
  };

  board.subscribe('level', handleLevelChange);

  return Object.assign(el, {
    destroy: () => {
      board.unsubscribe('level', handleLevelChange);
    },
  });
};
