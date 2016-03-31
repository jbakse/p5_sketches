// This example builds on sketch_basic.js
// It creates a song by moving up or down the scale
// one step at a time.

// **setup()** is called by p5 kick off the program.
function setup() {
	createCanvas(640, 360);
	var synth = new MonoSynth();

	// Create the song and pass it to the synth.
	synth.playNotes(makeSongBrownian());
}


// **makeSongBasic()** generates the song data.
function makeSongBrownian() {

	// Start with an empty array, we can `push()` notes onto
	var song = [];

	// Create an array holding the scale note values.
	// Here we use the notes in the Chromatic Scale (all the notes in the octave)
	var scale = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, "rest"];

	// Or we could use the notes in C Major
	/* var scale = sample([60, 62, 64, 65, 67, 69, 71, "rest"]); */
	// Or we could use the notes in C Minor
	/* var scale = sample([60, 62, 63, 65, 67, 68, 70, "rest"]); */


	// First pick a random position in the scale
	var index = floor(random(scale.length));

	// Let's make sixteen notes.
	for (var i = 0; i < 16; i++) {

		// Choose a step size from a list, and step index up/down that amount.
		// Here our possible steps are small.
		index = index + sample([-1, 0, 1]);

		// Or we could use bigger and smaller steps.
		/* index = index + sample([-2, -1, 1, 2]); */

		// We don't want to walk outside the bounds of our array.
		// Use `constrain` to make sure.
		index = constrain(index, 0, scale.length - 1);

		// Create new note, and push it onto the song.
		song.push([
			scale[index],
			sample([1 / 2, 1 / 4, 1 / 4, 1 / 4])
		]);
	}

	// Send our complete song back to the caller.
	return song;
}

// **sample()** recieves and array, selects an item in the array randomly, and returns it
function sample(a) {
	return a[floor(random(a.length))];
}
