type GameAudio = 'pop' | 'swipe';
type AudioOptions = Partial<Pick<HTMLAudioElement, 'playbackRate' | 'volume'>>;

const GAME_AUDIO_URLS = new Map<GameAudio, URL>([
  ['pop', new URL('../../public/sounds/pop.m4a', import.meta.url)],
  ['swipe', new URL('../../public/sounds/swipe.m4a', import.meta.url)],
]);

export const loadAudio = (
  name: GameAudio,
  options: AudioOptions = {}
): HTMLAudioElement => {
  const audio = new Audio(GAME_AUDIO_URLS.get(name)?.toString());

  (Object.keys(options) as Array<keyof AudioOptions>).forEach((key) => {
    audio[key] = options[key] || audio[key];
  });

  return audio;
};
