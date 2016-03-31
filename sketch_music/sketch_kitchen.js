// This is a big demo, building on `sketch_advanced.js`
// and featuring a variety of more advanced topics.
//
// - Uses a seed when generating songs, so the same 'random' song can be generated twice.
// - Generates songs with two tracks: lead and bass.
// - Uses a *callback* to follow and visualize song playback
// - Uses `setInterval` to schedule a series of events.

// Declare the synth's globally so that all parts of
// the program can access them easily.
var leadSynth, bassSynth;

// **setup()** is called by p5 kick off the program.
function setup() {
    createCanvas(640, 360);
    MonoSynth.prototype.reportNote = showNote;
    background(50);

    // Call nextSong now, to play the first song.
    nextSong();

    // Setup a interval to play a new song every 9000 milliseconds.
    setInterval(function() {
        nextSong();
    }, 9000);
}

// **nextSong()** Clears the drawing area, and kicks off the song.
function nextSong() {
    // Set up drawing state.
    background(50);
    textSize(32);
    fill(255);

    // Pick a seed.
    var songSeed = floor(random(100000));

    // Pass seed to song generator.
    var song = generateSong(songSeed);
}

// **generateSong** generates a song, creates synths, and plays the song
function generateSong(seed) {
    // Call chooseParams with the seed to create the parameters that shape the song.
    var params = chooseParams(seed);

    // At this point we have a structure that represents all the parameters
    // that shape the song. If you like, you could override the parameters here,
    // to make sure that all songs are in the same key, or something like that.

    // Show the params in the javascript console.
    console.log(JSON.stringify(params, null, " "));

    // Pass the chosen parameters to `makeBassline` and `makeLead` to generate the song.
    var bassline = makeBassline(params.bass);
    var lead = makeLead(params.lead);

    // Create the baseSynth and configure it according to the parameters.
    bassSynth = new MonoSynth();
    configureSynth(bassSynth, params.bass);

    // We want the baseline quieter than the lead.
    bassSynth.amplitude = 0.25;

    // Translate the bassline into the key from the params.
    bassline = quickMusic.imposePhrase(bassline, quickMusic.nameToMIDI(params.tonic,
        params.bass.octave), params.scale);

    // Start the bassline playing.
    bassSynth.playNotes(bassline);

    // Create the lead synth.
    leadSynth = new MonoSynth();
    configureSynth(leadSynth, params.lead);
    bassSynth.amplitude = 0.5;

    // Set the key...
    lead = quickMusic.imposePhrase(lead, quickMusic.nameToMIDI(params.tonic,
        params.lead.octave), params.scale);

    // Play the lead.
    leadSynth.playNotes(lead);

    // Draw info about the song to screen.
    text("Song: " + seed, 10, 40);
    text(params.tonic + " " + params.scaleName, 10, height - 40);
}


// **chooseParams()** creates an object containing the parameters
// that hape the song.
function chooseParams(seed) {
    // If not seed is provided, pick one at random.
    songSeed = seed || floor(random(1000000));

    // Report the seed on the javascript console.
    console.log("Song Seed: ", songSeed);

    // Use randomSeed to set the seed. Random values will be repeatable.
    randomSeed(songSeed);

    // Create the empty object to contain all the parameters.
    params = {};

    // Create a param property named 'tonic', set its value to one of the notes.
    params.tonic = sample(quickMusic.noteNames);

    // The name of the scale used by the song.
    params.scaleName = sample(Object.keys(quickMusic.scales));

    // The scale intervals for the song.
    params.scale = quickMusic.scales[params.scaleName];

    // Create a property called 'lead' that will contain parameters about the lead synth and music.
    params.lead = {};

    // A human readable name.
    params.lead.name = "Lead";

    // What octave to play in.
    params.lead.octave = sample([2, 3, 3, 4, 5]);

    // The tone to use.
    params.lead.waveType = sample(['sine', 'triangle', 'sawtooth', 'square']);

    // Spacing is the time between notes.
    params.lead.spacing = random(-0.1, 0.15);

    // The decay of tones.
    params.lead.decay = min(random(), random(), random());

    // A random seed for generating the music.
    params.lead.seed = floor(random(10000));

    // How far to shift the `B` measure.
    params.lead.phraseShift = sample([-3, -2, -2, -1, 1, 2, 5, 7, 14]);

    // Candidate step sizes for the melody.
    params.lead.brownianSteps = [-2, -1, -1, -1, 0, 1, 1, 1, 2];

    // Pick on of several types of note length groups.
    params.lead.noteLengths = sample([
        [1 / 2, 1 / 4, 1 / 4, 1 / 4, 1 / 8, 1 / 8],
        [1 / 2, 1 / 4],
        [1 / 8],
        [1 / 2, 1 / 16, 1 / 16, 1 / 16],
        [1 / 3, 1 / 6]
    ]);

    // How likely a note will silent, creating a rest.
    params.lead.restChance = sample([0, 0.2, 0.2, 0.2, 0.5]);


    // Similar settings for the bass part
    params.bass = {};
    params.bass.name = "Bass";
    params.bass.octave = sample([1, 2, 2, 3, 4]);
    params.bass.waveType = sample(['sine', 'triangle', 'sawtooth', 'square']);
    params.bass.spacing = random(-0.1, 0.15);
    params.bass.decay = min(random(), random(), random());
    params.bass.seed = floor(random(10000));

    return params;
}

