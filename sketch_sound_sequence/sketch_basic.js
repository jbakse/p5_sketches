//https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
//https://autochords.com/
// https://www.khanacademy.org/humanities/music/music-basics2/notes-rhythm/v/lesson-1-note-values-duration-and-time-signatures0
// https://sourceforge.net/projects/ariamaestosa/?source=typ_redirect
// https://github.com/saebekassebil/teoria
// http://www.ocenaudio.com/
//
//
// configure jshint linter
//https://jslinterrors.com/a-leading-decimal-point-can-be-confused-with-a-dot-a
/*jshint -W008 */

var synth, synth2;

function setup() {
	createCanvas(640, 360);
	synth = new MonoSynth();
	synth.playNotes(makeSongBasic2());
	synth2.playNotes(makeSongBasic2());
}

function makeSongBasic() {
	var song = [];

	for (var i = 0; i < 16; i++) {
		var note = floor(random(60, 72));
		if (random() < .2) {
			note = "rest";
		}
		var length = sample([1 / 2, 1 / 4, 1 / 4, 1 / 4]);
		song.push([
			note,
			length
		]);
	}

	return song;
}


function makeSongBasic2() {
	var song = [];

	for (var i = 0; i < 16; i++) {
		song.push([
			// sample([60, 62, 64, 65, 67, 69, 71, "rest"]), //Notes in C Major
			sample([60, 62, 63, 65, 67, 68, 70, "rest"]), //Notes in C Minor
			sample([1 / 2, 1 / 4, 1 / 4, 1 / 4])
		]);
	}

	return song;
}


function sample(a) {
	return a[floor(random(a.length))];
}
