import { IMIDIAccess, IMIDIInput, MIDIVal } from '@midival/core';

export default class MIDIControllerPlugins extends Phaser.Plugins.ScenePlugin {
  controller: IMIDIAccess;
  devices: IMIDIInput[] = [];
  constructor(
    scene: Phaser.Scene,
    pluginManager: Phaser.Plugins.PluginManager,
    pluginKey: string
  ) {
    super(scene, pluginManager, pluginKey);
  }
  async start() {
    this.controller = await MIDIVal.connect();
    this.devices = this.controller.inputs;

    const events = this.systems.events;
    events.once('update', this.update, this);
  }

  async update() {
    this.controller.onInputDisconnected(this.removeDevice.bind(this));
    this.controller.onInputConnected(this.addDevice.bind(this));
  }

  addDevice(device: IMIDIInput) {
    this.devices = [...this.devices, device];
    this.systems.events.emit('device_connected');
  }

  removeDevice(device: IMIDIInput) {
    this.devices = this.devices.filter(({ id }) => id !== device.id);
    this.systems.events.emit('device_disconnected', {
      device: device
    });
  }
}
