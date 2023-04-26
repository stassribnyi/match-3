import { Board, Timer } from 'src/models';

export type MenuElement = HTMLDivElement &
  Readonly<{
    destroy: () => void;
  }>;

// TODO: find better place to show timer
const secondsToTimeLeft = (time: number): string =>
  `Time: ${new Date(time * 1000).toISOString().substring(14, 19)}`;

export const createMenu = (board: Board, timer: Timer): MenuElement => {
  const container = document.createElement('div') as MenuElement;
  const el = document.createElement('ul');

  const pause = document.createElement('li');
  const restart = document.createElement('li');
  const time = document.createElement('li');
  const help = document.createElement('li');

  pause.innerText = 'Start';
  restart.innerText = 'Restart';
  time.innerText = secondsToTimeLeft(timer.time);
  help.innerText = 'Help';
  el.appendChild(pause);
  el.appendChild(restart);
  el.appendChild(time);
  el.appendChild(help);
  container.appendChild(el);

  container.classList.add('statistics', 'right');
  const handleIsRunningChange = (isRunning: boolean) => {
    pause.innerText = isRunning ? 'Pause' : 'Start';
  };
  const handleTimerChange = (value: number) => {
    time.innerText = secondsToTimeLeft(value);
  };

  timer.subscribe('isRunning', handleIsRunningChange);
  timer.subscribe('time', handleTimerChange);

  const handlePause = () => {
    if (timer.isRunning) {
      timer.stop();
      return;
    }
    timer.start();
  };

  const handleRestart = () => {
    board.generate();
    timer.stop();
    timer.reset();
  };

  pause.addEventListener('click', handlePause);
  restart.addEventListener('click', handleRestart);
  return Object.assign(container, {
    destroy: () => {
      pause.removeEventListener('click', handlePause);
      restart.removeEventListener('click', handleRestart);
      timer.unsubscribe('isRunning', handleIsRunningChange);
      timer.unsubscribe('time', handleTimerChange);
    },
  });
};
