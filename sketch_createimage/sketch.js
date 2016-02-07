// makes an image pixel by pixel

var myImage;

function setup() {
	// create a place to draw
	createCanvas(640, 640);
	myImage = createImage(640, 640);
	// noLoop();
}


function draw() {
	// clear the background
	background(0, 0, 0);

	// begin editing pixel data directly
	myImage.loadPixels();

	for (y = 0; y < 640; y++) {
		for (x = 0; x < 640; x++) {
			var pixelIndex = (y * 640 + x) * 4;


			// DEMO 1: Simple Gradients

			myImage.pixels[pixelIndex] = (x / 640) * 255;
			myImage.pixels[pixelIndex + 1] = (y / 640) * 255;
			myImage.pixels[pixelIndex + 2] = random(255);


			// DEMO 2: Sin Waves
			// myImage.pixels[pixelIndex] = (sin(x / 640.0 * PI * 2) + 1) * 128;
			// myImage.pixels[pixelIndex + 1] = ((sin(x / 640.0 * PI * 2 * 10) + 1) + (sin(
			// 	y / 640.0 * PI * 2 * 8) + 1)) * 64;
			// myImage.pixels[pixelIndex + 2] = 0;



			myImage.pixels[pixelIndex + 3] = 255;
		}
	}

	//update image with modified pixel data
	myImage.updatePixels();

	image(myImage, 0, 0);
}

// download the image
function mouseReleased() {
	console.log("save");
	save();
}
