var GRAVITY = -1;
var JUMP_POWER = -18;
var WALK_SPEED = 6;


function Character() {
  this.physics = {};
  this.physics.loc = new Point(0, 0);
  this.physics.gridLoc = new Point(
    Math.floor(this.loc.x / GRID_SIZE),
    Math.floor(this.loc.x / GRID_SIZE)
  );
  this.physics.speed = new Point(0, 0);
  this.physics.grounded = false;

}



Character.prototype.step = function () {
  // integrate
  this.physics.speed.y += GRAVITY;
  this.physics.loc.y += this.physics.speed.y;
  this.physics.loc.x += this.physics.speed.x;


  /////////////////////////////////////////////////
  /// COLLISIONS

  this.handleCollisions();

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


Character.prototype.handleCollisions = function () {
  // collide floor
  if (this.loc.y < 0) {
    this.speed.y = 0;
    this.loc.y = 0;
    this.nextGrounded = true;
  }


  this.nextGridLoc = new Point(
    floor(this.loc.x / GRID_SIZE),
    floor(this.loc.y / GRID_SIZE)
  );

  if (!this.gridLoc.equals(this.nextGridLoc)) {
    this.onMovingTo();
  }

  if (
    this.nextGridLoc.y < this.gridLoc.y && // moving down
    grid[this.nextGridLoc.x][this.nextGridLoc.y] === true // moving into a blocked space
  ) {
    this.speed.y = 0; // stop moving down
    this.nextGridLoc.y += 1; // we are at the bottom of the open square
    this.loc.y = this.nextGridLoc.y * GRID_SIZE; // constrain to (bottom of open)(top of blocked) boundry
    this.nextGrounded = true;
  }
};

Character.prototype.onMovingTo = function (player) {};

Character.prototype.draw = function () {
  // ellipseMode(CORNER);
  push();
  fill(255);
  noStroke();
  ellipse(this.loc.x, -this.loc.y - 16, GRID_SIZE, GRID_SIZE);
  pop();
};

Character.prototype.inputStartJump = function () {
  if (this.grounded) {
    this.speed.y = -JUMP_POWER;
  }
};

Character.prototype.inputStopJump = function () {};

Character.prototype.inputStartLeft = function () {
  this.speed.x = -WALK_SPEED;
};

Character.prototype.inputStopLeft = function () {
  if (this.speed.x < 0) {
    this.speed.x = 0;
  }
};

Character.prototype.inputStartRight = function () {
  this.speed.x = WALK_SPEED;
};

Character.prototype.inputStopRight = function () {
  if (this.speed.x > 0) {
    this.speed.x = 0;
  }
};
