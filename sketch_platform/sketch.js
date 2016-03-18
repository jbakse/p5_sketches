var GRID_SIZE = 32;

var grid;
var player;
var cameraY = 0;

function setup() {
	createCanvas(640, 640);
	initGrid();
	player = new Character();
	bindKeyboard(player);
}

function initGrid() {
	grid = [];
	for (var i = 0; i < 20; i++) {
		grid[i] = [];
	}

	grid[0][0] = true;
	grid[1][3] = true;

}

function draw() {
	background(100);

	player.step();


	cameraY = lerp(cameraY, player.loc.y, 0.1);
	translate(0, cameraY);
	translate(0, height * 0.5);
	player.draw();
	drawGridDebug();

}

function drawGridDebug() {
	push();

	fill(255, 0, 0);
	noStroke();

	// show "solid" blocks
	for (var y = 0; y < 20; y++) {
		for (var x = 0; x < 20; x++) {
			if (grid[x][y] === true) {
				rect(x * 32, y * -32, 32, -32);
			}
		}
	}

	// show location of player
	fill(0, 0, 255, 100);
	rect(player.gridLoc.x * 32, -player.gridLoc.y * 32, 32, -32);

	pop();
}

function bindKeyboard(character) {

	keyboardJS.bind('z',
		function(e) {
			e.preventRepeat();
			character.inputStartJump();
		},
		function(e) {
			character.inputStopJump();
		}
	);

	keyboardJS.bind(['left', 'a'],
		function(e) {
			e.preventRepeat();
			character.inputStartLeft();
		},
		function(e) {
			character.inputStopLeft();
		}
	);

	keyboardJS.bind(['right', 'd'],
		function(e) {
			e.preventRepeat();
			character.inputStartRight();
		},
		function(e) {
			character.inputStopRight();
		}
	);
}
