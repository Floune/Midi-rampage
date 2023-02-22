import { MIDIValInput } from '@midival/core';
import { FPSText } from '@objects/debug';
import * as Tone from 'tone';
import { Piano } from '@objects/piano';
import { DEFAULT_WIDTH } from '@constants';
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

  async create(data) {
    this.add.text(DEFAULT_WIDTH, 0, 'main-scene', { color: '#000000' });
    this.piano = new Piano({ scene: this, x: 0, y: 0 });
    this.fpsText = new FPSText(this);

    this.synth = {
      osc: new Tone.Synth().toDestination(),
      am: new Tone.AMSynth().toDestination(),
      fm: new Tone.FMSynth().toDestination(),
      poly: new Tone.PolySynth(Tone.Synth).toDestination()
    };

    if (data.device) {
      const input = new MIDIValInput(data.device);

      input.onAllNoteOn((event) => {
        const key = this.piano.getKey(event.note);
        if (!key) return;

        const name = key.value + key.octave;
        this.synth[this.piano.synth].triggerAttackRelease(name, '8n');

        this.history.push(name);

        this.tweens.add({
          targets: key,
          alpha: 1,
          duration: 100,
          ease: 'Power1',
          onStart: () => {
            key.setTint(0xa00101);
          },
          onComplete: () => {
            key.clearTint();
          }
        });
      });
    }

    this.noteText = this.add.text(0, 50, 'hey', {
      font: '64px Courier',
      color: '#ffff00'
    });
  }

  update(): void {
    this.fpsText.update();
    this.noteText?.setText([...this.history].slice(-10).reverse().join(' '));
  }
}
