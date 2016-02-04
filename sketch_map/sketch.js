// just draws a circle
var map_rows = 32;
var map_cols = 32;
var map = [];
var map_min = 0;
var map_max = 9;

var color_table;

function setup() {
	// create a place to draw
	createCanvas(1000, 8000, SVG);
	noStroke();
	noLoop();


	// init map
	var row, col;

	for (row = 0; row < map_rows; row++) {
		map[row] = [];
		for (col = 0; col < map_cols; col++) {
			map[row][col] = 5;
		}
	}

	// brownian map
	for (row = 0; row < map_rows; row++) {
		for (col = 0; col < map_cols; col++) {
			var up = map[row - 1] && map[row - 1][col];
			var left = map[row][col - 1];

			map[row][col] = chooseTileValue(up, left);

		}
	}

	// prune town
	for (row = 0; row < map_rows; row++) {
		for (col = 0; col < map_cols; col++) {

			if (map[row][col] > 6) {
				if (random() > 0.4) {
					map[row][col] = 6;
				}
			}

			if (col > 0 && map[row][col - 1] === 9 && map[row][col] === 9) {
				map[row][col]--;
			}

			if (row > 0 && map[row - 1][col] === 9 && map[row][col] === 9) {
				map[row][col]--;
			}

		}
	}

}


function chooseTileValue(up, left) {
	// use the average of up and left, fill in missing data
	var new_value;
	if (isNaN(up) && isNaN(left)) {
		new_value = floor(random(10));
	} else if (isNaN(up)) {
		new_value = left;
	} else if (isNaN(left)) {
		new_value = up;
	} else {
		new_value = floor((up + left) * 0.5);
	}


	var r = random(100);
	if (r < 50) {
		new_value--;
	} else if (r > 50) {
		new_value++;
	}

	// clamp to range
	new_value = max(map_min, new_value);
	new_value = min(map_max, new_value);

	return new_value;
}


function draw() {
	// clear the background
	console.log("draw");
	background(255, 255, 255);

	visualizeAsColor();

	fill(0);



	scale(2);
	visualizeAsShape();


}

var once = true;

function mouseClicked() {
	if (once) {
		save();
		once = false;
	}
}

function visualizeAsColor() {
	var color_table = [
		color(0, 100, 0), // deep woods
		color(0, 150, 0), // woods
		color(50, 150, 50), // light woods
		color(0, 150, 50), // shrubs
		color(50, 180, 50), // small shrubs
		color(50, 200, 50), // grass
		color(50, 200, 50), // grass
		color(100, 100, 100), // town
		color(100, 100, 150), // town
		color(0, 0, 0), // heavy town
	];

	for (var row = 0; row < map_rows; row++) {
		for (var col = 0; col < map_cols; col++) {

			var c = color_table[map[row][col]];
			fill(c);
			rect(col * 10 + 670, row * 10, 10, 10);
		}
	}
}

var function_table = [
	drawSpruceTree, // deep woods
	drawSpruceTreeSmall, // woods
	drawSpruceTreeSmall, // light woods
	drawBush, // shrubs
	drawBushSmall, // small shrubs
	drawGrass, // grass
	drawGrass, // grass
	drawHouse, // town
	drawHouse, // town
	drawTower, // heavy town
];

function visualizeAsShape() {



	for (var row = 0; row < map_rows; row++) {
		drawRow(row);

	}


}

function drawRow(row) {
	for (var col = 0; col < map_cols; col++) {
		var ground_height = 0;
		ground_height += (sin((col + row) / map_cols * PI * 2) + 1) * 15;
		// ground_height += (cos(row / map_rows * PI * 4) + 1) * 10;

		var next_ground_height = 0;
		next_ground_height += (sin((col + row + 1) / map_cols * PI * 2) + 1) * 15;
		// next_ground_height += (cos(row / map_rows * PI * 4) + 1) * 10;

		// console.log(ground_height);
		function_table[map[row][col]](col * 10 + 10, row * 90 + 100, map[row][col],
			ground_height, next_ground_height);
	}
	push();
	fill(255);
	ellipse(row * 10 + 15, row * 90 + 120, 5, 5);
	stroke(255, 0, 0);
	line(20, row * 90 + 110, 20, row * 90 + 122);
	line(16 * 20, row * 90 + 110, 16 * 20, row * 90 + 122);
	pop();
}