// **configureSynth()** sets values in the provided synth according the provided synthParams
function configureSynth(synth, synthParams) {
    synth.name = synthParams.name;
    synth.oscillator.setType(synthParams.waveType);
    synth.spacing = synthParams.spacing;
    synth.envelope.setADSR(0.01, 0.05, 0.75, synthParams.decay);
}

// **makeBassLine()** generates the notes of the bassline.
function makeBassline(params) {
    randomSeed(params.seed);

    // Start with an empty phrase.
    var phrase = [];

    // Choose how many beats per measure.
    var beats = sample([1, 2, 4]);

    // Make Four Measures.
    for (var i = 0; i < 4; i++) {
        // Choose a note that is either the tonic, the 4th or the 5th.
        var position = sample([0, 3, 4]);

        // Add the notes.
        for (var beat = 0; beat < beats; beat++) {
            phrase.push([position, 1 / beats]);
        }
    }

    // Repeat the first four measures to create the second four measures.
    phrase = phrase.concat(phrase);

    // Remove last measure of beats.
    phrase = phrase.slice(0, phrase.length - beats);

    // Add a long tonic note. Ending on the tonic sometimes sounds nice.
    phrase.push([0, 1]);

    // Return the phrase.
    return phrase;
}



// **makeLead()** generates a structured something like
// this: `A B B'B / A B B' C`
//
// Each letter represents a four beat measure.
// The first and fifth measures are the same, as are the second
// and sixth and third and seventh.
//
// The measure `B'` is a variation on measure `B`. Using repetion and
// variation makes the song feel more cohesive.
//
function makeLead(params) {
    randomSeed(params.seed);

    var fullPhrase = [];
    var introPhrase = makePhrase(params);
    var middlePhrase = makePhrase(params);
    var alternatePhrase = quickMusic.shiftPhrase(middlePhrase, params.phraseShift);
    var concludingPhrase = quickMusic.clonePhrase(middlePhrase);
    concludingPhrase[concludingPhrase.length - 1][0] = 0;

    fullPhrase = fullPhrase.concat(
        introPhrase,
        middlePhrase,
        alternatePhrase,
        middlePhrase,

        introPhrase,
        middlePhrase,
        alternatePhrase,
        concludingPhrase
    );

    return fullPhrase;
}


// **makePhrase()** generates a single measure of music
// It picks notes by walking up and down the scale.
// It picks note lengths at random, being careful that the
// total length works out to 1.0
function makePhrase(params) {
    var phrase = [];

    var position = floor(random(7));
    var lengthLeft = 1;


    while (lengthLeft > 0) {
        position += sample(params.brownianSteps);
        var length = sample(params.noteLengths);
        length = constrain(length, 0, lengthLeft);

        if (random() < params.restChance) {
            phrase.push(["rest", length]);
        } else {
            phrase.push([position, length]);
        }

        lengthLeft -= length;
    }

    return phrase;
}

// **showNote()** is a `callback` function.
//
// It gets called everytime a monosynth begins playing a note.
// It draws a visualization of that note to the stage.
function showNote(synth, note, length, time) {
    // Use `push()` and `pop()` to make sure that this function doesn't upset the drawing state used elsewhere.
    push();
    noStroke();

    // Pick the color based on what synth is playing the note.
    if (synth === leadSynth) {
        fill(0, 250, 150);
    }
    if (synth === bassSynth) {
        fill(0, 150, 250);
    }

    // Draw the note.
    rect(map(time, 0, 8, 0, width), map(note, 0, 96, height, 0), map(length, 0,
        8, 0, width) - 2, 7, 3, 3, 3, 3);
    pop();
}

// **sample()** recieves and array, selects an item in the array randomly, and returns it
function sample(a) {
    return a[floor(random(a.length))];
}
