export const scale: Notes[] = [
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

interface ScaleNote {
  value: Notes;
  octave: number;
}

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
export function getKey(note: number) {
  const { octave, noteName } = parser(note);
  console.log(note, octave, noteName,getNotesList(2))
  
  return getNotesList(2).find(
    (key) => key.value === noteName && key.octave === octave
  );
}

export function parser(note: number) {
  const octave = Math.floor(note / 12) - 1;
  const noteName = scale[note % 12];
  return { octave, noteName };
}

export function getNotesList(octaves: number) {
  const notes = [];
  for (let i = 0; i < octaves; i++) {
    notes.push(...scale);
  }
  notes.push(scale[0]);
  return notes;
}

export class NoteParser {
  private fullScale: ScaleNote[] = [];
  constructor(
    private baseOctave = 3,
    private notes: Notes[] = scale,
    private octaves = 2,
  ) {
    this.setNotesList();
  }

  public setNotesList() {
    const notes = [];
    for (let i = -3; i < 4; i++) {
      const scale: ScaleNote[] = this.notes.map((note) => ({
        value: note,
        octave: this.baseOctave + i,
      }));
      notes.push(...scale);
    }
    this.fullScale = notes;
  }

  private parser(note: number) {
    const octave = Math.floor(note / 12) - 1;
    const noteName = scale[note % 12];
    return { octave, noteName };
  }

  public parse(ev) {
    const { octave, noteName } = this.parser(ev.note);
    return this.fullScale.find(
      (key) => key.value === noteName && key.octave === octave
    );
  }
}

export const noteParser = new NoteParser();