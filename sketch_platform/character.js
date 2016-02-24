var GRAVITY = -1;
var JUMP_POWER = -18;
var WALK_SPEED = 6;


function Character() {
    this.loc = new Point(0, 0);
    this.gridLoc = new Point(
        Math.floor(this.loc.x / 32),
        Math.floor(this.loc.x / 32)
    );
    this.speed = new Point(0, 0);
    this.grounded = false;
}



Character.prototype.step = function() {
    // integrate
    this.speed.y += GRAVITY;
    this.loc.y += this.speed.y;
    this.loc.x += this.speed.x;


    /////////////////////////////////////////////////
    /// COLLISIONS

    this.nextGrounded = false;

    // collide floor
    if (this.loc.y < 0) {
        this.speed.y = 0;
        this.loc.y = 0;
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


Character.prototype.collideGrid = function() {
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
        this.nextGridLoc.y < this.gridLoc.y && // moving down
        grid[this.nextGridLoc.x][this.nextGridLoc.y] === true // moving into a blocked space
    ) {
        this.speed.y = 0; // stop moving down
        this.loc.y = this.nextGridLoc.y * 32; // constrain to (bottom of open)(top of blocked) boundry
        this.nextGridLoc.y += 1; // we are at the bottom of the open square
        this.nextGrounded = true;
    }
};

Character.prototype.onMovingTo = function(player) {};

Character.prototype.draw = function() {
    // ellipseMode(CORNER);
    push();
    fill(255);
    noStroke();
    ellipse(this.loc.x, -this.loc.y - 16, 32, 32);
    pop();
};

Character.prototype.inputStartJump = function() {
    if (this.grounded) {
        this.speed.y = -JUMP_POWER;
    }
};

Character.prototype.inputStopJump = function() {};

Character.prototype.inputStartLeft = function() {
    this.speed.x = -WALK_SPEED;
};

Character.prototype.inputStopLeft = function() {
    if (this.speed.x < 0) {
        this.speed.x = 0;
    }
};

Character.prototype.inputStartRight = function() {
    this.speed.x = WALK_SPEED;
};

Character.prototype.inputStopRight = function() {
    if (this.speed.x > 0) {
        this.speed.x = 0;
    }
};
