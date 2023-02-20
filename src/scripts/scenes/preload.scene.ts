export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preload-scene' });
  }

  create() {
    console.log('prout');
    this.scene.start('config-scene');
  }
}
