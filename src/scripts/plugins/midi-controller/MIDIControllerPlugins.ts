import { IMIDIAccess, IMIDIInput, MIDIVal, MIDIValInput } from '@midival/core';

export default class MIDIControllerPlugins extends Phaser.Plugins.BasePlugin {
  controller: IMIDIAccess;
  devices: IMIDIInput[] = [];
  activeDevice: IMIDIInput;
  instanceName = 'midi_controller';
  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager);
    this.instanceName = 'midi_controller' + Date.now();
  }
  
  async start(cb: () => any) {
    console.log('init midi controller', this, Date.now());
    this.controller = await MIDIVal.connect();
    this.devices = this.controller.inputs;
    cb();
  }

  setDevice(device: IMIDIInput) {
    console.log('setting device', device);
    this.activeDevice = device;
    this.input = new MIDIValInput(this.activeDevice);
  }

  inputHandler(callback: (data: any) => any) {
    if (!this.activeDevice) {
      throw new Error('No device selected');
    }
    this.input.onAllNoteOn((event) => {
      console.log('note on', event);
      callback(event);
    });
  }
  
  /*
  deso callan, je sais pas ce que je fais
  async init() {
    console.log('init midi controller', this, Date.now());
  } 
  
  async start() {
    console.log('starting midi controller', this, Date.now());
    this.controller = await MIDIVal.connect();
    this.devices = this.controller.inputs;

    //const events = this.systems.events;
    //events.once('update', this.update, this);
  }

  async update() {
    this.controller.onInputDisconnected(this.removeDevice.bind(this));
    this.controller.onInputConnected(this.addDevice.bind(this));
  }

  addDevice(device: IMIDIInput) {
    this.devices = [...this.devices, device];
    this.pluginManager.sys.events.emit('device_connected');
  }

  removeDevice(device: IMIDIInput) {
    this.devices = this.devices.filter(({ id }) => id !== device.id);
    this.pluginManager.sys.events.emit('device_disconnected', {
      device: device
    });
  }

  setDevice(device: IMIDIInput) {
    console.log('setting device', device);
    this.activeDevice = device;
  }

  inputHandler(callback: (data: any) => any) {
    if (!this.activeDevice) {
      debugger
      //throw new Error('No device selected');
    }
    debugger
    const input = new MIDIValInput(this.activeDevice);

    return () => {

      input.onAllNoteOn((event) => {
        console.log('note on', event);
        callback(event);
      });
    }
  }
  destroy() {
    console.log('destroying midi controller');
    super.destroy();
  }//*/
}
