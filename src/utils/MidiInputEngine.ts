// Handles and abtstracts the midi input using midival

import { IMIDIAccess, IMIDIInput, MIDIVal, MIDIValInput } from '@midival/core';

export default class MidiInputEngine {
  controller: IMIDIAccess;
  devices: IMIDIInput[] = [];
  activeDevice: IMIDIInput;
  input: MIDIValInput;

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
}
