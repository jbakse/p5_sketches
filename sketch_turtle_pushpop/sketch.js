// basic template sketch showing how to use the Turtle class
var myTurtle;

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


	// spiral
	for (var i = 0; i < 500; i++) {
		myTurtle.moveForward(5 + i * 0.1);
		myTurtle.turnLeft(10);
		drawLeaf();
	}

}

function drawLeaf() {
	myTurtle.pushState();

	myTurtle.turnLeft(45);

	for (i = 0; i < 5; i++) {
		myTurtle.moveForward(3);
		myTurtle.turnLeft(18);
	}
	myTurtle.turnLeft(90);
	for (i = 0; i < 5; i++) {
		myTurtle.moveForward(3);
		myTurtle.turnLeft(18);
	}

	myTurtle.popState();
}
