type PianoKeyType = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  options?: Phaser.Types.GameObjects.Graphics.Options | undefined;
  value: Notes;
};

export type Notes =
  | 'C'
  | 'C#'
  | 'D'
  | 'D#'
  | 'E'
  | 'F'
  | 'F#'
  | 'G'
  | 'G#'
  | 'A'
  | 'A#'
  | 'B';

export default class PianoTouch extends Phaser.GameObjects.Graphics {
  private _value: Notes;
  private _sharp: boolean;

  constructor({ scene, x, y, options, value }: PianoKeyType) {
    super(scene, options);
    this._value = value;
    this._sharp = this.isSharp();
    this.fillStyle(0xffffff, 1.0);
    this.fillRect(x, y, 400, 200);
  }

  isSharp() {
    return this._value.endsWith('#');
  }

  get sharp(): boolean {
    return this._sharp;
  }
}
