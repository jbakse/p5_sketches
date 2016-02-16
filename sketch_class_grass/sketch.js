// just draws a circle
var MAX_HEIGHT = 10;
var MAX_LEAN = 3;
var heightSlider;

var inputImage;

function preload() {
	inputImage = loadImage("assets/tron.jpg");

	heightSlider = createSlider(0, 100, 50);
	heightSlider.changed(draw);
}

function setup() {
	// create a place to draw
	createCanvas(640, 320);
	noLoop();
}


function draw() {
	// clear the background
	background(0, 0, 0);

	inputImage.loadPixels();

	for (y = 0; y < 320; y++) {
		for (x = 0; x < 640; x++) {
			var pixelIndex = (y * 640 + x) * 4;
			var red = inputImage.pixels[pixelIndex];
			if (random(255) < red) { // compare to image to decide to draw grass
				if (random(100) > 95) {
					drawGrass(x, y);
				}
			}
		}
	}


}

function drawGrass(x, y) {
	stroke(0, 255, 0);
	var grassHeight = random(heightSlider.value());
	var grassLean = random(-MAX_LEAN, MAX_LEAN);

	line(x, y, x + grassLean, y - grassHeight);
}
