import { Timer } from 'src/timer';

export type TimerElement = HTMLLIElement &
  Readonly<{
    destroy: () => void;
  }>;

const secondsToTimeLeft = (time: number): string =>
  `Time left: ${new Date(time * 1000).toISOString().substring(14, 19)}`;

export const createTimer = (timer: Timer): TimerElement => {
  const el = document.createElement('li') as TimerElement;
  el.innerText = secondsToTimeLeft(timer.time);

  const handleTimeChange = (time: number) => {
    el.innerText = secondsToTimeLeft(time);
  };

  timer.subscribe('time', handleTimeChange);

  return Object.assign(el, {
    destroy: () => {
      timer.unsubscribe('time', handleTimeChange);
    },
  });
};
