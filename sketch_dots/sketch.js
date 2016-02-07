// assults your eyes

var testImage;

function preload() {
	testImage = loadImage("assets/3_blur.png");
	noLoop();
}

function setup() {
	// create a place to draw
	createCanvas(640, 640);

	// load up the pixel[] array so we can read colors out of it later
	testImage.loadPixels();
}


function draw() {
	// clear the background
	background(0, 0, 0);

	// image(testImage, 0, 0);

	// loop over every x,y pixel coordinate in the image
	for (x = 0; x < 640; x += 10) {
		for (y = 0; y < 640; y += 10) {
			// find the red value of the pixel at x, y in the .pixels array
			// see: http://p5js.org/reference/#/p5/pixels[]
			// we don't need to worry about screen pixel density here, because we are not reading from the screen
			var pixelRed = testImage.pixels[(y * 640 + x) * 4];
			drawDot(x, y, pixelRed);
		}
	}
}

function drawDot(x, y, sampleColor) {

	noStroke();

	// choose how colors are combined: see http://p5js.org/reference/#/p5/blendMode
	blendMode(ADD);

	// pick the color to draw in
	var r = random();
	if (r < 0.33) {
		fill(100, 0, 0);
	} else if (r < 0.66) {
		fill(0, 100, 0);
	} else {
		fill(0, 0, 100);
	}


	x = x + random(-10, 10);
	y = y + random(-10, 10);

	// choose radius based on sample color
	var radius = sampleColor / 255 * 30;

	// draw it
	ellipse(x, y, radius, radius);
}

// download the image
function mouseReleased() {
	save();
}
