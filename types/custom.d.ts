import MIDIControllerPlugins from '../src/scripts/plugins/midi-controller/MIDIControllerPlugins';
import { IMIDIInput } from '@midival/core';

declare module 'phaser' {
  interface Scene {
    midi_controller: MIDIControllerPlugins;
  }
  class ScenePlugin {
    midi_controller: MIDIControllerPlugins;
  }
  namespace Scenes {
    interface Systems {
      midi_controller: MIDIControllerPlugins;
    }
  }
}

declare global {
  interface Window {
    devices: IMIDIInput[];
  }
}
