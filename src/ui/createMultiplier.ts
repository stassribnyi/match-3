export type MultiplierElement = HTMLParagraphElement &
  Readonly<{
    show: (multiplier: number) => void;
  }>;

export const createMultiplier = (): MultiplierElement => {
  const el = document.createElement('p') as MultiplierElement;
  el.classList.add('multiplier');

  const show = (multiplier: number) => {
    el.innerText = `${multiplier}X`;
    el.animate([{ opacity: 1 }, { transform: 'scale(1.5)' }, { opacity: 0 }], {
      duration: 500,
      direction: 'normal',
      easing: 'ease-in-out',
      fill: 'forwards',
    });
  };

  return Object.assign(el, {
    show,
  });
};
