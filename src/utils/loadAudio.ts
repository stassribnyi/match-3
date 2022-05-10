import { Howl } from 'howler';
import { delay } from './delay';

type Sprites = 'pop' | 'swap';
type HowlType = Omit<Howl, 'play'> & {
  play: (spriteOrId?: Sprites | number) => Promise<number>;
};

const FACTOR = 1500;

export const loadAudio = (): HowlType => {
  const sound = new Howl({
    src: [
      new URL('../../public/sounds/effects.mp3', import.meta.url).toString(),
    ],
    sprite: {
      pop: [0, 108],
      swap: [108, 386],
    },
  });

  sound.volume(0.5);

  const playHandler = sound.play;

  return Object.assign(sound, {
    play: async (spriteOrId?: number | Sprites): Promise<number> => {
      const id = playHandler.call(sound, spriteOrId);

      await delay(sound.duration(id) * FACTOR);

      return id;
    },
  });
};
