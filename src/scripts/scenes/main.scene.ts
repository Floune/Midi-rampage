import { MIDIValInput } from '@midival/core'
import { FPSText } from '@objects/debug'
import * as Tone from 'tone';

const allNotes = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", 
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B", 
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
];

export class MainScene extends Phaser.Scene {
  fpsText: Phaser.GameObjects.Text
  noteText: Phaser.GameObjects.Text
  w: any
  b: any
  touches: any
  history : string[] = []
  synth: any
  currSynth: any = "poly"

  constructor() {
    super({ key: 'main-scene' })
    
  }

  async create(data) {
    this.fpsText = new FPSText(this)
    this.synth = {
      osc: new Tone.Synth().toDestination(),
      am: new Tone.AMSynth().toDestination(),
      fm: new Tone.FMSynth().toDestination(),
      poly: new Tone.PolySynth(Tone.Synth).toDestination(),
    }
    document.querySelectorAll("[synth]").forEach((el: any) => {
      console.log(el)
      el.addEventListener("click", (ev) => {
        const name = ev.target.getAttribute("synth")
        this.currSynth = name;
        console.log(name + " selected")
      })
    })
   
    const input = new MIDIValInput(data.device);
    
    input.onAllNoteOn(event => {
      const n = this.parser(event.note);
      const pos = this.touches.find(t => t.note === n.noteName && t.octave === n.octave);
      const isBlack = pos.isBlack;
      const w = isBlack ? 30 : 50;
      const h = isBlack ? 100 : 200;
      const overlay = this.add.rectangle(pos.touchOffset, 300, w, h, 0xff0000, 0.5);
      overlay.setOrigin(0, 0);
      const name = n.noteName + n.octave;
      this.synth[this.currSynth].triggerAttackRelease(name, "8n");
      this.history.push(name);
      this.tweens.add({
          targets: overlay,
          alpha: 0,
          duration: 333,
          ease: 'Power1',
          onComplete: () => {
              overlay.destroy();
          }
        });
        
    });
    

    this.pianoRoll()
    this.noteText = this.add.text(0, 50, 'hey', { font: '64px Courier', fill: '#ffff00' });

  }

  update(time: number, delta: number): void {
    this.fpsText.update()

    this.noteText?.setText([...this.history].slice(-10).reverse()
       .join(' '))
  }

  pianoRoll() {
    const y = 300;
    const pianoRoll = this.add.graphics();
    const wRoll = this.w = this.add.graphics({});
    const bRoll = this.b = this.add.graphics();
    pianoRoll.fillStyle(0x00ff00, 1);
    pianoRoll.fillRect(0, 0, 1800, 1000);

    let offset = 0;

    this.touches = allNotes.map((note, index) => {
      const isBlack = note.endsWith("#");
      offset += (isBlack) ? 0 : 50;
      const touchOffset = (isBlack) ? offset + 30 : offset;
      const octave = Math.floor(index / 12) + 3;
      return {
        note,
        isBlack,
        touchOffset,
        octave
      }
    })

    const w = this.touches.filter(t => !t.isBlack); 
    const b = this.touches.filter(t => t.isBlack); 

    w.forEach(t => {
      wRoll.fillStyle(0xffffff, 1);
      wRoll.fillRect(t.touchOffset, y, 50, 200);
      wRoll.lineStyle(1, 0x000000, 1);
      wRoll.strokeRect(t.touchOffset, y, 50, 200);
    })

    b.forEach(t => {
      bRoll.fillStyle(0x000000, 1);
      bRoll.fillRect(t.touchOffset, y, 30, 100);

    })
  }

  parser(note: number) {
    const octave = Math.floor(note / 12) - 1;
    const noteName = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][note % 12];
    return { octave, noteName };
  }
}



