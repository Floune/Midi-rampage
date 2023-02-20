import * as Tone from 'tone';

export class ConfigScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'config-scene' });
  }

  create() {
    console.log('all', this.allDevices);

    window.allDevices.forEach((device, index) => {
      const text = this.add
        .text(575, index * 100 + 100, '', {
          font: '64px Courier',
          color: '#00ff00'
        })
        .setInteractive();
      text.setOrigin(0.5);
      text.setText([device.name]);
      text.on('pointerover', () => {
        text.setTint(0xff00ff, 0xffff00, 0x00ff00, 0xff0000);
      });

      text.on('pointerout', () => {
        text.clearTint();
      });

      text.on('pointerdown', () => {
        text.setFontSize(66);
      });

      text.on('pointerup', async () => {
        text.clearTint();
        await Tone.start();
        this.scene.start('main-scene', { device });
      });
    });
  }

  update(): void {
    // this.fpsText.update()
  }
}
