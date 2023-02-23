import * as Tone from 'tone';
import { Button } from '@components/button/Button';
import { DEFAULT_WIDTH } from '@constants';

export class ConfigScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;
  buttons: Button[];
  constructor() {
    super({ key: 'config-scene' });
  }
  async create() {
    await this.midi_controller.start();
    console.log(this.midi_controller.devices);
    this.add
      .text(DEFAULT_WIDTH / 2, 25, 'Select Your Device', {
        color: '#000',
        fontSize: '32px'
      })
      .setOrigin(0.5);

    this.events.on('device_connected', () => this.generateButtons());
    this.events.on('device_disconnected', ({ device }) =>
      this.removeDevicesButtons(device)
    );
    this.events.on('onButtonClick', async ({ data }) => {
      this.scene.start('main-scene', { device: data });
      await Tone.start();
    });

    this.add.text(0, 0, 'config-scene', { color: '#000000' });
    this.generateButtons();
  }
  generateButtons() {
    console.log(this.midi_controller.devices);
    this.buttons = this.midi_controller.devices.map(
      (device, index) =>
        new Button({
          scene: this.scene.scene,
          x: DEFAULT_WIDTH / 2,
          y: index * 100 + 100,
          text: device.name,
          data: device
        })
    );
  }
  removeDevicesButtons(device) {
    const deviceButton = this.buttons.find((button) => {
      console.log(button.value.id, device.id);
      return button.value.id === device.id;
    });
    deviceButton?.destroy();
  }
}
