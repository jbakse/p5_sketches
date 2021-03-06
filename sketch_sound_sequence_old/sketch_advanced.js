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

var wall = [];

var soundRecorder, soundFile;

function setup() {
    createCanvas(640, 360);
    synth = new MonoSynth();
    synth2 = new MonoSynth();
    // synth2.name = "BassSynth";


    // this.oscillator.oscillator.frequency.setValueAtTime(122, 1);
    // this.oscillator.oscillator.frequency.setValueAtTime(111, 2);

    // synth.playNotes(makeSongTest());
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


    // soundRecorder = new p5.SoundRecorder();
    // soundFile = new p5.SoundFile();
    // soundRecorder.record(soundFile);
    // setTimeout(function() {
    // 	console.log("play back");
    // 	soundRecorder.stop();
    // 	soundFile.play();
    // 	save(soundFile, "output.wav");
    // }, 8000);
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





function draw() {
    // if (frameCount % 30 === 0) {
    // 	synth.playNote(random(12) + 60, .5);
    // }
}

function makeSongTest() {
    song = [];
    song.push([60, 1 / 2]);
    song.push([60, 1 / 2]);
    song.push([60, 1 / 2]);
    song.push([60, 1 / 2]);
    song.push([80, 1 / 2]);
    return song;
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

    phrase[phrase.length - 1][0] = -7;
    // console.log("phrase", phrase);
    return makeSongFromPhrase(quickMusic.phrygianDominateScale, phrase);

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



    return makeSongFromPhrase(quickMusic.phrygianDominateScale, fullPhrase);


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
        if (random() < 0.2) {
            phrase.push(["rest", length]);
        } else {
            phrase.push([position, length]);
        }
        lengthLeft -= length;
    }

    return phrase;
}
