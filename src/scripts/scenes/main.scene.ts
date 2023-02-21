import { MIDIValInput } from '@midival/core';
import { FPSText } from '@objects/debug';
import * as Tone from 'tone';
import { Piano } from '@objects/piano';
import { DEFAULT_HEIGHT } from '@game/constants';
import PianoTouch from '@objects/piano/PianoTouch';

export class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text;
  noteText: Phaser.GameObjects.Text;
  w: any;
  b: any;
  touches: {
    note: string;
    isBlack: boolean;
    touchOffset: number;
    octave: number;
  }[];
  history: string[] = [];
  synth: {
    osc: Tone.Synth;
    am: Tone.AMSynth;
    fm: Tone.FMSynth;
    poly: Tone.PolySynth;
  };
  currSynth: any = 'poly';
  piano: Piano;
  constructor() {
    super({ key: 'main-scene' });
  }

  async create(data) {
    this.piano = new Piano({ scene: this, x: 0, y: DEFAULT_HEIGHT - 100 });
    this.fpsText = new FPSText(this);
    this.synth = {
      osc: new Tone.Synth().toDestination(),
      am: new Tone.AMSynth().toDestination(),
      fm: new Tone.FMSynth().toDestination(),
      poly: new Tone.PolySynth(Tone.Synth).toDestination()
    };
    document.querySelectorAll('[synth]').forEach((el: any) => {
      console.log(el);
      el.addEventListener('click', (ev) => {
        const name = ev.target.getAttribute('synth');
        this.currSynth = name;
        console.log(name + ' selected');
      });
    });

    const input = new MIDIValInput(data.device);

    input.onAllNoteOn((event) => {
      console.log(event);
      const { value: note, octave } = this.piano.getKey(
        event.note
      ) as PianoTouch;
      const name = note + octave;
      console.log({ note, octave, name });
      this.synth[this.currSynth].triggerAttackRelease(name, '8n');
      this.history.push(name);
    });

    this.noteText = this.add.text(0, 50, 'hey', {
      font: '64px Courier',
      color: '#ffff00'
    });
  }

  update(_time: number, _delta: number): void {
    this.fpsText.update();
    this.noteText?.setText([...this.history].slice(-10).reverse().join(' '));
  }
}
