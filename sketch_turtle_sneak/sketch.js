// basic template sketch showing how to use the Turtle class
var myTurtle;

function setup() {
	createCanvas(640, 640);
	noFill();
	stroke(255);
	background(50);
	noLoop();


}



function draw() {
	// move to starting position (without drawing)

	myTurtle = new Turtle(320, 600);
	var outer, loop, i;

	stroke(255, 255, 255);

	for (outer = 0; outer < 10; outer++) {
		myTurtle.pushState();

		myTurtle.turnLeft(outer * 0.5);
		for (loop = 0; loop < 80; loop++) {

			for (i = 0; i < 30; i++) {
				// strokeWeight(sin(myTurtle.bearingRadians) * 2 + 2);
				myTurtle.moveForward(4 - loop * 0.05);
				myTurtle.turnLeft(-8.025 + i);
			}

			for (i = 0; i < 30; i++) {
				// strokeWeight(sin(myTurtle.bearingRadians) * 2 + 2);
				myTurtle.moveForward(4 - loop * 0.05);
				myTurtle.turnLeft(-8.025 + (29 - i));
			}
		}
		myTurtle.popState();
	}


}

function mouseReleased() {
	saved();
}
