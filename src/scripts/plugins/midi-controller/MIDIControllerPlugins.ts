import { WebMidi } from 'webmidi';

import type { Input } from 'webmidi';
export default class MIDIControllerPlugins extends Phaser.Plugins.ScenePlugin {
  controller: typeof WebMidi;
  devices: Input[] = [];
  constructor(
    scene: Phaser.Scene,
    pluginManager: Phaser.Plugins.PluginManager,
    pluginKey: string
  ) {
    super(scene, pluginManager, pluginKey);
  }
  async start() {
    this.controller = await WebMidi.enable();
    this.devices = this.controller.inputs;
    this.controller.addListener('disconnected', this.removeDevice.bind(this));
    this.controller.addListener('connected', this.addDevice.bind(this));
  }
  addDevice(device: any) {
    if (device.port.type === 'output') return;
    this.devices = [...this.devices, device.port];
    this.systems.events.emit('device_connected');
  }

  removeDevice(device: any) {
    this.devices = this.devices.filter(({ id }) => id !== device.port.id);
    this.systems.events.emit('device_disconnected', {
      device: device.port
    });
  }

  destroy() {
    this.devices = [];
  }
}
