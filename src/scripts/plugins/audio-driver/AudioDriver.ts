const map = {
    'C': 'C',
    'C#': 'Db',
    'D': 'D',
    'D#': 'Eb',
    'E': 'E',
    'F': 'F',
    'F#': 'Gb',
    'G': 'G',
    'G#': 'Ab',
    'A': 'A',
    'A#': 'Bb',
    'B': 'B',
};

export default class AudioDriver {
    depressed = [];
    intervals = [];
    constructor() {
        this.init();
    }
    async init() {
        console.log('init audio driver');
    }
    async start(note, octave) {
        console.log('starting audio driver', note, octave);
        const n: string = map[note];
        const key = "sound-" + n + octave;
        const audioNode = document.getElementById(key);

        audioNode.volume = 1.0;
        if (audioNode.readyState >= 2) {
            audioNode.currentTime = 0;
        }
        audioNode.play();
        
    }
}
