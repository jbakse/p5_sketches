function Point(x, y) {
    this.x = x || 0;
    this.y = y || 0;
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

function makeMultiArray(columns, rows) {
    var a = [];
    for (var col = 0; col < columns; col++) {
        a.push(new Array(rows));
    }
    return a;
}

function weightedRoll(table) {
    var i;
    var total = 0;
    for (i = 0; i < table.length; i++) {
        total += table[i].weight;
    }
    var r = random(total);
    var cumulative = 0;
    for (i = 0; i < table.length; i++) {
        cumulative += table[i].weight;
        if (r < cumulative) {
            return table[i].value;
        }
    }
    //backup
    return table[0].value;
}
