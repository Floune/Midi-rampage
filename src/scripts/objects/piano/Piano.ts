import PianoTouch from './PianoTouch';
import { Notes } from './PianoTouch';
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
  }

  generateKeyboard() {
    let offset = 0;
    const keyboard = this.notes.map((value) => {
      const isSharp = value.endsWith('#');

      offset += isSharp ? 0 : 50;

      return new PianoTouch({
        scene: this.scene,
        x: isSharp ? offset + 25 : offset,
        y: isSharp ? -25 : 0,
        value,
        sharp: isSharp
      });
    });
    this.add(keyboard);
  }
}
