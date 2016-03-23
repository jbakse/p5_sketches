//https://newt.phys.unsw.edu.au/jw/notes.html
//

// configure jshint linter
//https://jslinterrors.com/a-leading-decimal-point-can-be-confused-with-a-dot-a
/*jshint -W008 */

// var C3 = 48;
//
//
// var tonic = C3;
// var activeScale = majorScale;
// var frequency = 220;


/**
 * Main quickMusic namespace.
 * @namespace
 */
quickMusic = {};

/**
 * note names for an octave, starting at C
 * @type {Array}
 */
quickMusic.noteNames = [
    "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
];

/**
 * offset from tonic for notes in the diatonic major scale
 * @type {Array}
 */
quickMusic.majorScale = [0, 2, 4, 5, 7, 9, 11];

/**
 * offset from tonic for notes in the diatonic minor scale
 * @type {Array}
 */
quickMusic.minorScale = [0, 2, 3, 5, 7, 8, 10];


/**
 * offset from tonic for notes in the phrygian dominant scale
 * @link https://en.wikipedia.org/wiki/Phrygian_dominant_scale
 * @type {Array}
 */
quickMusic.phrygianDominateScale = [0, 1, 4, 5, 7, 8, 10];

/**
 * offset from tonic for notes in the minor pentatonic scale
 * @link https://en.wikipedia.org/wiki/Phrygian_dominant_scale
 * @type {Array}
 */
quickMusic.minorPentatonicScale = [0, 3, 5, 7, 10];


/**
 * finds the note for a given position on a scale
 * @param  {Number} position - the position in the scale
 * @param  {Number} tonic - the tonic or first note in the scale
 * @param  {Array} scale - array that defines the scale
 * @return {Number} the resulting note number
 */
quickMusic.getNoteInScale = function(position, tonic, scale) {
    if (position === "rest") {
        return "rest";
    }
    var octave = floor(position / scale.length);
    var index = position % scale.length;
    if (index < 0) {
        index += scale.length;
    }
    return tonic + (octave * 12) + scale[index];

};


/**
 * returns name for midi note value
 * @param  {Number} number midi note value
 * @return {string} the name of the note
 */
quickMusic.midiToName = function(number) {
    var name = quickMusic.noteNames[number % 12] + (Math.floor(number / 12) -
        1);
    return name || "-";

};

/**
 * returns midi note number for the named note and Octave
 * @param  {string} name - name of the note (e.g. "C", "C#")
 * @param  {Number} [octave=4] - number of the octave
 * @return {Number} midi number for the note
 */
quickMusic.nameToMIDI = function(name, octave) {
    if (octave === undefined) {
        octave = 4;
    }

    var index = quickMusic.noteNames.indexOf(name);
    if (index === -1) {
        return false;
    }

    return (octave + 1) * 12 + index;
};



/**
 * Basic Monophonic Synthesizer
 * @constructor
 * @return {MonoSynth} The newly created MonoSynth
 */
function MonoSynth() {

    this.name = "MonoSynth";
    /**
     * controls the envelope of the notes
     * @type p5.Evn
     */
    this.envelope = new p5.Env();
    this.envelope.setADSR(0.005, 0.1, 0.5, 0.1);
    this.envelope.setRange(1.0, 0.0);

    /**
     * generates the tone of the notes
     * @type p5.Oscillator
     */
    this.oscillator = new p5.Oscillator('square');
    this.oscillator.amp(this.envelope); // set amplitude
    this.oscillator.freq(220); // set frequency
    this.oscillator.start(); // start oscillating

    /**
     * spacing shortens length of notes to make sure
     * they are fully decayed before next note plays
     * @type {Number}
     */
    this.spacing = .05;

    /**
     * callback called when a note is played, receives
     * @type {notePlayedCalback}
     */

    this.onNotePlayed = this.reportNote;
}



/**
 * plays a note
 * @param  {number} note - midi pitch value - middle C is 60
 * @param  {number} length - length of note in seconds
 * @param  {number} amplitude - loudness of the note - 0 to 1
 */
MonoSynth.prototype.playNote = function(note, length, amplitude) {

    if (note === undefined || length === undefined) {
        console.error("playNote requires note and length parameters");
        return;
    }
    if (amplitude === undefined) {
        amplitude = 1;
    }

    if (note !== "rest") {
        var frequency = midiToFreq(note);
        this.oscillator.freq(frequency);
        this.envelope.mult(amplitude);
        this.envelope.play(this.oscillator, 0, length - this.envelope.rTime -
            this.spacing);
    }

    this.onNotePlayed(this, note, length, amplitude);
};

/**
 * plays a series of notes in sequence
 * @param  {Array.Array} notes - An array of note descriptions [note, length, amplitude]
 */
MonoSynth.prototype.playNotes = function(notes) {
    var time = 0;

    for (var i = 0; i < notes.length; i++) {
        // schedule the note to be played
        setTimeout(this.playNote.bind(this),
            time * 1000,
            notes[i][0],
            notes[i][1],
            notes[i][2]);

        // increment schedule time
        time += notes[i][1];
    }
};

MonoSynth.prototype.reportNote = function(synth, note, length, amplitude) {
    console.log("Note Played", synth.name, note, quickMusic.midiToName(note),
        length);
};
