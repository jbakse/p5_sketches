// basic template sketch showing how to use the Turtle class
var myTurtle;
var leafImage;

function preload() {
	leafImage = loadImage("assets/leaf_white.png");
}

function setup() {
	createCanvas(640, 640);
	noFill();
	stroke(255);
	background(50);
	noLoop();

	myTurtle = new Turtle();
}



function draw() {
	// move to starting position (without drawing)
	myTurtle.penUp();
	myTurtle.moveBackward(200);
	myTurtle.penDown();

	// star
	for (var i = 0; i < 50; i++) {
		for (var ii = 0; ii < 20; ii++) {
			myTurtle.moveForward(20);
			myTurtle.turnLeft(5);
		}

		myTurtle.turnRight(170);
		myTurtle.image(leafImage, 10, 10);
	}
}
