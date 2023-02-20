type PianoTextureType = {
  scene: Phaser.Scene;
  x?: number;
  y?: number;
  options?: Phaser.Types.GameObjects.Graphics.Options | undefined;
  sharp: boolean;
};

export default class PianoKeyTexture extends Phaser.GameObjects.Graphics {
  constructor({ scene, x, y, options, sharp }: PianoTextureType) {
    super(scene, { ...options, x, y });

    const key = sharp ? 'piano_key_sharp' : 'piano_key';
    const tileWidth = sharp ? 30 : 50;
    const tileHeight = sharp ? 150 : 200;
    const tileColor = sharp ? 0x000000 : 0xffffff;

    this.fillStyle(tileColor, 1.0);
    this.fillRect(x || 0, y || 0, tileWidth, tileHeight);
    this.lineStyle(1, 0x555555, 1);
    this.strokeRect(x || 0, y || 0, tileWidth, tileHeight);

    this.generateTexture(key);
  }
}
