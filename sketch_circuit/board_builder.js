function buildBoard() {
  wires = [];

  var chipsetCount = min(randomInt(2, COLS / 4), randomInt(2, COLS / 4));
  for (var c = 0; c < chipsetCount; c++) {
    placeChipSet();
  }


  placeSingles();



}

function placeSingles() {

  var wireWeights = [{
    weight: 1,
    value: primaryWire
  }, {
    weight: 1,
    value: secondaryWire
  }, {
    weight: 0,
    value: blockWire
  }, {
    weight: 0,
    value: null
  }];

  var countWeights = [{
    weight: 1,
    value: 0
  }, {
    weight: 1,
    value: 5
  }, {
    weight: 1,
    value: 50
  }];

  var singlesCount = weightedRoll(countWeights);
  for (var c = 0; c < singlesCount; c++) {
    placeWire(randomInt(COLS), randomInt(ROWS), weightedRoll(wireWeights));
  }
}

function placeChipSet() {
  var w = max(randomInt(1, 8), randomInt(1, 8)) * 2;
  var h = max(randomInt(1, 8), randomInt(1, 8)) * 2;
  var chip = designChip(w, h);
  var x = randomInt(COLS);
  var y = randomInt(ROWS);
  var chipCount = randomInt(1, 4);
  var spacing = randomInt(4, 8);

  for (var c = 0; c < chipCount; c++) {
    placeChip(chip, x, y);
    if (random() > 0.5) {
      x += chip.w + spacing;
    }
    else {
      y += chip.h + spacing;
    }
  }

}

function designChip(w, h) {
  var pins = makeMultiArray(w, h);

  var x, y;

  var borderWeights = [{
    weight: 4,
    value: primaryWire
  }, {
    weight: 1,
    value: secondaryWire
  }, {
    weight: 0,
    value: blockWire
  }, {
    weight: 0,
    value: null
  }];


  var fillWeights = [{
    weight: 0,
    value: primaryWire
  }, {
    weight: 0,
    value: secondaryWire
  }, {
    weight: 1,
    value: blockWire
  }, {
    weight: 1,
    value: null
  }];

  var currentWire = weightedRoll(borderWeights);

  // top
  for (x = 0; x < w; x++) {
    pins[x][0] = currentWire;
    if (random() > 0.8) {
      currentWire = weightedRoll(borderWeights);
    }
  }

  // right
  for (y = 0; y < h; y++) {
    // console.log(pins, w, y);
    pins[w - 1][y] = currentWire;
    if (random() > 0.8) {
      currentWire = weightedRoll(borderWeights);
    }
  }

  // bottom
  for (x = 0; x < w; x++) {
    pins[x][h - 1] = currentWire;
    if (random() > 0.8) {
      currentWire = weightedRoll(borderWeights);
    }
  }

  // left
  for (y = 0; y < h; y++) {
    pins[0][y] = currentWire;
    if (random() > 0.8) {
      currentWire = weightedRoll(borderWeights);
    }
  }

  // fill
  for (y = 1; y < h - 1; y++) {
    for (x = 1; x < w - 1; x++) {
      pins[x][y] = weightedRoll(fillWeights);
    }
  }



  return {
    w: w,
    h: h,
    pins: pins
  };
}



function placeChip(chip, chipX, chipY) {
  var x, y;
  for (y = 0; y < chip.h; y++) {
    for (x = 0; x < chip.w; x++) {
      var action = chip.pins[x][y];
      if (action instanceof Wire) {
        placeWire(x + chipX, y + chipY, action);
      }
    }
  }
}



function placeWire(x, y, wireType) {
  x2 = constrain(x, 1, COLS - 2);
  y2 = constrain(y, 1, ROWS - 2);
  if (x2 != x || y2 != y) {
    return;
  }


  var newWire = Object.create(wireType);
  newWire.location = new Point(x, y);
  newWire.init();
  wires.push(newWire);


}



// // place singles
// // for (var i = 0; i < 1; i++) {
// placeWire(randomInt(COLS), randomInt(ROWS), primaryWire);
// placeWire(randomInt(COLS), randomInt(ROWS), secondaryWire);
// // }
//
// var x, y, w, h;
//
// // place chips
// for (var chip = 0; chip < 0; chip++) {
//     x = randomInt(1, COLS - 2);
//     y = randomInt(1, ROWS - 2);
//     w = randomInt(4, 10);
//     h = randomInt(4, 10);
//     placeChip(x, y, w, h);
// }
//
// for (var dip = 0; dip < 0; dip++) {
//     x = randomInt(1, COLS - 2);
//     y = randomInt(1, ROWS - 2);
//     l = pow(2, randomInt(2, 5));
//     placeDipChip(x, y, 4, l);
// }
//
// // placeFromImage();


// function placeFromImage() {
//     startImage.loadPixels();
//     for (var y = 0; y < min(ROWS, startImage.height); y++) {
//         for (var x = 0; x < min(COLS, startImage.width); x++) {
//
//             var imageIndex = (y * startImage.width + x) * 4;
//
//             if (startImage.pixels[imageIndex] === 255) {
//                 placeChip(x, y, 1, 1);
//             }
//         }
//     }
// }

//
// function placeSolidChip(x, y, w, h) {
//
//     x = constrain(x, 1, COLS - 1);
//     y = constrain(y, 1, ROWS - 1);
//
//     if (x + w > COLS - 1) {
//         w = COLS - 1 - x;
//     }
//     if (y + h > ROWS - 1) {
//         h = ROWS - 1 - y;
//     }
//
//     for (row = y; row < y + h; row++) {
//         for (col = x; col < x + w; col++) {
//             placeWire(col, row);
//
//
//         }
//     }
// }
//
// function placeDipChip(x, y, w, h) {
//
//     x = constrain(x, 1, COLS - 1);
//     y = constrain(y, 1, ROWS - 1);
//
//     if (x + w > COLS - 1) {
//         w = COLS - 1 - x;
//     }
//     if (y + h > ROWS - 1) {
//         h = ROWS - 1 - y;
//     }
//
//     for (row = y; row < y + h; row++) {
//         for (col = x + 1; col < x + w - 1; col++) {
//
//             grid[col][row] = "BLOCKED";
//
//         }
//
//
//         wires.push(new Wire(
//             new Point(x, row)
//         ));
//
//         wires.push(new Wire(
//             new Point(x + w - 1, row)
//         ));
//
//
//     }
// }
