import PianoKeyTexture from '@objects/piano/PianoKeyTexture';
// @ts-ignore
import mehdi from '@assets/mehdi.jpeg';
export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preload-scene' });
  }

  preload() {
    new PianoKeyTexture({
      scene: this
    });
    this.load.image('mehdi', mehdi);
  }

  create() {
    this.add.text(0, 0, 'preload-scene', {
      color: '#000000'
    });
    this.scene.start('config-scene');
  }
}
