import { delay } from './delay';

export const playAudio = async (audio: HTMLAudioElement): Promise<void> => {
  await audio.play();
  await delay(audio.duration * 2000);
};
