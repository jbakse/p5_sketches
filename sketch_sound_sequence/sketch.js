// https://www.khanacademy.org/humanities/music/music-basics2/notes-rhythm/v/lesson-1-note-values-duration-and-time-signatures0

var C3 = 48;

var majorScale = [0, 2, 4, 5, 7, 9, 11];
var minorScale = [0, 2, 3, 5, 7, 8, 10]; // Minor

var london_bridge = [
	[4, 3 / 8],
	[5, 1 / 8],
	[4, 1 / 4],
	[3, 1 / 4],

	[2, 1 / 4],
	[3, 1 / 4],
	[4, 1 / 2],

	[1, 1 / 4],
	[2, 1 / 4],
	[3, 1 / 2],

	[2, 1 / 4],
	[3, 1 / 4],
	[4, 1 / 2],

	[4, 3 / 8],
	[5, 1 / 8],
	[4, 1 / 4],
	[3, 1 / 4],

	[2, 1 / 4],
	[3, 1 / 4],
	[4, 1 / 2],

	[1, 1 / 2],
	[4, 1 / 2],

	[2, 1 / 4],
	[0, 3 / 4]
];

var mary_had_a_little_lamb = [
	[2, 3 / 8],
	[1, 1 / 8],
	[0, 1 / 4],
	[1, 1 / 4],

	[2, 1 / 4],
	[2, 1 / 4],
	[2, 1 / 2],

	[1, 1 / 4],
	[1, 1 / 4],
	[1, 1 / 2],

	[2, 1 / 4],
	[4, 1 / 4],
	[4, 1 / 2],

	[2, 3 / 8],
	[1, 1 / 8],
	[0, 1 / 4],
	[1, 1 / 4],

	[2, 1 / 4],
	[2, 1 / 4],
	[2, 1 / 4],
	[2, 1 / 4],

	[1, 1 / 4],
	[1, 1 / 4],
	[2, 1 / 4],
	[1, 1 / 4],

	[0, 1]
];



function randomSong() {

	var measures = [];

	for (var m = 0; m < 4; m++) {
		measures[m] = [];
		var lengthLeft = 1;

		while (lengthLeft > 0) {
			var note = Math.floor(random(7));
			if (random() < .25) {
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

var tonic = C3;
var activeScale = majorScale;



var frequency = 220;

function setup() {

	createCanvas(640, 360);

	envelope = new p5.Env();
	envelope.setADSR(0.005, 0.1, 0.5, 0.1);
	envelope.setRange(1.0, 0.0);

	carrier = new p5.Oscillator('sine');
	carrier.amp(0); // set amplitude
	carrier.freq(220); // set frequency
	carrier.start(); // start oscillating


	var song = randomSong();

	// var t = 0;
	// for (i = 0; i < song.length; i++) {
	//
	// 	setTimeout(playNote, t * 1000,
	// 		song[i][0],
	// 		song[i][1]);
	//
	// 	t += song[i][1];
	// }

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "assets/mario.mid", true);
	xhr.responseType = "arraybuffer";
	xhr.addEventListener("load", readMIDI);
	xhr.send();
	// envelope.play(carrier, 0, .1);
}

function readMIDI(e) {
	var xhr = e.currentTarget;
	if (xhr.status !== 200) {
		console.error("Problem Loading MIDI");
		return;
	}
	console.log("READING MIDI", xhr.response);

	var midiFile = new MIDIFile(xhr.response);
	console.log("tracksCount", midiFile.header.getTracksCount());
	var events = midiFile.getMidiEvents();
	console.log("events", events);
	for (i = 0; i < 10000; i++) {
		var e = events[i];
		if (e.subtype !== 9) continue;
		console.log("event", e, e.track, e.channel, e.type, e.subtype);

		setTimeout(playMIDI, e.playTime,
			e.param1,
			0.1);


	}
}

function midiToName(number) {
	names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
	return names[number % 12] + (Math.floor(number / 12) - 1);
}

function playNote(note, length) {
	if (note === "rest") return;

	var noteFreq = midiToFreq(tonic + activeScale[note]);
	var noteName = midiToName(tonic + activeScale[note]);

	console.log("play note", noteName, length);

	carrier.freq(noteFreq);
	envelope.play(carrier, 0, length - 0.11);
}

function playMIDI(note, length) {

	var noteFreq = midiToFreq(note);

	console.log("play midi", note, length);

	carrier.freq(noteFreq);
	envelope.play(carrier, 0, length - 0.11);
}

function draw() {
	// frequency += random(-10, 10); // vary frequency using brownian motion
	// carrier.freq(frequency);
}



function pick(a) {
	return a[floor(random(a.length))];
}
