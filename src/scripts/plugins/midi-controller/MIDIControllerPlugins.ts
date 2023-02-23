//import { IMIDIAccess, IMIDIInput, MIDIVal } from '@midival/core';
import { WebMidi } from 'webmidi';

export default class MIDIControllerPlugins extends Phaser.Plugins.ScenePlugin {
  controller: any;
  devices: any[] = [];
  constructor(
    scene: Phaser.Scene,
    pluginManager: Phaser.Plugins.PluginManager,
    pluginKey: string
  ) {
    super(scene, pluginManager, pluginKey);
  }
  async start() {
    this.controller = await WebMidi.enable();
    //this.controller = await MIDIVal.connect();
    this.devices = this.controller.inputs;
    const events = this.systems.events;
    events.once('update', this.update, this);
    debugger;
  }

  async update() {
    this.controller.onInputDisconnected(this.removeDevice.bind(this));
    this.controller.onInputConnected(this.addDevice.bind(this));
  }

  addDevice(device: any) {
    this.devices = [...this.devices, device];
    this.systems.events.emit('device_connected');
  }

  removeDevice(device: any) {
    this.devices = this.devices.filter(({ id }) => id !== device.id);
    this.systems.events.emit('device_disconnected', {
      device: device
    });
  }
}
