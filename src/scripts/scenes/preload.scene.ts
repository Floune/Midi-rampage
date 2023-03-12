import PianoKeyTexture from '@objects/piano/PianoKeyTexture';
import MidiInputEngine from '../../utils/MidiInputEngine';
import AudioDriver from '../plugins/audio-driver/AudioDriver.ts';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preload-scene' });
  }

  preload() {
    new PianoKeyTexture({
      scene: this.scene.scene
    });
  }

  create() {
    this.add.text(0, 0, 'preload-scene', {
      color: '#000000'
    });

    const midi = new MidiInputEngine();
    const audio = new AudioDriver();
    window.midiInputEngine = midi;
    window.audioDriver = audio;

    midi.start(() => {
      this.scene.start('config-scene');
    });
  }
}
