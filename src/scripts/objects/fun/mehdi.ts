import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from '@constants';

export class Mehdi extends Phaser.Physics.Matter.Image {
  constructor({
    world,
    x = Phaser.Math.Between(100, DEFAULT_WIDTH - 100),
    y = 0
  }) {
    super(world, x, y, 'mehdi');
    this.setBounce(1);
    this.setFriction(0.05);
    this.setSize(40, 40);
    this.scene.add.existing(this);
  }
}
