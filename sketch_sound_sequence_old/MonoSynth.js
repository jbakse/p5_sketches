/**
 * Basic Monophonic Synthesizer
 * @constructor
 * @return {MonoSynth} The newly created MonoSynth
 */
function MonoSynth() {

    this.name = "MonoSynth";
    this.amplitude = .75;
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
        this.envelope.mult(amplitude * this.amplitude);
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
