import { Board, Timer } from 'src/models';
import { createScore } from './createScore';
import { createTargetScore } from './createTargetScore';

export type GoalsElement = HTMLDivElement &
  Readonly<{
    destroy: () => void;
  }>;

// TODO: find better place to show timer
const secondsToTimeLeft = (time: number): string =>
  `Time: ${new Date(time * 1000).toISOString().substring(14, 19)}`;

export const createGoals = (board: Board, timer: Timer): GoalsElement => {
  const container = document.createElement('div') as GoalsElement;
  const el = document.createElement('ul');
  const pause = document.createElement('li');
  const restart = document.createElement('li');
  const time = document.createElement('li');
  const help = document.createElement('li');
  el.appendChild(createTargetScore(board));
  el.appendChild(createScore(board));

  time.innerText = secondsToTimeLeft(timer.time);
  el.appendChild(time);
  container.appendChild(el);
  container.classList.add('statistics', 'left');
  const handleTimerChange = (value: number) => {
    time.innerText = secondsToTimeLeft(value);
  };

  timer.subscribe('time', handleTimerChange);

  return Object.assign(container, {
    destroy: () => {
      timer.unsubscribe('time', handleTimerChange);
    },
  });
};
