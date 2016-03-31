// This example builds on `sketch_quickmusic` generating
// a song with a more complex, organized structure.


// **setup()** is called by p5 kick off the program.
function setup() {
	createCanvas(640, 360);
	var synth = new MonoSynth();
	synth.playNotes(makeSongOrganized());
}


// **makeSongOrganized()** generates a structured something like
// this: `A B B'B / A B B' C`
//
// Each letter represents a four beat measure.
// The first and fifth measures are the same, as are the second
// and sixth and third and seventh.
//
// The measure `B'` is a variation on measure `B`. Using repetion and
// variation makes the song feel more cohesive.
//
function makeSongOrganized() {

	// Create an empty song.
	var song = [];

	// `makePhrase()` creates a random, 1 measure musical phrase.
	// We will use it to create the parts of our song.

	// Generate `A`.
	var introPhrase = makePhrase();

	// Generate `B`.
	var middlePhrase = makePhrase();

	// Modify `B` to create `B'`.
	var alternatePhrase = quickMusic.shiftPhrase(middlePhrase, -2);

	// Generate `C`.
	var concludingPhrase = quickMusic.clonePhrase(middlePhrase);

	// Modify `C` to make sure that the last note is the tonic.
	// Ending on the tonic usually sounds good.
	concludingPhrase[concludingPhrase.length - 1][0] = 0;


	// `concat` appends one array to another.
	// Here we use `concat` to add each phrase to the array.
	// Notice that we can add multiple phrases, and add a phrase
	// more than once.
	song = song.concat(
		introPhrase,
		middlePhrase,
		alternatePhrase,
		middlePhrase,

		introPhrase,
		middlePhrase,
		alternatePhrase,
		concludingPhrase
	);

	console.log("hello");
	// This will "impose" the phrase into C-minor and return the finished song.
	return quickMusic.imposePhrase(song, quickMusic.nameToMIDI("C", 3), quickMusic.scales.minor);


}


// **makePhrase()** generates a single measure of music
// It picks notes by walking up and down the scale.
// It picks note lengths at random, being careful that the
// total length works out to 1.0
function makePhrase() {

	// Start with an empty phrase.
	var phrase = [];

	// Choose a random position in the scale to start the phrase.
	var position = floor(random(7));

	// `lengthLeft` will keep track of how much time is left in the measure.
	// It starts at 1.
	var lengthLeft = 1;

	// Keep adding notes until we have 1 measure.
	while (lengthLeft > 0) {
		// Choose how far to walk up/down the scale at random from a set.
		position += sample([-2, -1, -1, -1, 0, 1, 1, 1, 2]);

		// Choose note length at random from the set.
		var length = sample([1 / 2, 1 / 4, 1 / 4, 1 / 4, 1 / 8, 1 / 8]);

		// Make sure that our notes length won't make our measure too long.
		length = constrain(length, 0, lengthLeft);

		// Add the note (or a rest).
		if (random() < 0.2) {
			phrase.push(["rest", length]);
		} else {
			phrase.push([position, length]);
		}

		// Remove the length of the note we just added from `lengthLeft` so we know
		// how much more time to fill.
		lengthLeft -= length;
	}

	// Return the phrase to the caller.
	return phrase;
}

// **sample()** recieves and array, selects an item in the array randomly, and returns it
function sample(a) {
	return a[floor(random(a.length))];
}
