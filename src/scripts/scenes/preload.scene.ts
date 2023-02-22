import PianoKeyTexture from '@objects/piano/PianoKeyTexture';

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

    this.scene.start('config-scene');
  }
}
