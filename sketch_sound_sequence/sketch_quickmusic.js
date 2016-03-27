var synth;

function setup() {
	createCanvas(640, 360);
	synth = new MonoSynth();
	synth.playNotes(makeSongQuickMusic());
}

function makeSongQuickMusic() {
	var song = [];


  var positions = [0,1,2,3,4,5,6]; //All positions in a pentatonic scale

  var index = floor(random(positions.length));

	for (var i = 0; i < 16; i++) {
    index = index + sample([-1, 0, 1]); // small steps
    index = constrain(index, 0, positions.length - 1);

		song.push([
      positions[index],
			sample([1 / 2, 1 / 4, 1 / 4, 1 / 4])
		]);
	}

  song = imposePhrase(song, quickMusic.nameToMIDI("C", 3), quickMusic.minorScale);

	return song;
}


function sample(a) {
	return a[floor(random(a.length))];
}
