import { WebMidi } from 'webmidi';
import { FPSText } from '@objects/debug';
import * as Tone from 'tone';
import { Piano } from '@objects/piano';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '@constants';
import { Mehdi } from '@objects/fun/mehdi';
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
    const world = this.matter.world.setBounds(
      0,
      0,
      DEFAULT_WIDTH,
      DEFAULT_HEIGHT
    );
    this.add.text(DEFAULT_WIDTH, 0, 'main-scene', { color: '#000000' });
    this.piano = new Piano({ scene: this, x: 0, y: 0 });
    this.fpsText = new FPSText(this);

    this.synth = {
      poly: new Tone.PolySynth(Tone.Synth).toDestination(),
      osc: new Tone.Synth().toDestination(),
      am: new Tone.AMSynth().toDestination(),
      fm: new Tone.FMSynth().toDestination()
    };
    if (data.device) {
      const input = WebMidi.getInputByName(data.device.name);
      input?.addListener('noteon', ({ note }) => {
        const key = this.piano.getKey(note.identifier);
        // if (!key) return;
        const mehdi = new Mehdi({
          world
        });

        this.synth[this.piano.synth].triggerAttackRelease(
          note.identifier,
          '8n'
        );

        this.history.push(note.identifier);

        this.tweens.add({
          targets: key,
          alpha: 1,
          duration: 100,
          ease: 'Power1',
          onStart: () => {
            key?.setTint(0xa00101);
          },
          onComplete: () => {
            key?.clearTint();
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
