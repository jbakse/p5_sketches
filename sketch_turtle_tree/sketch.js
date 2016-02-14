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
	myTurtle.moveTo(320, 630);
	myTurtle.turnTo(-90);
	myTurtle.penDown();

	// drawBranch(100);

	drawBranch(100);


}


function drawBranch(length) {

	if (length < 10) {
		return;
	}

	// draw this branch
	myTurtle.moveForward(length);

	// left child
	myTurtle.pushState();
	myTurtle.turnLeft(35);
	drawBranch(length * 0.75);
	myTurtle.popState();

	// right child
	myTurtle.pushState();
	myTurtle.turnRight(35);
	drawBranch(length * 0.75);
	myTurtle.popState();

}


function drawBranch2(length) {

	// strokeWeight(length * 0.2);
	if (length < 2) {
		return;
	}

	// draw this branch
	myTurtle.moveForward(length);

	// left child
	// what if we only did this sometimes?
	myTurtle.pushState();
	myTurtle.turnLeft(35 + random(-20, 20));
	drawBranch2(length * random(0.6, 0.9));
	myTurtle.popState();


	// right child
	myTurtle.pushState();
	myTurtle.turnRight(35 + random(-20, 20));
	drawBranch2(length * random(0.6, 0.9));
	myTurtle.popState();


}
