import PianoTouch from './PianoTouch';
import { Notes } from './PianoTouch';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '@game/constants';
import { Button } from '@components/button/Button';
type Synth = 'osc' | 'am' | 'fm' | 'poly';
export class Piano extends Phaser.GameObjects.Container {
  declare list: PianoTouch[] & Phaser.GameObjects.GameObject[];
  notes: Notes[] = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B'
  ];

  synths: Synth[] = ['osc', 'am', 'fm', 'poly'];
  synth: Synth = 'osc';
  synthButtons: Button[];
  constructor({ scene, x, y }: { scene: Phaser.Scene; x: number; y: number }) {
    super(scene, x, y);
    this.x = x - 25;
    this.y = y;
    scene.add.existing(this);

    this.setSize(DEFAULT_WIDTH, 200);
    this.generateKeyboard();

    this.list.forEach((key, index) => {
      if (!key.sharp) {
        const child = this.getAt(index);
        this.sendToBack(child);
      }
    });

    Phaser.Display.Align.In.Center(
      this,
      this.scene.add.zone(
        (this.width - this.length * 30) / 2,
        DEFAULT_HEIGHT - 100,
        DEFAULT_WIDTH,
        this.height
      )
    );

    this.synthButtons = this.synths.map(
      (s, index) =>
        new Button({
          scene,
          x: index * 70 + 50,
          y: DEFAULT_HEIGHT - 250,
          text: s,
          data: s
        })
    );

    this.scene.sys.events.on('onButtonClick', this.setSynth.bind(this));
    this.synthButtons.find(({ value }) => value === this.synth)?.disable();
  }

  generateKeyboard() {
    let offset = 0;
    const keyboard = this.notes.map((value, index) => {
      const isSharp = value.endsWith('#');

      offset += isSharp ? 0 : 50;
      const octave = Math.floor(index / 12) + 3;

      return new PianoTouch({
        scene: this.scene,
        x: isSharp ? offset + 25 : offset,
        y: isSharp ? -25 : 0,
        value,
        sharp: isSharp,
        octave
      });
    });
    this.add(keyboard);
  }

  getKey(note: number) {
    const { octave, noteName } = this.parser(note);
    return this.list.find(
      (key) => key.value === noteName && key.octave === octave
    );
  }

  parser(note: number) {
    const octave = Math.floor(note / 12) - 1;
    const noteName = this.notes[note % 12];
    return { octave, noteName };
  }

  setSynth({ data }) {
    this.synth = data;
    this.synthButtons.forEach((button) => {
      if (button.value !== this.synth) {
        button.enable();
        return;
      }
    });
  }
}
