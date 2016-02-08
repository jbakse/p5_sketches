// just draws a circle

function setup() {
	// create a place to draw
	createCanvas(640, 360);
	noLoop();
}


function draw() {
	// clear the background
	background(0, 0, 0);

	// set drawing styles
	stroke(255, 0, 0);
	fill(255, 255, 255);
	strokeWeight(10);

	// draw a circle
	ellipse(random(width), 180, 100, 100);
	ellipse(10, 10, 10, 10);
}

function mouseClicked() {
	save();
}
