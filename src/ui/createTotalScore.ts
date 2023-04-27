import { Board } from 'src/models';

export type TotalScoreElement = HTMLLIElement &
  Readonly<{
    destroy: () => void;
  }>;

export const createTotalScore = (board: Board): TotalScoreElement => {
  const el = document.createElement('li') as TotalScoreElement;

  const handleTotalScoreChange = (target: number) => {
    el.innerText = `Total: ${target} pt`;
  };

  board.subscribe('totalScore', handleTotalScoreChange);

  return Object.assign(el, {
    destroy: () => {
      board.unsubscribe('targetScore', handleTotalScoreChange);
    },
  });
};
