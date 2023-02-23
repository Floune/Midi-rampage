import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '@constants';

import scenes from '@scenes/index';
import MidiController from '@game/plugins/midi-controller';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#DEDEDE',
  render: {
    pixelArt: true
  },
  scene: Object.values(scenes),
  plugins: {
    scene: [MidiController]
  },
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  physics: {
    default: 'matter',
    matter: {
      debug: true,
      enableSleeping: true
    }
  }
};

export default config;
