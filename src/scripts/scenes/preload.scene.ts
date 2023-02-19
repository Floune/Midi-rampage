export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preload-scene' })
  }

  create() {
    this.scene.start('config-scene')
  }
}