function drawGrass(x, y, tile_value, ground_height, next_ground_height) {
	//rect(x, y - ground_height, 10, 10 + ground_height);
	quad(x, y + 20, x, y - ground_height, x + 10, y - next_ground_height, x + 10,
		y + 20);
}


function drawHouse(x, y, tile_value, ground_height, next_ground_height) {


	push();
	translate(0, -ground_height + 3);

	rect(x, y - 10.2, 10, 10); // base
	triangle(x, y - 10, x + 5, y - 15, x + 10, y - 10); // roof

	//chimney
	if (random() < 0.5) {
		rect(x + 1, y, 2, -14);
	}


	fill(255);

	if (random() < 0.5) {
		//left window
		rect(x + 2, y - 5, 2, -3);
	}
	if (random() < 0.5) {
		// right window
		rect(x + 6, y - 5, 2, -3);
	}



	pop();

	drawGrass(x, y, tile_value, ground_height, next_ground_height);
}

function drawTower(x, y, tile_value, ground_height, next_ground_height) {
	if (ground_height > 10) {
		push();
		translate(0, -ground_height + 3);

		rect(x, y, 10, -20); // base
		rect(x - 1, y - 18, 3, -4); // left
		rect(x + 3, y - 18, 4, -4); // middle
		rect(x + 8, y - 18, 3, -4); // top

		fill(255);
		if (random() > 0.4) {
			rect(x + 4, y - 6, 2, -4); // bottom
		}

		rect(x + 4, y - 12, 2, -4); // top


		pop();
	}

	drawGrass(x, y, tile_value, ground_height, next_ground_height);
}



function drawSpruceTree(x, y, tile_value, ground_height, next_ground_height) {
	drawGrass(x, y, tile_value, ground_height, next_ground_height);

	push();
	translate(0, -ground_height + 2);
	// translate(random(-4, 4), 0);
	var height = min(random(1, 4), random(1, 4));
	height = height * 5;
	rect(x + 3, y - height - 1, 4, height + 1); // trunk
	triangle(x, y - height, x + 5, y - height - 10, x + 10, y - height); // bottom branch
	triangle(x, y - height - 5, x + 5, y - height - 15, x + 10, y - height - 5); // middle branch
	if (random() > 0.5) {
		triangle(x, y - height - 10, x + 5, y - height - 20, x + 10, y - height - 10); // top
		if (random() > 0.5) {
			triangle(x, y - height - 15, x + 5, y - height - 25, x + 10, y - height - 15); // top
		}
	}

	pop();
}


function drawSpruceTreeSmall(x, y, tile_value, ground_height,
	next_ground_height) {
	drawGrass(x, y, tile_value, ground_height, next_ground_height);

	push();
	translate(0, -ground_height + 2);

	var height = min(random(1, 2), random(1, 2));
	height = height * 5;
	rect(x + 3, y - height - 1, 4, height + 1); // trunk
	triangle(x, y - height, x + 5, y - height - 10, x + 10, y - height); // bottom branch
	// triangle(x, y - height - 5, x + 5, y - height - 15, x + 10, y - height - 5); // top

	pop();

	// if (random() > 0.5) {
	// 	drawBush(x, y, tile_value, ground_height, next_ground_height);
	// }
}



function drawBush(x, y, tile_value, ground_height, next_ground_height) {
	drawGrass(x, y, tile_value, ground_height, next_ground_height);

	push();
	translate(0, -(ground_height + next_ground_height) * 0.5 + 1);

	ellipse(x + 5, y, 10, 10); // bush

	pop();
}

function drawBushSmall(x, y, tile_value, ground_height, next_ground_height) {
	drawGrass(x, y, tile_value, ground_height, next_ground_height);

	push();
	translate(0, -(ground_height + next_ground_height) * 0.5 + 1);

	ellipse(x + 5, y, 6, 6); // bush

	// triangle(x - 4, y, x + random(-5, 5), y - random(5, 10), x + 4, y);
	// triangle(x - 4, y, x + random(-5, 5), y - random(5, 10), x + 4, y);


	pop();
}
