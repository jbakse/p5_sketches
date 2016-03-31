// This example demonstrates use of the `quickMusic.js` lib.
// This is a quick and dirty library with a few functions and properties
// that might help in quickly creating generative music.
//
// Properties
// - `scales.major`
// - `scales.minor`
// - `scales.phrygianDominate`
// - `scales.minorPentatonic`
//
// Functions
// - `getNoteInScale(position, tonic, scale)`
// - `midiToName(number)`
// - `nameToMIDI(name, octave)`
// - `imposePhrase(phrase, tonic, scale)`
// - `shiftPhrase(phrase, amount)`
// - `clonePhrase(phrase)`
//
// For more the details, see the comments in quickMusic.js

// **setup()** is called by p5 kick off the program.
function setup() {
	createCanvas(640, 360);
	var synth = new MonoSynth();
	synth.playNotes(makeSongQuickMusic());
}

// **makeSongQuickMusic()** creates the song, using quickMusic to make things a bit easier
function makeSongQuickMusic() {
	var song = [];

	// Create an array of the pitches we'll use in the song.
	// Rather than using midi note numbers, this array holds positions
	// on scale. Using scale positions is easier, because we won't need
	// to think about what notes to skip. It also lets us decide on the key
	// later.

	// All positions in one octave of a diatonic (7-pitch) scale (e.g. major)
	var positions = [0, 1, 2, 3, 4, 5, 6];

	// Start at a random index.
	var index = floor(random(positions.length));

	// Let's make 16 notes.
	for (var i = 0; i < 16; i++) {

		// Pick a step amount at random from a list, step that much.
		index = index + sample([-1, 0, 1]);

		// Make sure we don't go outside the array bounds.
		index = constrain(index, 0, positions.length - 1);

		// Push the note onto the song.
		song.push([
			positions[index],
			sample([1 / 2, 1 / 4, 1 / 4, 1 / 4])
		]);
	}

	// At this point the `song` is an array that looks something like this:
	// ```
	// [
	// [1, 1/2],
	// [0, 1/4],
	// ...
	// ]
	// ```
	// The first number in each note represent a position in a scale, rather than
	// the actual midi note number to play. We can use `quickMusic.imposePhrase`
	// to convert those positions to their corresponding notes.

	// This will "impose" the phrase into C-minor.
	song = quickMusic.imposePhrase(song, quickMusic.nameToMIDI("C", 3), quickMusic.scales.minor);

	// Return our finished song.
	return song;
}


// **sample()** recieves and array, selects an item in the array randomly, and returns it
function sample(a) {
	return a[floor(random(a.length))];
}
