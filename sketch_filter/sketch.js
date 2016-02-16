// assults your eyes

var testImage;

function preload() {
	testImage = loadImage("assets/earth.jpg");
	noLoop();
}

function setup() {
	// create a place to draw
	createCanvas(1024, 1024);

	// load up the pixel[] array so we can read colors out of it later

}


function draw() {
	// clear the background
	background(0, 0, 0);

	// set drawing styles
	stroke(255, 0, 0);
	fill(255, 255, 255);



	stroke(0, 200, 100, 80);

	testImage.loadPixels();
	// loop over every x,y pixel coordinate in the image
	for (x = 1024; x < 2048; x++) {
		console.log(x);
		for (y = 0; y < 2048; y++) {
			var redIn = testImage.pixels[(y * 2048 + x) * 4 + 0];
			var greenIn = testImage.pixels[(y * 2048 + x) * 4 + 1];
			var blueIn = testImage.pixels[(y * 2048 + x) * 4 + 2];

			var redOut, blueOut, greenOut;

			//////////////////
			/// Demo 1: swap channels

			redOut = blueIn;
			blueOut = greenIn;
			greenOut = redIn;


			//////////////////
			// Demo 2: pick output from randomly offset input sample
			// creats scatter effect
			// because we are modifying the image as we work, we will sometimes
			// sample a pixel we've already changed, it would be better
			// to read from one image and write out to a different one

			// // choose random position for the sample
			// var x2 = x + floor(random(-50, 51));
			// var y2 = y + floor(random(-50, 51));
			//
			// // make sure we don't go outside the image
			// x2 = clamp(x2, 0, 2047);
			// y2 = clamp(y2, 0, 2047);
			//
			// // use the color from the random position
			// redOut = testImage.pixels[(y2 * 2048 + x2) * 4 + 0];
			// greenOut = testImage.pixels[(y2 * 2048 + x2) * 4 + 1];
			// blueOut = testImage.pixels[(y2 * 2048 + x2) * 4 + 2];


			testImage.pixels[(y * 2048 + x) * 4 + 0] = redOut;
			testImage.pixels[(y * 2048 + x) * 4 + 1] = greenOut;
			testImage.pixels[(y * 2048 + x) * 4 + 2] = blueOut;
		}
	}
	testImage.updatePixels();

	image(testImage, 0, 0, 1024, 1024);


}

function clamp(v, low, high) {
	if (v < low) return low;
	if (v > high) return high;
	return v;

	//	v = max(v, low);
	//	v = min(v, high);
	//	return v;
}


// download the image
function mouseReleased() {
	console.log("save");
	save();
}
