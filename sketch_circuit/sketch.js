// just draws a circle
var COLS = 50;
var ROWS = 100;
var WORMS = 100;
var COL_WIDTH = 10;
var ROW_HEIGHT = 10;

var grid = makeMultiArray(COLS, ROWS);
var worms = [];


function saveIt(a, b, c) {
	console.log(a, b, c);
}

function setup() {
	// create a place to draw
	createCanvas(500, 1000);
	fill(255);
	stroke(255);
	background(0, 0, 0);


	//noLoop();

	for (var col = 0; col < COLS; col++) {
		grid[col][0] = "BLOCKED";
		grid[col][ROWS - 1] = "BLOCKED";
	}
	for (var row = 0; row < ROWS; row++) {
		grid[0][row] = "BLOCKED";
		grid[COLS - 1][row] = "BLOCKED";
	}

	for (var i = 0; i < WORMS; i++) {
		worms.push(new WireWorm(
			new Point(
				floor(random(1, COLS - 2)),
				max(
					floor(random(1, ROWS - 2)),
					floor(random(1, ROWS - 2)),
					floor(random(1, ROWS - 2))
				)
			)
		));


	}

	for (row = 10; row < 20; row++) {
		for (col = 10; col < 20; col++) {
			worms.push(new WireWorm(
				new Point(col, row)
			));
		}
	}


	for (row = 30; row < 35; row++) {
		for (col = 20; col < 30; col++) {
			worms.push(new WireWormDiagonal(
				new Point(col, row)
			));
		}
	}

}

function draw() {
	// background(0, 0, 0);



	// for (var i = 0; i < 10000; i++) {
	for (var w = 0; w < worms.length; w++) {
		worms[w].step();
	}

	// saveCanvas("output" + frameCount, "jpg");
	// }

	// noStroke();
	// fill(255, 0, 0, 100);
	//
	// for (row = 0; row < ROWS; row++) {
	// 	for (col = 0; col < COLS; col++) {
	// 		if (grid[col][row] === "BLOCKED") {
	// 			rect(col * 10, row * 10, 10, 10);
	// 		}
	// 	}
	// }
}


function WireWorm(location) {
	this.location = location;
	this.direction = "N";
	this.dead = false;

	this.drawStart();



	grid[this.location.x][this.location.y] = "BLOCKED";
}



WireWorm.prototype.step = function () {
	if (this.dead) {
		return;
	}

	var nextDirection = this.pickDirection();
	if (!nextDirection) {
		this.drawEnd();
		this.dead = true;
		return;
	}
	nextLocation = getAdjacentCell(this.location, nextDirection);
	this.drawLine(nextLocation);

	this.direction = nextDirection;
	this.location = nextLocation;
	grid[this.location.x][this.location.y] = "BLOCKED";


};

WireWorm.prototype.pickDirection = function () {
	var cruiseDirection = this.pickCruiseDirection();
	var cruiseLocation = getAdjacentCell(this.location, cruiseDirection);
	if (grid[cruiseLocation.x][cruiseLocation.y] === "BLOCKED") {
		return this.pickEscapeDirection();
	}
	return cruiseDirection;
};



WireWorm.prototype.pickCruiseDirection = function () {
	return this.direction;
	// return shuffle(["N", "E", "S", "W"])[0];
};

WireWorm.prototype.pickEscapeDirection = function () {
	var escapeOptions = ["N", "E", "S", "W"];
	for (var i = 0; i < escapeOptions.length; i++) {
		var escapeLocation = getAdjacentCell(this.location, escapeOptions[i]);
		if (grid[escapeLocation.x][escapeLocation.y] !== "BLOCKED") {
			return escapeOptions[i];
		}
	}
	return false;
};

WireWorm.prototype.drawStart = function () {
	ellipse(this.location.x * COL_WIDTH + COL_WIDTH * 0.5 + 0.5,
		this.location.y * ROW_HEIGHT + ROW_HEIGHT * 0.5 + 0.5,
		COL_WIDTH * 0.5,
		COL_WIDTH * 0.5);
};

WireWorm.prototype.drawEnd = function () {
	ellipse(this.location.x * COL_WIDTH + COL_WIDTH * 0.5 + 0.5,
		this.location.y * ROW_HEIGHT + ROW_HEIGHT * 0.5 + 0.5,
		COL_WIDTH * 0.5,
		COL_WIDTH * 0.5);
};

WireWorm.prototype.drawLine = function (nextLocation) {
	line(this.location.x * COL_WIDTH + COL_WIDTH * 0.5,
		this.location.y * ROW_HEIGHT + ROW_HEIGHT * 0.5,
		nextLocation.x * COL_WIDTH + COL_WIDTH * 0.5,
		nextLocation.y * ROW_HEIGHT + ROW_HEIGHT * 0.5);
};



function WireWormDiagonal(location) {
	WireWorm.call(this, location);
}
WireWormDiagonal.prototype = Object.create(WireWorm.prototype);


WireWormDiagonal.prototype.pickCruiseDirection = function () {
	// return this.direction;
	if (random() > 0.5) {
		return this.direction;
	}
	return shuffle(["N", "N", "N", "N", "N", "SW", "SE"])[0];
	// return shuffle(["N", "NE", "E", "SE", "S", "SW", "W", "NW"])[0];
};

WireWormDiagonal.prototype.pickEscapeDirection = function () {
	var escapeOptions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
	for (var i = 0; i < escapeOptions.length; i++) {
		var escapeLocation = getAdjacentCell(this.location, escapeOptions[i]);
		if (grid[escapeLocation.x][escapeLocation.y] !== "BLOCKED") {
			return escapeOptions[i];
		}
	}
	return false;
};

function Point(x, y) {
	this.x = x || 0;
	this.y = y || 0;
}



function getAdjacentCell(location, direction) {
	if (direction === "N") {
		return new Point(location.x, location.y - 1);
	}
	else if (direction === "E") {
		return new Point(location.x + 1, location.y);
	}
	else if (direction === "S") {
		return new Point(location.x, location.y + 1);
	}
	else if (direction === "W") {
		return new Point(location.x - 1, location.y);
	}
	else if (direction === "NE") {
		return new Point(location.x + 1, location.y - 1);
	}
	else if (direction === "SE") {
		return new Point(location.x + 1, location.y + 1);
	}
	else if (direction === "SW") {
		return new Point(location.x - 1, location.y + 1);
	}
	else if (direction === "NW") {
		return new Point(location.x - 1, location.y - 1);
	}
}


function makeMultiArray(columns, rows) {
	var a = [];
	for (var col = 0; col < columns; col++) {
		a.push(new Array(rows));
	}
	return a;
}
