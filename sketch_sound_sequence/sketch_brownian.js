var synth;

function setup() {
	createCanvas(640, 360);
	synth = new MonoSynth();
	synth.playNotes(makeSongBrownian());
}

function makeSongBrownian() {
	var song = [];


  var notes = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71]; //Notes in Chromatic Scale (all the notes in the octave)
  // var notes = [60, 62, 64, 65, 67, 69, 71]; //Notes in C Major
  // var notes = [60, 62, 63, 65, 67, 68, 70]; //Notes in C Minor

  var index = floor(random(notes.length));

	for (var i = 0; i < 16; i++) {
    index = index + sample([-1, 0, 1]); // small steps
    // index = index + sample([-2, -1, 1, 2]); // big steps + small steps
    index = constrain(index, 0, notes.length - 1);

		song.push([
      notes[index],
			sample([1 / 2, 1 / 4, 1 / 4, 1 / 4])
		]);
	}

	return song;
}


function sample(a) {
	return a[floor(random(a.length))];
}
