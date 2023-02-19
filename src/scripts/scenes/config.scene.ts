import * as Tone from 'tone';

export class ConfigScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text

  constructor() {
    super({ key: 'config-scene' })
    console.log(this)
    //this.width = window.innerWidth
    //this.heiht = window.innerHeight
  }

  create() {
    console.log("all", this.allDevices)
    // ts-ignore
    window.allDevices.forEach((device, index) => {
        const text = this.add.text(100, index * 100 + 100, '', { font: '64px Courier', fill: '#00ff00' }).setInteractive();

        text.setText([
            device.name,
        ]);
        text.on('pointerover', (e) => {
            text.setTint(0xff00ff, 0xffff00, 0x00ff00, 0xff0000);
        })

        text.on('pointerout', (e) => {
            text.clearTint()
        })

        text.on('pointerdown', (e) => {
            text.setFontSize(66)
        })

        text.on('pointerup', async (e) => {
            text.clearTint()
            await Tone.start()
            this.scene.start('main-scene', { device })
        })
    });
    
    
  }

  update(time: number, delta: number): void {
    //this.fpsText.update()
  }
}
