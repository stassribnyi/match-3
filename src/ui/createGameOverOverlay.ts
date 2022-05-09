export type GameOverOverlayElement = HTMLParagraphElement &
  Readonly<{
    show: () => void;
    hide: () => void;
  }>;

export type GameOverOverlayElementHandlers = Readonly<{
  onClick: (this: HTMLParagraphElement, ev: MouseEvent) => void;
}>;

export const createGameOverOverlay = ({
  onClick,
}: GameOverOverlayElementHandlers): GameOverOverlayElement => {
  const el = document.createElement('p') as GameOverOverlayElement;
  el.classList.add('game-over');
  el.innerText = 'Game Over!';

  const show = () => {
    el.style.opacity = '1';
    el.style.pointerEvents = 'all';
  };
  const hide = () => {
    el.style.opacity = '';
    el.style.pointerEvents = '';
  };

  el.addEventListener('click', onClick);

  return Object.assign(el, {
    show,
    hide,
    destroy: () => {
      el.removeEventListener('click', onClick);
    },
  });
};
