// configure jshint linter
// https://jslinterrors.com/a-leading-decimal-point-can-be-confused-with-a-dot-a
/*jshint -W008 */

/*
 * Main quickMusic namespace
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
 * Collection of important musical scales. Each scale is represented
 * as an array of values. Each value is the number of half-step offsets
 * from the tonic to a note in the scale. The scales cover one octave.
 * @type {Array}
 */
quickMusic.scales = {};
quickMusic.scales.major = [0, 2, 4, 5, 7, 9, 11];
quickMusic.scales.minor = [0, 2, 3, 5, 7, 8, 10];
quickMusic.scales.phrygianDominate = [0, 1, 4, 5, 7, 8, 10];
quickMusic.scales.minorPentatonic = [0, 3, 5, 7, 10];


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
    // console.log("midi", name, octave, (octave + 1) * 12 + index);
    return (octave + 1) * 12 + index;
};

/**
 * turns a scale-position based phrase into a midi-note-number based phrase
 * @param  {scale-position phrase} phrase the phrase to impose
 * @param  {[type]} tonic  the tonic of the key to impose to
 * @param  {[type]} scale  the scale of the key to impose to
 * @return {note-number phrase}        the imposed phrase
 */
quickMusic.imposePhrase = function(phrase, tonic, scale) {
    var copy = quickMusic.clonePhrase(phrase);
    for (var i = 0; i < copy.length; i++) {
        if (copy[i][0] !== "rest") {
            copy[i][0] = quickMusic.getNoteInScale(copy[i][0], tonic, scale);
        }
    }
    return copy;
};


/**
 * creates a copy of the given phrase and then raises/lowers the pitch values the given amount
 * @param  {phrase} phrase phrase to shift
 * @param  {Number} amount amount to shift
 * @return {phrase}        shifted copy
 */
quickMusic.shiftPhrase = function(phrase, amount) {
    var copy = quickMusic.clonePhrase(phrase);
    for (var i = 0; i < copy.length; i++) {
        if (copy[i][0] !== "rest") {
            copy[i][0] += amount;
        }
    }
    return copy;
};

/**
 * makes a copy of a phrase
 * @param  {phrase} phrase
 * @return {phrase}
 */
quickMusic.clonePhrase = function(phrase) {
    var clone = [];
    for (var i = 0; i < phrase.length; i++) {
        clone.push(phrase[i].slice(0));
    }
    return clone;
};
