/*
 * Basic Monophonic Synthesizer
 * !@constructor
 * !@return {MonoSynth} The newly created MonoSynth
 */

// configure jshint linter
//https://jslinterrors.com/a-leading-decimal-point-can-be-confused-with-a-dot-a
/*jshint -W008 */


function MonoSynth() {
    /**
     * name of the synth, useful for reporting/debugging
     */
    this.name = "MonoSynth";

    /**
     * master amplitude for the synth
     */
    this.amplitude = 0.5;

    /**
     * controls the envelope of the notes
     * @type p5.Evn
     */
    this.envelope = new p5.Env();
    this.envelope.setADSR(0.01, 0.05, 0.75, 0.25);
    this.envelope.setRange(1.0, 0.0);

    /**
     * generates the tone of the notes
     * @type p5.Oscillator
     */
    this.oscillator = new p5.Oscillator('square');
    this.oscillator.amp(this.envelope); // set amplitude
    this.oscillator.start(); // start oscillating
    this.oscillator.freq(220); // set frequency

    /**
     * spacing shortens length of notes to make sure
     * they are fully decayed before next note plays
     * @type {Number}
     */
    this.spacing = 0; // -0.7;

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
 * @param  {number} time - time in seconds from now to start note
 */
MonoSynth.prototype.playNote = function(note, length, time) {
    var now = getAudioContext().currentTime;

    if (note === undefined || length === undefined) {
        console.error("playNote requires note and length parameters");
        return;
    }

    time = time || 0;

    if (note !== "rest") {
        //schedule the pitch change

        var frequency = midiToFreq(note);
        this.oscillator.oscillator.frequency.setValueAtTime(frequency, now +
            time);

        //schedule the attack envelope
        var sustainLength = length - this.spacing;
        this.envelope.mult(this.amplitude);
        this.envelope.play(this.oscillator, time, sustainLength);
    }

    var self = this;
    setTimeout(function() {
        self.onNotePlayed(self, note, length, time);
    }, time * 1000);
};

/**
 * plays a series of notes in sequence
 * @param  {Array.Array} notes - An array of note descriptions [note, length]
 */
MonoSynth.prototype.playNotes = function(notes) {
    var time = 0;
    for (var i = 0; i < notes.length; i++) {
        this.playNote(notes[i][0], notes[i][1], time);
        // increment schedule time
        time += notes[i][1];
    }
};

MonoSynth.prototype.reportNote = function(synth, note, length) {
    console.log("Note Played!", synth.name, note, quickMusic.midiToName(
        note), length);
};
