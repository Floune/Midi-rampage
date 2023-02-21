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
    this.scene.start('config-scene');
  }
}
