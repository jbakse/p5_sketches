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
	myTurtle.penUp();
	myTurtle.moveBackward(200);
	myTurtle.penDown();

	// star
	for (var i = 0; i < 50; i++) {
		myTurtle.moveForward(400);
		myTurtle.turnRight(170);
	}

	// sprial
	// for (var i = 0; i < 500; i++) {
	// 	myTurtle.moveForward(i * 0.1);
	// 	myTurtle.turnRight(10);
	// }

	//house
	// myTurtle.turnLeft(90); // left wall
	// myTurtle.moveForward(100);
	// myTurtle.turnLeft(90); // begin roof
	// myTurtle.moveForward(20);
	// myTurtle.turnRight(135);
	// myTurtle.moveForward(100);
	// myTurtle.turnRight(90);
	// myTurtle.moveForward(100);
	// myTurtle.turnRight(135);
	// myTurtle.moveForward(20);
	// myTurtle.turnLeft(90); // right wall
	// myTurtle.moveForward(100);

}
