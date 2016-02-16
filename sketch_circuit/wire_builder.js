function buildWires() {


    var cruiseWeights = [{
        weight: 5,
        value: cruiseStraight
    }, {
        weight: 1,
        value: cruiseRandomFourWay
    }, {
        weight: 1,
        value: cruiseRandomFourWayDiagonal
    }, {
        weight: 1,
        value: cruiseRandomEightWay
    }];


    primaryWire = new Wire();
    if (random() < 0.75) {
        primaryWire.pickCruiseDirection = stablized(0.9,
            weightedRoll(cruiseWeights));
    } else {
        primaryWire.pickCruiseDirection = weightedRoll(cruiseWeights);
    }
    primaryWire.lifespan = shuffle([10000, 10000, 10000, 10000, random(150)])[0];
    primaryWire.strokeWeight = shuffle([1, 1, 1, 0.5, 1])[0];



    secondaryWire = new Wire();
    if (random() < 0.75) {
        secondaryWire.pickCruiseDirection = stablized(0.9,
            weightedRoll(cruiseWeights));
    } else {
        secondaryWire.pickCruiseDirection = weightedRoll(cruiseWeights);
    }
    secondaryWire.strokeWeight = primaryWire.strokeWeight + shuffle([1, 1, 2])[
        0];
    secondaryWire.lifespan = shuffle([10000, 5, 10, 20])[0];

    blockWire = new Wire();
    blockWire.dead = true;


    // secondaryWire.pickCruiseDirection = randomFourWay;
}


function cruiseStraight() {
    return this.direction;
}

function stablized(stability, func) {
    return function() {
        if (random() < stability) {
            return this.direction;
        } else {
            return func.call(this);
        }
    };
}

function cruiseRandomFourWay() {
    return shuffle(["N", "E", "S", "W"])[0];
}

function cruiseRandomFourWayDiagonal() {
    return shuffle(["NE", "SE", "SW", "NW"])[0];
}

function cruiseRandomEightWay() {
    return shuffle(["N", "NE", "E", "SE", "S", "SW", "W", "NW"])[0];
}



function escapeFourWay() {
    var escapeOptions = ["N", "E", "S", "W"];
    for (var i = 0; i < escapeOptions.length; i++) {
        if (!directionBlocked(this.location, escapeOptions[i])) {
            return escapeOptions[i];
        }
    }
    return false;
}

function escapeEightWay() {
    var escapeOptions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    for (var i = 0; i < escapeOptions.length; i++) {
        if (!directionBlocked(this.location, escapeOptions[i])) {
            return escapeOptions[i];
        }
    }
    return false;
}
