// makes a terrible noise


var fft;

var collect_bins = 1024;
var smoothing = .90;
var show_bins = 64;
var wave_scale = 1;



function preload() {
	sound = loadSound('assets/FurElise.ogg');
	fft = new p5.FFT(smoothing, collect_bins);
}

function setup() {
	createCanvas(512, 512);

	sound.loop();
}

function draw() {
	// background(50);

	// find the frequencies in the sound playing
	var spectrum = fft.analyze();

	fill(50);
	rect(0, 0, 512, 256);
	// show the first bins
	noStroke();
	fill(255);
	for (i = 0; i < show_bins; i++) {
		fill(spectrum[i]);
		rect(i * 512 / show_bins, 256 - spectrum[i] * wave_scale, 5, -5);
	}

	// find the peak value/bin among the shown bins
	var maxIndex = 0;
	var maxValue = spectrum[0];
	for (i = 0; i < show_bins; i++) {
		if (spectrum[i] > maxValue) {
			maxValue = spectrum[i];
			maxIndex = i;
		}
	}

	// draw a red square showing the peak
	fill(255, 0, 0);
	rect(maxIndex * 512 / show_bins, 256, 5, -5);


	// draw score
	for (i = 0; i < show_bins; i++) {
		fill(spectrum[i]);
		rect(frameCount / 2, 512 - i * 4, 5, 5);

	}
}
