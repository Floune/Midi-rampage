type ButtonType = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  text?: string;
  data?: any;
};

export class Button extends Phaser.GameObjects.GameObject {
  background: Phaser.GameObjects.Graphics;
  text: Phaser.GameObjects.Text;
  value: any;
  constructor({ scene, x, y, text, data }: ButtonType) {
    super(scene, 'button');
    this.scene.add.existing(this);
    this.value = data;

    this.background = this.scene.add.graphics();
    this.background.fillStyle(0xe53935);

    this.text = this.scene.add
      .text(x, y, text || 'button', {
        color: '#FFF',
        fontSize: '24px',
        backgroundColor: '#e53935',
        padding: {
          top: 5,
          bottom: 5,
          left: 5,
          right: 5
        },
        wordWrap: {
          width: 150
        },
        align: 'center'
      })
      .setOrigin(0.5);

    this.text.setInteractive();

    this.text.on('pointerover', () => {
      if (!this.active) return;
      this.text.setBackgroundColor('#c62828');
    });

    this.text.on('pointerout', () => {
      if (!this.active) return;
      this.text.setBackgroundColor('#e53935');
    });

    this.text.on('pointerdown', () => {
      this.text.setBackgroundColor('#e57373');
      this.scene.sys.events.emit('onButtonClick', { data });
    });
  }
}
