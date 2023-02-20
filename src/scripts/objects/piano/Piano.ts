import PianoTouch from './PianoTouch';
import { Notes } from './PianoTouch';
export class Piano extends Phaser.GameObjects.Container {
  keys: PianoTouch[];
  grid: Phaser.GameObjects.GameObject[];
  constructor({ scene, x, y }: { scene: Phaser.Scene; x: number; y: number }) {
    super(scene, x, y);

    scene.add.existing(this);

    const notes: Notes[] = [
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
    this.keys = notes.map((value) => this.add(new PianoTouch({ scene, x, y, value })));
    
    this.grid = Phaser.Actions.GridAlign([], {});
  }
}
