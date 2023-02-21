import 'phaser';

import config from '@game/config';

window.devices = [];
const permissionName = 'midi' as PermissionName;
navigator.permissions.query({ name: permissionName }).then((result) => {
  if (result.state === 'granted') {
    new Phaser.Game(config);
  } else if (result.state === 'prompt') {
    console.log('bonjour');
  }
});
