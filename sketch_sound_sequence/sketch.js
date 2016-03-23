//https://autochords.com/
// https://www.khanacademy.org/humanities/music/music-basics2/notes-rhythm/v/lesson-1-note-values-duration-and-time-signatures0
// https://sourceforge.net/projects/ariamaestosa/?source=typ_redirect
// https://github.com/saebekassebil/teoria

// configure jshint linter
//https://jslinterrors.com/a-leading-decimal-point-can-be-confused-with-a-dot-a
/*jshint -W008 */

var synth, synth2;

var wall = [];

function setup() {
	createCanvas(640, 360);
	synth = new MonoSynth();
	synth2 = new MonoSynth();
	synth2.name = "BassSynth";


	// synth.playNotes(makeSongBasic());
	// synth.playNotes(makeSongBrownian());
	// synth.playNotes(makeSongKeyed(quickMusic.majorScale));
	// synth.playNotes(makeSongKeyed(quickMusic.minorScale));
	// synth.playNotes(makeSongKeyed(quickMusic.phrygianDominateScale));
	// synth.playNotes(makeSongKeyed(quickMusic.minorPentatonicScale));
	// synth.playNotes(makeSongFromPhrase(quickMusic.majorScale, london_bridge));
	// synth.playNotes(makeSongFromPhrase(quickMusic.minorScale, london_bridge));
	// synth.playNotes(makeSongFromPhrase(quickMusic.phrygianDominateScale, london_bridge));
	synth2.playNotes(makeBaseAdvanced());
	synth.playNotes(makeSongAdvanced());

	// for (var i = 0; i < 2; i++) {
	// 	wall[i] = new MonoSynth();
	// 	wall[i].playNotes(makeSongAdvanced());
	// }


}

function makeSongBasic() {
	var song = [];

	for (var i = 0; i < 16; i++) {
		var note = floor(random(48, 60));
		if (random() < .2) {
			note = "rest";
		}
		song.push([
			note,
			sample([1 / 2, 1 / 4, 1 / 4, 1 / 4])
		]);
	}

	return song;
}

function makeSongBrownian() {
	var song = [];
	var note = 48;

	for (var i = 0; i < 32; i++) {
		song.push([
			note,
			sample([1 / 2, 1 / 4, 1 / 4, 1 / 4])
		]);

		note += sample([-2, -1, -1, 0, 1, 1, 2]);
	}

	return song;
}

function makeSongKeyed(key) {
	var song = [];
	var position = 0;

	for (var i = 0; i < 32; i++) {
		song.push([
			quickMusic.getNoteInScale(position, 60 /*C5*/ , key),
			sample([1 / 2, 1 / 4, 1 / 4, 1 / 4])
		]);

		position += sample([-1, -1, -1, 0, 1, 1, 1]);
	}

	return song;
}

function makeSongFromPhrase(key, phrase) {
	var song = [];

	for (var i = 0; i < phrase.length; i++) {
		var position = phrase[i][0];
		var length = phrase[i][1];
		var note = quickMusic.getNoteInScale(position, 60 /*C5*/ , key);
		song.push([note, length]);
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

function makeBaseAdvanced() {
	var phrase = [];
	for (var i = 0; i < 8; i++) {
		phrase.push(
			[
				sample([0 - 14, 4 - 14, 5 - 14]),
				1
			]
		);
	}

	phrase[phrase.length - 1][0] = -14;
	console.log("phrase", phrase);
	return makeSongFromPhrase(quickMusic.majorScale, phrase);

}

function makeSongAdvanced() {


	var fullPhrase = [];
	var introPhrase = makePhrase();
	var middlePhrase = makePhrase();
	var alternatePhrase = shiftPhrase(middlePhrase, -2);
	var concludingPhrase = clonePhrase(middlePhrase);
	concludingPhrase[concludingPhrase.length - 1][0] = 0;

	fullPhrase = fullPhrase.concat(
		introPhrase,
		middlePhrase,
		alternatePhrase,
		middlePhrase
	);


	fullPhrase = fullPhrase.concat(
		introPhrase,
		middlePhrase,
		alternatePhrase,
		concludingPhrase
	);



	return makeSongFromPhrase(quickMusic.majorScale, fullPhrase);


}

function shiftPhrase(phrase, amount) {
	var copy = clonePhrase(phrase);
	for (var i = 0; i < copy.length; i++) {
		if (copy[i][0] !== "rest") {
			copy[i][0] += amount;
		}
	}
	return copy;
}

function clonePhrase(phrase) {
	var clone = [];
	for (var i = 0; i < phrase.length; i++) {
		clone.push(phrase[i].slice(0));
	}
	return clone;
}

function makePhrase() {
	var phrase = [];

	var position = floor(random(7));
	var lengthLeft = 1;
	while (lengthLeft > 0) {
		var length = sample([1 / 2, 1 / 4, 1 / 4, 1 / 4, 1 / 8, 1 / 8]);


		if (length > lengthLeft) {
			length = lengthLeft;
		}
		position += sample([-2, -1, -1, -1, 0, 1, 1, 1, 2]);
		if (random() < .2) {
			phrase.push(["rest", length]);
		} else {
			phrase.push([position, length]);
		}
		lengthLeft -= length;
	}

	return phrase;
}
