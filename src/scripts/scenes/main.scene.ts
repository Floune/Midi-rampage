import { FPSText } from '@objects/debug';
import * as Tone from 'tone';
import { Piano } from '@objects/piano';
import { DEFAULT_WIDTH } from '@constants';
import PianoTouch from '@game/objects/piano/PianoTouch';
import { getKey, noteParser } from '../utils/midi.ts';
export class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;
  noteText: Phaser.GameObjects.Text;
  history: string[] = [];
  synth: {
    osc: Tone.Synth;
    am: Tone.AMSynth;
    fm: Tone.FMSynth;
    poly: Tone.PolySynth;
  };
  piano: Piano;
  constructor() {
    super({ key: 'main-scene' });
  }

  async create() {
    this.add.text(DEFAULT_WIDTH, 0, 'main-scene', { color: '#000000' });
    const piano = new Piano({ scene: this, x: 0, y: 0 });
    this.fpsText = new FPSText(this);
    this.piano = piano;
    this.midi = window.midiInputEngine;
    this.audio = window.audioDriver;

    this.midi.inputHandler((event) => {
      const {value, octave } = noteParser.parse(event);
      this.audio.start(value, octave);
      piano.animateTouch(value, octave, this.tweens);
      
      this.history.push(value);
    });

    this.noteText = this.add.text(0, 50, 'hey', {
      font: '20px Courier',
      color: '#000000'
    });
  }

  update(): void {
    this.fpsText.update();
    this.noteText?.setText([...this.history].slice(-10).reverse().join("\n"));
  }
}
