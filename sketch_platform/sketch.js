var GRAVITY = 1;

var player = new Player();

var grid;

function setup() {
	// create a place to draw
	createCanvas(640, 640);

	grid = [];
	var i
	for (i = 0; i < 20; i++) {
		grid[i] = [];
	}

	grid[3][17] = true;
	for (i = 0; i < 20; i++) {
		grid[floor(random(20))][floor(random(20))] = true;
	}
}


function draw() {
	// clear the background
	background(0, 0, 0);


	player.step();
	player.draw();

	push();
	fill(255, 0, 0, 150);
	noStroke();
	var gridX = floor(player.loc.x / 32);
	var gridY = floor(player.loc.y / 32);
	rect(gridX * 32, (gridY + 1) * 32, 32, 32);

	for (var y = 0; y < 20; y++) {
		for (var x = 0; x < 20; x++) {
			if (grid[x][y] === true) {
				rect(x * 32, y * 32, 32, 32);
			}
		}
	}

	pop();



}

function Player() {
	this.loc = new Point(320, 320);
	this.speed = new Point(0, 0);
	this.grounded = false;
}



Player.prototype.step = function () {
	// integrate
	this.speed.y += GRAVITY;
	this.loc.y += player.speed.y;
	this.loc.x += player.speed.x;

	// grid
	this.grounded = false;

	this.collideGrid();

	// floor
	if (this.loc.y + 16 > height) {
		this.speed.y = 0;
		this.loc.y = height - 16;
		this.grounded = true;
	}
};


Player.prototype.collideGrid = function () {
	var gridX = floor(this.loc.x / 32);
	var gridY = floor(this.loc.y / 32);
	if (grid[gridX][gridY + 1] === true &&
		this.loc.y + 16 > gridY * 32 &&
		this.speed.y > 0) {

		this.speed.y = 0;
		this.loc.y = gridY * 32 + 16;
		this.grounded = true;
	}
};

Player.prototype.draw = function () {
	// ellipseMode(CORNER);
	push();
	fill(255);
	noStroke();
	ellipse(this.loc.x, this.loc.y, 32, 32);
	pop();
};

Player.prototype.jump = function () {
	if (this.grounded) {
		this.speed.y = -18;
	}
};

Player.prototype.startLeft = function () {
	this.speed.x = -6;
};

Player.prototype.endLeft = function () {
	if (this.speed.x < 0) {
		this.speed.x = 0;
	}
};

Player.prototype.startRight = function () {
	this.speed.x = 6;
};

Player.prototype.endRight = function () {
	if (this.speed.x > 0) {
		this.speed.x = 0;
	}
};


keyboardJS.bind('space', function (e) {
	e.preventRepeat();
	player.jump();
}, function (e) {});

keyboardJS.bind(['left', 'a'], function (e) {
		e.preventRepeat();
		player.startLeft();
	},
	function (e) {
		player.endLeft();
	}
);

keyboardJS.bind(['right', 'd'], function (e) {
		e.preventRepeat();
		player.startRight();
	},
	function (e) {
		player.endRight();
	}
);


function Point(x, y) {
	this.x = x;
	this.y = y;
}
