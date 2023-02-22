import * as Tone from 'tone';

export class ConfigScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;
  buttons: Phaser.GameObjects.Text[];
  constructor() {
    super({ key: 'config-scene' });
  }

  async create() {
    await this.midi_controller.start();
    this.events.on('device_connected', () => this.generateButtons());
    this.events.on('device_disconnected', ({ device }) =>
      this.removeDevicesButtons(device)
    );
    this.add.text(0, 0, 'config-scene', { color: '#000000' });
    this.generateButtons();
  }
  generateButtons() {
    this.buttons = this.midi_controller.devices.map((device, index) =>
      this.deviceButton(device, index)
    );
  }
  deviceButton(device, index) {
    const text = this.add
      .text(575, index * 100 + 100, '', {
        font: '64px Courier',
        color: '#000'
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

    return text;
  }

  removeDevicesButtons(device) {
    const deviceButton = this.buttons.find(
      (button) => button.text === device.name
    );
    deviceButton?.destroy();
  }
}
