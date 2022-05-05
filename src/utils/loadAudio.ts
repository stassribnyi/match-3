type GameAudio = 'pop' | 'swap';
type AudioOptions = Partial<Pick<HTMLAudioElement, 'playbackRate' | 'volume'>>;

const GAME_AUDIO_URLS = new Map<GameAudio, URL>([
  ['pop', new URL('../../public/sounds/pop.mp3', import.meta.url)],
  ['swap', new URL('../../public/sounds/swap.mp3', import.meta.url)],
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
