var CANVAS_WIDTH, CANVAS_HEIGHT, COL_WIDTH, ROW_HEIGHT, COLS, ROWS;
var GRID_SIZE;
var grid, wires;
var primaryWire;
var secondaryWire;
var blockWire;

var startImage;

function preload() {
	startImage = loadImage("images/cloud.png");
}

function setup() {
	CANVAS_WIDTH = window.innerWidth;
	CANVAS_HEIGHT = window.innerHeight;
	createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	init();
}

function init() {
	COL_WIDTH = min(randomInt(2, 8), randomInt(2, 8), randomInt(2, 8), randomInt(2,
		8)) * 5;
	ROW_HEIGHT = COL_WIDTH;
	if (random() < 0.1) {
		if (random() < 0.5) {
			ROW_HEIGHT *= randomInt(2, 8);
		} else {
			COL_WIDTH *= randomInt(2, 8);
		}
	}

	GRID_SIZE = min(COL_WIDTH, ROW_HEIGHT);

	COLS = Math.floor(CANVAS_WIDTH / COL_WIDTH);
	ROWS = Math.floor(CANVAS_HEIGHT / ROW_HEIGHT);


	// init grid
	grid = makeMultiArray(COLS, ROWS);

	// build border walls
	setGridRect(0, 0, COLS, ROWS, "BLOCKED");
	setGridRect(1, 1, COLS - 2, ROWS - 2, "OPEN");

	// build wire types
	buildWires();

	// build board
	buildBoard();

	// clear and start animating
	background(0);
	loop();
}



function draw() {
	for (var w = 0; w < wires.length; w++) {
		wires[w].step();
	}
	if (allWormsDead()) {
		// stop animating
		noLoop();
		// wait a bit and start over
		setTimeout(init, 10000);
	}
}

function allWormsDead() {
	for (var w = 0; w < wires.length; w++) {
		if (!wires[w].dead) {
			return false;
		}
	}
	return true;
}

function mousePressed() {
	save();
}
