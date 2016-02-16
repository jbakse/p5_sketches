function Wire(location) {
    if (location === undefined) {
        location = new Point(0, 0);
    }
    this.location = location;
    this.direction = "N";
    this.dead = false;

    this.color = color(255);
    this.strokeWeight = 1;
    this.age = 0;
    this.lifespan = 10000;
}


Wire.prototype.init = function() {
    this.direction = this.pickStartDirection();
    grid[this.location.x][this.location.y] = "BLOCKED";
};


Wire.prototype.step = function() {
    if (this.dead) {
        return;
    }

    // decide move
    var nextDirection = this.pickDirection();
    if (!nextDirection) {
        this.die();
        return;
    }

    // draw move
    nextLocation = getAdjacentCell(this.location, nextDirection);
    this.drawLine(nextLocation);
    if (this.age === 0) {
        this.drawStart();
    }

    // finish move
    this.direction = nextDirection;
    this.location = nextLocation;
    grid[this.location.x][this.location.y] = "BLOCKED";


    // age and die
    if (++this.age > this.lifespan) {
        this.die();
        return;
    }

};

Wire.prototype.pickDirection = function() {
    var cruiseDirection = this.pickCruiseDirection();
    var cruiseLocation = getAdjacentCell(this.location, cruiseDirection);
    // console.log(this, cruiseDirection, cruiseLocation);
    if (grid[cruiseLocation.x][cruiseLocation.y] === "BLOCKED") {
        return this.pickEscapeDirection();
    }
    return cruiseDirection;
};

Wire.prototype.die = function() {
    this.drawEnd();
    this.dead = true;
};



Wire.prototype.pickStartDirection = function() {
    return "N";
};

Wire.prototype.pickCruiseDirection = function() {
    return this.direction;
};

Wire.prototype.pickEscapeDirection = function() {
    var escapeOptions = ["N", "E", "S", "W"];
    for (var i = 0; i < escapeOptions.length; i++) {
        if (!directionBlocked(this.location, escapeOptions[i])) {
            return escapeOptions[i];
        }
    }
    return false;
};

Wire.prototype.drawStart = function() {
    stroke(this.color);
    strokeWeight(this.strokeWeight);
    fill(0);
    ellipse(this.location.x * COL_WIDTH + COL_WIDTH * 0.5 + 0.5,
        this.location.y * ROW_HEIGHT + ROW_HEIGHT * 0.5 + 0.5,
        GRID_SIZE * 0.5,
        GRID_SIZE * 0.5);
};

Wire.prototype.drawEnd = function() {
    stroke(this.color);
    strokeWeight(this.strokeWeight);
    fill(0);
    ellipse(this.location.x * COL_WIDTH + COL_WIDTH * 0.5 + 0.5,
        this.location.y * ROW_HEIGHT + ROW_HEIGHT * 0.5 + 0.5,
        GRID_SIZE * 0.5,
        GRID_SIZE * 0.5);
};

Wire.prototype.drawLine = function(nextLocation) {
    stroke(this.color);
    fill(this.color);
    strokeWeight(this.strokeWeight);
    line(this.location.x * COL_WIDTH + COL_WIDTH * 0.5,
        this.location.y * ROW_HEIGHT + ROW_HEIGHT * 0.5,
        nextLocation.x * COL_WIDTH + COL_WIDTH * 0.5,
        nextLocation.y * ROW_HEIGHT + ROW_HEIGHT * 0.5);
};
