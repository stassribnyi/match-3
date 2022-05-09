export type MultiplierElement = HTMLParagraphElement &
  Readonly<{
    animation: Animation;
  }>;

export const createMultiplier = (): MultiplierElement => {
  const el = document.createElement('p') as MultiplierElement;
  el.classList.add('multiplier');

  let animation: Animation;

  Object.defineProperty(el, 'animation', {
    get() {
      if (animation) {
        return animation;
      }

      animation = new Animation(
        new KeyframeEffect(
          el,
          [{ opacity: 1 }, { transform: 'scale(1.5)' }, { opacity: 0 }],
          {
            duration: 500,
            direction: 'normal',
            easing: 'ease-in-out',
            fill: 'forwards',
          }
        ),
        document.timeline
      );

      return animation;
    },
  });

  return el;
};
