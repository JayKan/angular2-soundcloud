export class AudioSource extends HTMLAudioElement {}

export function audioFactory() {
  return new Audio;
}

export const AUDIO_SOURCE_PROVIDER = {
  provide: AudioSource,
  // useFactory: () => new Audio()
  useFactory: audioFactory
};
