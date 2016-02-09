// just draws a circle


var pointA;
var pointC;

function setup() {
	// create a place to draw
	createCanvas(640, 640);

	pointA = {
		x: 320,
		y: 320
	};

	pointC = {
		x: 320,
		y: 320
	};

}


function draw() {
	// clear the background
	background(0, 0, 0);

	pointB = {
		x: mouseX,
		y: mouseY
	};

	var pointCT = findJoint(pointA, pointB, 100, 100, "down");
	pointC.x = lerp(pointC.x, pointCT.x, 0.5);
	pointC.y = lerp(pointC.y, pointCT.y, 0.5);


	fill(255, 255, 255, 50);
	ellipse(pointA.x, pointA.y, 50, 50);
	ellipse(pointB.x, pointB.y, 50, 50);
	ellipse(pointC.x, pointC.y, 30, 30);

	stroke(255);
	strokeWeight(5);
	// line(pointA.x, pointA.y, pointC.x, pointC.y);
	// line(pointC.x, pointC.y, pointB.x, pointB.y);

	noFill();
	stroke(255, 0, 0);
	bezier(pointA.x, pointA.y, pointC.x, pointC.y, pointC.x, pointC.y, pointB.x,
		pointB.y);

}

function findJoint(pointA, pointB, sideAC, sideBC, direction) {

	if (!direction) {
		direction = "positive";
	}

	var dX = pointB.x - pointA.x;
	var dY = pointB.y - pointA.y;
	var d = dist(pointA.x, pointA.y, pointB.x, pointB.y); // distance between A and B

	if (sideAC + sideBC < d) { // circles too far apart
		sideBC = d - sideAC; // stretch BC
	}

	if (abs(sideAC - sideBC) > d) // circle inside circle
	{
		sideBC = sideAC - d; // strech BC
	}


	var pointR = {}; // the point on the line AB that intersects the raducial line (the line between the circle intersections)

	var dAR = ((sideAC * sideAC) - (sideBC * sideBC) + (d * d)) / (d * 2.0);

	pointR.x = pointA.x + (dX * dAR / d);
	pointR.y = pointA.y + (dY * dAR / d);


	// dRI distance from pointR to either of the intersections
	dRI = sqrt((sideAC * sideAC) - (dAR * dAR));
	if (isNaN(dRI)) {
		dRI = 0;
	}
	var offsetX = -dY * (dRI / d);
	var offsetY = dX * (dRI / d);

	var intersection1 = {
		x: pointR.x - offsetX,
		y: pointR.y - offsetY
	};

	var intersection2 = {
		x: pointR.x + offsetX,
		y: pointR.y + offsetY
	};


	if (direction === "one") {
		return intersection1;
	} else if (direction === "two") {
		return intersection2;
	} else if (direction === "down") {
		return intersection1.y > intersection2.y ? intersection1 : intersection2;
	} else if (direction === "up") {
		return intersection1.y < intersection2.y ? intersection1 : intersection2;
	}


	return intersection1;
}
