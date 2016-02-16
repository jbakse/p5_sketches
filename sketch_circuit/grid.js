function makeMultiArray(columns, rows) {
    var a = [];
    for (var col = 0; col < columns; col++) {
        a.push(new Array(rows));
    }
    return a;
}


function getAdjacentCell(location, direction) {
    if (direction === "N") {
        return new Point(location.x, location.y - 1);
    } else if (direction === "E") {
        return new Point(location.x + 1, location.y);
    } else if (direction === "S") {
        return new Point(location.x, location.y + 1);
    } else if (direction === "W") {
        return new Point(location.x - 1, location.y);
    } else if (direction === "NE") {
        return new Point(location.x + 1, location.y - 1);
    } else if (direction === "SE") {
        return new Point(location.x + 1, location.y + 1);
    } else if (direction === "SW") {
        return new Point(location.x - 1, location.y + 1);
    } else if (direction === "NW") {
        return new Point(location.x - 1, location.y - 1);
    }
}

function directionBlocked(location, direction) {
    var testLocation = getAdjacentCell(location, direction);

    return grid[testLocation.x][testLocation.y] === "BLOCKED";
}


function setGridRect(x, y, w, h, state) {
    x = constrain(x, 0, COLS - 1);
    y = constrain(y, 0, ROWS - 1);
    if (x + w > COLS) {
        w = COLS - x;
    }
    if (y + h > ROWS) {
        h = ROWS - y;
    }

    for (var row = y; row < y + h; row++) {
        for (var col = x; col < x + w; col++) {
            grid[col][row] = state;
        }
    }
}
