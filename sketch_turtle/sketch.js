var myTurtle;
var frame = 0;

function setup() {
	// create a place to draw
	createCanvas(640, 360);
	myTurtle = new Turtle();
	background(50);
	colorMode(HSB, 255);
	noLoop();
}


//intersting things to note
// relative vs absolute positions
// angles
// relative vs absolute angle leads to nice complex curves turnLeft(i) vs turnTo(i)

function draw() {
	// clear the background
	// background(0, 0, 0);
	noFill();
	stroke(frameCount % 255, 255, 255);

	myTurtle.penUp();
	myTurtle.moveTo(320, 360);
	myTurtle.penDown();
	myTurtle.turnLeft(90);
	drawBranch(100);


}

function drawBranch(length) {
	if (length < 10) {
		return;
	}

	myTurtle.moveForward(length);

	myTurtle.pushState();
	myTurtle.turnLeft(random(30, 60));
	drawBranch(length * random(0.6, 0.8));
	myTurtle.popState();

	myTurtle.pushState();
	myTurtle.turnRight(random(30, 60));
	drawBranch(length * random(0.6, 0.8));
	myTurtle.popState();

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

function interesting() {
	myTurtle.penUp();
	myTurtle.moveTo(320, 180);
	myTurtle.turnTo(0);
	myTurtle.penDown();

	var t = random(-10, 10);
	var t2 = random(-0.5, 0.5);
	var d = random(-5, 5);
	for (var i = 0; i < 100; i++) {
		stroke(255, 0, 0, dist(320, 180, myTurtle.x, myTurtle.y) * 0.5);
		myTurtle.moveForward(d);
		myTurtle.turnRight(t + i * t2);
	}
}



// Turtle
// Basic turtle graphics implementation:
// https://en.wikipedia.org/wiki/Turtle_graphics
// For more info on Javascript OOP:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript
//
// The turtle's coordinate system uses pixels for distance and degrees for rotations
// 0 degrees is straight right (east); positive degrees are counter-clockwise

// Turtle constructor
// takes optional x, y starting coordinates (default is center of sketch)
function Turtle(x, y) {
	// assign default values to x and y if they were not passed
	if (typeof x === "undefined") {
		x = width * 0.5;
	}
	if (typeof y === "undefined") {
		y = height * 0.5;
	}
	this.x = x;
	this.y = y;
	this.bearing = 0;
	this.isPenDown = true;
	this._stateStack = [];
}

// moveTo instantly transports the turtle to the provided x, y location, drawing a line if pen is down
Turtle.prototype.moveTo = function (newX, newY) {
	if (this.isPenDown) {
		line(this.x, this.y, newX, newY);
	}
	this.x = newX;
	this.y = newY;
};

// moveForward moves the turtle along its current bearing, drawing a line if pen is down
Turtle.prototype.moveForward = function (distance) {
	var newX = this.x + cos(this.bearing) * distance;
	var newY = this.y + sin(this.bearing) * distance;
	this.moveTo(newX, newY);
};

// moveBackward moves the turtle backward from its current bearing, drawing a line if pen is down
Turtle.prototype.moveBackward = function (distance) {
	this.moveForward(-distance);
};

// turnTo changes the turtle's bearing to the provided angle in degrees
Turtle.prototype.turnTo = function (positionDegrees) {
	this.bearing = radians(positionDegrees);
};

// turnRight rotates the turtle's bearing clockwise by the provided angle in degrees
Turtle.prototype.turnRight = function (amountDegrees) {
	this.bearing += radians(amountDegrees);
};

// turnRight rotates the turtle's bearing counter-clockwise by the provided angle in degrees
Turtle.prototype.turnLeft = function (amountDegrees) {
	this.bearing -= radians(amountDegrees);
};

// penUp tells the turtle to move without drawing
Turtle.prototype.penUp = function () {
	this.isPenDown = false;
};

// penDown tells the turtle to draw a line when it moves
Turtle.prototype.penDown = function () {
	this.isPenDown = true;
};

// pushState records the turtle's current state (position, bearing, etc.) to a stack so that changes can be undone easily
Turtle.prototype.pushState = function () {
	this._stateStack.push({
		x: this.x,
		y: this.y,
		bearing: this.bearing,
		isPenDown: this.isPenDown
	});
};

// popState restores the turtle's state to the top recorded state on the stack
Turtle.prototype.popState = function () {
	if (this._stateStack.length === 0) {
		console.error(
			"Turtle: No states left on stack. Make sure your calls to .pushState and .popState are ballanced."
		);
		return;
	}
	var state = this._stateStack.pop();
	this.x = state.x;
	this.y = state.y;
	this.bearing = state.bearing;
	this.isPenDown = state.isPenDown;
};
