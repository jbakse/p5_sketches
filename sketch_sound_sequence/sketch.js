// makes a terrible noise

var base = 56; // A3
var minorKey = [0, 2, 3, 5, 7, 8, 10]; // Minor

var frequency = 220;

function setup() {
	createCanvas(640, 360);

	carrier = new p5.Oscillator('sine');
	carrier.amp(1); // set amplitude
	carrier.freq(220); // set frequency
	carrier.start(); // start oscillating


	myPhrase = new p5.Phrase('rndo', rndo, [
		[4, 2], 2, 3, 2, 3, 2, 3, 2
	]);
	myPart = new p5.Part();
	myPart.addPhrase(myPhrase);
	myPart.setBPM(60);
	// myPart.start();
	myPart.loop();
}

function draw() {
	// frequency += random(-10, 10); // vary frequency using brownian motion
	// carrier.freq(frequency);
}

function rndo(time, value) {
	var f = midiToFreq(base + pick(minorKey));
	carrier.freq(f, 0.015, time);
}

function pick(a) {
	return a[floor(random(a.length))];
}
