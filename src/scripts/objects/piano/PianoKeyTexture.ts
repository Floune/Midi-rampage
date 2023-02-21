type PianoTextureType = {
  scene: Phaser.Scene;
  x?: number;
  y?: number;
  options?: Phaser.Types.GameObjects.Graphics.Options | undefined;
};

export default class PianoKeyTexture extends Phaser.GameObjects.Graphics {
  constructor({ scene, x, y, options }: PianoTextureType) {
    super(scene, { ...options, x, y });
    ['piano_key_sharp', 'piano_key'].forEach((key) => {
      const sharpTexture = key.endsWith('sharp');
      const tileWidth = sharpTexture ? 30 : 50;
      const tileHeight = sharpTexture ? 150 : 200;
      const tileColor = sharpTexture ? 0x383838 : 0xffffff;

      this.fillStyle(tileColor, 1.0);
      this.fillRect(x || 0, y || 0, tileWidth, tileHeight);
      this.lineStyle(1, 0x555555, 1);
      this.strokeRect(x || 0, y || 0, tileWidth, tileHeight);

      this.generateTexture(key, tileWidth, tileHeight);
    });
  }
}
