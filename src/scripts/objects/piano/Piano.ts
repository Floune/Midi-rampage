import PianoTouch from './PianoTouch';
import { Notes } from './PianoTouch';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '@game/constants';
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
  constructor({ scene, x, y }: { scene: Phaser.Scene; x: number; y: number }) {
    super(scene, x, y);
    this.x = x - 25;
    this.y = y;
    scene.add.existing(this);

    this.generateKeyboard();

    this.list.forEach((key, index) => {
      if (!key.sharp) {
        const child = this.getAt(index);
        this.sendToBack(child);
      }
    });

    this.setSize(DEFAULT_WIDTH, 200);
    Phaser.Display.Align.In.Center(
      this,
      this.scene.add.zone(
        (this.width - this.length * 30) / 2,
        DEFAULT_HEIGHT - 100,
        DEFAULT_WIDTH,
        this.height
      )
    );
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
}
