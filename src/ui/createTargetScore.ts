import { Board } from 'src/models';

export type TargetScoreElement = HTMLLIElement &
  Readonly<{
    destroy: () => void;
  }>;

export const createTargetScore = (board: Board): TargetScoreElement => {
  const el = document.createElement('li') as TargetScoreElement;

  const handleTargetScoreChange = (target: number) => {
    el.innerText = `Target: ${target} pt`;
  };

  board.subscribe('targetScore', handleTargetScoreChange);

  return Object.assign(el, {
    destroy: () => {
      board.unsubscribe('targetScore', handleTargetScoreChange);
    },
  });
};
