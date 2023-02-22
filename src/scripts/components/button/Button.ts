type ButtonType = {
  scene: Phaser.Scene;
  x: number;
  y: number;
  text?: string;
  data?: any;

  options?: {
    padding?: {
      x?: number;
      y?: number;
    };
    color?: {
      main: number;
      active: number;
      hover: number;
    };
    borderRadius: number;
    disabled?: boolean;
  };
};

export class Button extends Phaser.GameObjects.GameObject {
  container: Phaser.GameObjects.Container;
  background: Phaser.GameObjects.Graphics;
  text: Phaser.GameObjects.Text;
  width: number;
  height: number;
  color: {
    main: number;
    active: number;
    hover: number;
  };
  borderRadius: number;
  disabled: boolean;
  value: any;
  constructor({ scene, x, y, text, options, data }: ButtonType) {
    super(scene, 'button');
    this.scene.add.existing(this);
    this.value = data;
    this.color = options?.color || {
      main: 0xe53936,
      hover: 0xc62828,
      active: 0x43a047
    };
    this.borderRadius = options?.borderRadius || 0;
    this.disabled = options?.disabled || true;
    this.container = this.scene.add.container(x, y);
    this.text = this.scene.add
      .text(0, 0, text || 'button', {
        wordWrap: {
          width: 150
        },
        align: 'center'
      })
      .setOrigin(0.5);
    this.width = this.text.width + (options?.padding?.x || 5);
    this.height = this.text.height + (options?.padding?.y || 5);

    this.background = this.scene.add.graphics();

    this.container.add([this.background, this.text]);
    this.container.sendToBack(this.background);

    this.container.setSize(this.width, this.height);

    this.drawBackground(this.color.main);

    this.enable();
  }

  drawBackground(color: number) {
    this.background.clear();
    this.background.fillStyle(color);
    this.background.fillRoundedRect(
      -this.width / 2,
      -this.height / 2,
      this.container.width,
      this.container.height,
      this.borderRadius
    );
  }

  enable() {
    if (!this.disabled) return;
    this.disabled = false;
    this.drawBackground(this.color.main);
    this.container
      .setInteractive()
      .on(
        Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,
        this.handlePointerHover,
        this
      )
      .on(
        Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,
        this.handlePointerOut,
        this
      )
      .on(Phaser.Input.Events.POINTER_DOWN, this.handlePointerDown, this);
  }

  disable() {
    if (this.disabled) return;
    this.disabled = true;
    this.container.removeInteractive();
    this.drawBackground(this.color.active);
  }
  handlePointerDown() {
    this.disable();
    this.scene.sys.events.emit('onButtonClick', { data: this.value });
  }

  handlePointerHover() {
    this.drawBackground(this.color.hover);
  }

  handlePointerOut() {
    this.drawBackground(this.color.main);
  }
}
