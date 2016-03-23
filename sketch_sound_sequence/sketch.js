// https://www.khanacademy.org/humanities/music/music-basics2/notes-rhythm/v/lesson-1-note-values-duration-and-time-signatures0
// https://sourceforge.net/projects/ariamaestosa/?source=typ_redirect
// https://github.com/saebekassebil/teoria

// configure jshint linter
//https://jslinterrors.com/a-leading-decimal-point-can-be-confused-with-a-dot-a
/*jshint -W008 */

var synth;

function setup() {
	createCanvas(640, 360);

	synth = new MonoSynth();

	synth.playNotes(makeSongBasic());
}

function makeSongBasic() {
	var song = [];
	for (var i = 0; i < 16; i++) {
		song.push([
			random(48, 50),
			sample([1 / 2, 1 / 4, 1 / 4, 1 / 4])
		]);
	}
	return song;
}

function draw() {
	// if (frameCount % 60 === 0) {
	// 	synth.playNote(random(12) + 60, 1);
	// }
}

function sample(a) {
	return a[floor(random(a.length))];
}

function randomSong() {

	var measures = [];

	for (var m = 0; m < 4; m++) {
		measures[m] = [];
		var lengthLeft = 1;

		while (lengthLeft > 0) {
			var note = Math.floor(random(7));
			if (random() < 0.25) {
				note = "rest";
			}
			var thisLength = pick([1 / 2, 1 / 2, 1 / 4, 1 / 4, 1 / 4]);
			if (thisLength > lengthLeft) {
				thisLength = lengthLeft;
			}
			measures[m].push([
				note,
				thisLength
			]);
			lengthLeft -= thisLength;
		}
	}

	var song = [];
	for (m = 0; m < 8; m++) {
		song = song.concat(pick(measures));
	}

	return song;
}
