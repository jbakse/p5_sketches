// just draws a circle
var COLS = 100;
var ROWS = 50;

var COL_WIDTH = 10;
var ROW_HEIGHT = 10;

var grid = makeMultiArray(COLS, ROWS);
var worms = [];

var startImage;

function preload() {
	startImage = loadImage("images/compform.png");
}

function setup() {
	// create a place to draw
	createCanvas(COLS * COL_WIDTH, ROWS * ROW_HEIGHT);
	fill(255);
	stroke(255);
	background(0, 0, 0);
	colorMode(HSB, 255);
	strokeWeight(1);

	//noLoop();

	for (var col = 0; col < COLS; col++) {
		grid[col][0] = "BLOCKED";
		grid[col][ROWS - 1] = "BLOCKED";
	}
	for (var row = 0; row < ROWS; row++) {
		grid[0][row] = "BLOCKED";
		grid[COLS - 1][row] = "BLOCKED";
	}


	// place singles
	for (var i = 0; i < 10; i++) {
		placeChip(randomInt(COLS), randomInt(ROWS), 1, 1);
	}


	// place chips
	for (var chip = 0; chip < 20; chip++) {
		var x = randomInt(1, COLS - 2);
		var y = randomInt(1, ROWS - 2);
		var w = randomInt(4, 10);
		var h = randomInt(4, 10);
		placeChip(x, y, w, h);
	}

	// placeFromImage();



}

function placeFromImage() {
	startImage.loadPixels();
	for (var y = 0; y < min(ROWS, startImage.height); y++) {
		for (var x = 0; x < min(COLS, startImage.width); x++) {

			var imageIndex = (y * startImage.width + x) * 4;

			if (startImage.pixels[imageIndex] === 255) {
				placeChip(x, y, 1, 1);
			}
		}
	}
}

function placeChip(x, y, w, h) {
	x = constrain(x, 1, COLS - 1);
	y = constrain(y, 1, ROWS - 1);

	if (x + w > COLS - 1) {
		w = COLS - 1 - x;
	}
	if (y + h > ROWS - 1) {
		h = ROWS - 1 - y;
	}

	for (row = y; row < y + h; row++) {
		for (col = x; col < x + w; col++) {

			worms.push(new WireWorm(
				new Point(col, row)
			));

		}
	}
}


function draw() {
	// background(0, 0, 0);

	var i, ii;

	for (i = 0; i < 3; i++) {
		for (var w = 0; w < worms.length; w++) {
			for (ii = 0; ii < 1; ii++) {
				worms[w].step();
			}
		}
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
	this.color = color(255);



	grid[this.location.x][this.location.y] = "BLOCKED";
	this.drawStart();
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
	stroke(this.color);
	fill(this.color);
	ellipse(this.location.x * COL_WIDTH + COL_WIDTH * 0.5 + 0.5,
		this.location.y * ROW_HEIGHT + ROW_HEIGHT * 0.5 + 0.5,
		COL_WIDTH * 0.5,
		COL_WIDTH * 0.5);
};

WireWorm.prototype.drawEnd = function () {
	stroke(this.color);
	fill(this.color);
	ellipse(this.location.x * COL_WIDTH + COL_WIDTH * 0.5 + 0.5,
		this.location.y * ROW_HEIGHT + ROW_HEIGHT * 0.5 + 0.5,
		COL_WIDTH * 0.25,
		COL_WIDTH * 0.25);
};

WireWorm.prototype.drawLine = function (nextLocation) {
	stroke(this.color);
	fill(this.color);
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


function randomInt(min, max) {
	if (min === undefined) {
		return 0;
	}
	if (max === undefined) {
		return floor(random(min));
	}
	return floor(random(min, max));

}
