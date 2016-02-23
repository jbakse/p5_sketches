var GRAVITY = 1;

var player = new Player();
var setter = new Player();

var grid;

var JUMP_POWER = 18;
var WALK_SPEED = 6;

function mouseReleased() {
	noLoop();
}

function setup() {
	// create a place to draw
	createCanvas(640, 640);

	grid = [];
	var i;

	for (i = 0; i < 20; i++) {
		grid[i] = [];
	}

	grid[3][17] = true;
	// for (i = 0; i < 20; i++) {
	// 	grid[floor(random(20))][floor(random(20))] = true;
	// }

	setter.startRight();
	setter.bar = 19;
	setter.steps = 0;

}


function draw() {
	// clear the background
	background(0, 0, 0);


	player.step();
	player.draw();

	setter.step();
	setter.draw();

	setter.onMovingTo = function() {
		if (this.grounded) {
			this.steps++;
		}

		if (this.nextGridLoc.y >= this.gridLoc.y && !this.grounded) {
			if (random() > 0.5) {
				grid[this.nextGridLoc.x][this.nextGridLoc.y] = true;
				this.bar = this.nextGridLoc.y;
			}
		}


		if (this.nextGridLoc.y >= this.bar) {
			grid[this.nextGridLoc.x][this.nextGridLoc.y] = true;
			this.bar = this.nextGridLoc.y;
		}
		if (this.nextGridLoc.y > this.gridLoc.y && this.grounded) {
			grid[this.nextGridLoc.x][this.nextGridLoc.y] = true;
		}

	};
	if (setter.gridLoc.x === 0) {
		setter.endLeft();
		setter.startRight();
	}
	if (setter.gridLoc.x === 19) {
		setter.endRight();
		setter.startLeft();
	}
	// console.log(setter.steps);
	if (setter.grounded && setter.steps > 5) {
		setter.steps = 0;
		setter.jump();
	}



	push();
	fill(255, 0, 0, 150);
	noStroke();


	rect(player.gridLoc.x * 32, player.gridLoc.y * 32, 32, 32);

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
	this.loc = new Point(320, 600);
	this.gridLoc = new Point(
		Math.floor(this.loc.x / 32),
		Math.floor(this.loc.x / 32)
	);
	this.speed = new Point(0, 0);
	this.grounded = false;
}



Player.prototype.step = function() {
	// integrate
	this.speed.y += GRAVITY;
	this.loc.y += this.speed.y;
	this.loc.x += this.speed.x;


	/////////////////////////////////////////////////
	/// COLLISIONS

	this.nextGrounded = false;

	// collide floor
	if (this.loc.y + 16 > height) {
		this.speed.y = 0;
		this.loc.y = height - 1;
		this.nextGrounded = true;
	}

	this.collideGrid();

	if (!this.grounded && this.nextGrounded) {
		// console.log("Ground On");
	}
	if (this.grounded && !this.nextGrounded) {
		// console.log("Ground Off");
	}
	if (!this.gridLoc.equals(this.nextGridLoc)) {
		// console.log("Moved To", this.nextGridLoc);
	}

	this.grounded = this.nextGrounded;
	this.gridLoc = this.nextGridLoc;

};


Player.prototype.collideGrid = function() {
	this.nextGridLoc = new Point(
		floor(this.loc.x / 32),
		floor(this.loc.y / 32)
	);

	if (!this.gridLoc.equals(this.nextGridLoc)) {
		// console.log("Moving To", this.nextGridLoc);
		// console.log(this.gridLoc, this.nextGridLoc);
		this.onMovingTo();
	}


	if (
		this.nextGridLoc.y > this.gridLoc.y && // moving down
		grid[this.nextGridLoc.x][this.nextGridLoc.y] === true // moving into a blocked space
	) {
		this.speed.y = 0; // stop moving down
		this.loc.y = this.nextGridLoc.y * 32; // constrain to (bottom of open)(top of blocked) boundry
		this.nextGridLoc.y -= 1; // we are at the bottom of the open square
		this.nextGrounded = true;
	}
};

Player.prototype.onMovingTo = function(player) {};

Player.prototype.draw = function() {
	// ellipseMode(CORNER);
	push();
	fill(255);
	noStroke();
	ellipse(this.loc.x, this.loc.y - 16, 32, 32);
	pop();
};

Player.prototype.jump = function() {
	if (this.grounded) {
		this.speed.y = -JUMP_POWER;
	}
};

Player.prototype.startLeft = function() {
	this.speed.x = -WALK_SPEED;
};

Player.prototype.endLeft = function() {
	if (this.speed.x < 0) {
		this.speed.x = 0;
	}
};

Player.prototype.startRight = function() {
	this.speed.x = WALK_SPEED;
};

Player.prototype.endRight = function() {
	if (this.speed.x > 0) {
		this.speed.x = 0;
	}
};


keyboardJS.bind('z', function(e) {
	e.preventRepeat();
	player.jump();
}, function(e) {});

keyboardJS.bind(['left', 'a'], function(e) {
		e.preventRepeat();
		player.startLeft();
	},
	function(e) {
		player.endLeft();
	}
);

keyboardJS.bind(['right', 'd'], function(e) {
		e.preventRepeat();
		player.startRight();
	},
	function(e) {
		player.endRight();
	}
);


function Point(x, y) {
	this.x = x;
	this.y = y;
}

Point.prototype.equals = function(p) {
	return (this.x === p.x && this.y === p.y);
};
