import 'phaser';
import type { IMIDIInput } from '@midival/core';
import { MIDIVal } from '@midival/core';

import config from '@game/config';

// @TODO: need to move in custom.d.ts not work IDKW
declare global {
  interface Window {
    devices: IMIDIInput[];
  }
}

window.devices = [];
const permissionName = 'midi' as PermissionName;
navigator.permissions.query({ name: permissionName }).then((result) => {
  if (result.state === 'granted') {
    MIDIVal.connect()
      .then((accessObject) => {
        console.log('Inputs', accessObject.inputs);
        console.log('Outputs', accessObject.outputs);
        window.devices = accessObject.inputs;

        new Phaser.Game(config);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  } else if (result.state === 'prompt') {
    console.log('bonjour');
  }
});
