import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from './constants';

import scenes from '@scenes/index';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#DEDEDE',
  render: {
    pixelArt: true
  },
  scene: Object.values(scenes),
  loader: {
    path: 'assets/'
  },
  plugins: {},
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  }
};

export default config;
