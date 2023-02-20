import PianoTouch from './PianoTouch';
import { Notes } from './PianoTouch';
export class Piano extends Phaser.GameObjects.Container {
  keys: PianoTouch[];
  grid: Phaser.GameObjects.GameObject[];
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
    this.x = x;
    this.y = y;
    this.scene = scene;
    scene.add.existing(this);

    this.notes.forEach((value) => {
      const isSharp = value.endsWith('#');
      const key = new PianoTouch({
        scene: this.scene,
        x,
        y,
        value,
        sharp: isSharp
      });
      this.add(key);
    });
    this.grid = Phaser.Actions.GridAlign(this.list, {
      width: this.list.length,
      height: 1,
      cellWidth: 50,
      position: Phaser.Display.Align.TOP_LEFT,
      x: this.x,
      y: this.y
    });
  }
}
