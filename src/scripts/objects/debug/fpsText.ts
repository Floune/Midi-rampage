export class FPSText extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x?: number,
    y?: number,
    text?: string,
    style?: Phaser.Types.GameObjects.Text.TextStyle
  ) {
    super(
      scene,
      x || 0,
      y || 0,
      text || '',
      style || {
        fontSize: '28px',
        color: 'green'
      }
    );
    scene.add.existing(this);
    this.setOrigin(0);
  }

  update() {
    this.setText(`fps: ${Math.floor(this.scene.game.loop.actualFps)}`);
  }
}
