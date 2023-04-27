import { Board } from 'src/models';

export type ScoreElement = HTMLLIElement &
  Readonly<{
    destroy: () => void;
  }>;

export const createScore = (board: Board): ScoreElement => {
  const el = document.createElement('li') as ScoreElement;

  const handleScoreChange = (score: number) => {
    el.innerText = `Current: ${score} pt`;
  };

  board.subscribe('score', handleScoreChange);

  return Object.assign(el, {
    destroy: () => {
      board.unsubscribe('score', handleScoreChange);
    },
  });
};
