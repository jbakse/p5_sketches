// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API
// https://autochords.com/
// https://www.khanacademy.org/humanities/music/music-basics2/notes-rhythm/v/lesson-1-note-values-duration-and-time-signatures0
// https://sourceforge.net/projects/ariamaestosa/?source=typ_redirect
// https://github.com/saebekassebil/teoria
// http://www.ocenaudio.com/
// https://en.wikipedia.org/wiki/Scale_(music)
// https://en.wikipedia.org/wiki/Degree_(music)



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
			sample([60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, "rest"]), //Notes in Chromatic Scale (all the notes in the octave)
			// sample([60, 62, 64, 65, 67, 69, 71, "rest"]), //Notes in C Major
			// sample([60, 62, 63, 65, 67, 68, 70, "rest"]), //Notes in C Minor
			sample([1 / 2, 1 / 4, 1 / 4, 1 / 4])
		]);
	}

	return song;
}


function sample(a) {
	return a[floor(random(a.length))];
}
