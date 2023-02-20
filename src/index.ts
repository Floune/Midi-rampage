import 'phaser';
import { MIDIVal } from '@midival/core';

import config from '@game/config';

window.allDevices = [];
navigator.permissions.query({ name: 'midi', sysex: true }).then((result) => {
  if (result.state === 'granted') {
    MIDIVal.connect()
      .then((accessObject) => {
        console.log('Inputs', accessObject.inputs);
        console.log('Outputs', accessObject.outputs);

        window.allDevices = accessObject.inputs;
        new Phaser.Game(config);
      })
      .catch((err) => {
        console.log('Error', err);
      });
  } else if (result.state === 'prompt') {
    console.log('bonjour');
  }
});
