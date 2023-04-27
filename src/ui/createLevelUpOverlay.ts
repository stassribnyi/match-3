export type LevelUpOverlayElement = HTMLParagraphElement &
  Readonly<{
    show: () => void;
  }>;

export const createLevelUpOverlay = (): LevelUpOverlayElement => {
  const el = document.createElement('p') as LevelUpOverlayElement;
  el.classList.add('level-up');

  const show = () => {
    el.innerText = `Level Up!`;
    el.animate([{ opacity: 1 }, { transform: 'scale(1.5)' }, { opacity: 0 }], {
      duration: 800,
      direction: 'normal',
      easing: 'ease-in-out',
      fill: 'forwards',
    });
  };

  return Object.assign(el, {
    show,
  });
};
