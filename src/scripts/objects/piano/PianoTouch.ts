type PianoKeyType = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  options?: Phaser.Types.GameObjects.Graphics.Options | undefined;
  value: Notes;
  sharp: boolean;
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

export default class PianoTouch extends Phaser.GameObjects.Sprite {
  private _value: Notes;
  private readonly _sharp: boolean;

  constructor({ scene, x, y, value, sharp }: PianoKeyType) {
    super(scene, x, y, sharp ? 'piano_key_sharp' : 'piano_key');
    this._value = value;
    this._sharp = sharp;

    scene.add.existing(this);

    this.setInteractive();
    // @TODO: It's for tests to be deleted later
    this.on('pointerover', () => {
      this.setTint(0xa00101);
    });

    this.on('pointerout', () => {
      this.clearTint();
    });
  }

  get sharp(): boolean {
    return this._sharp;
  }

  protected preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
  }
}
