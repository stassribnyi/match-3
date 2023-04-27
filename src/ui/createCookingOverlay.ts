export type CookingOverlayElement = HTMLParagraphElement &
  Readonly<{
    show: () => void;
  }>;

export const createCookingOverlay = (): CookingOverlayElement => {
  const el = document.createElement('p') as CookingOverlayElement;
  el.classList.add('cooking');

  const show = () => {
    el.innerText = `Throw ingredients into the cauldron. . .`;
    el.animate(
      [
        { opacity: 0 },
        { opacity: 0.5 },
        { opacity: 1 },
        { opacity: 1 },
        { opacity: 0.5 },
        { opacity: 0 },
      ],
      {
        duration: 1800,
        direction: 'normal',
        easing: 'ease-in-out',
        fill: 'forwards',
      }
    );
  };

  return Object.assign(el, {
    show,
  });
};
