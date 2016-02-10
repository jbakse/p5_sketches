// draws a mountain range

var noiseRoughSlider;
var noiseScaleSlider;
var mountainScaleSlider;
var paralaxSlider;
var rollMountainsButton;
var downloadButton;

var primaryHue;
var mountains = [];



function setup() {
	// create a place to draw
	var cnv = createCanvas(640, 640);
	cnv.parent("output");
	colorMode(HSB, 255);
	primaryHue = random(255);

	populateMountains();


	noiseRoughSlider = makeSlider(1, 100, random(1, 100), "noiseRough");
	noiseScaleSlider = makeSlider(0, 200, random(0, 200), "noiseScale");
	mountainScaleSlider = makeSlider(0, 50, random(0, 50), "mountainScale");
	paralaxSlider = makeSlider(0, 20, random(0, 20), "paralax");

	rollMountainsButton = createButton("Roll Mountains");
	rollMountainsButton.mousePressed(populateMountains);

	downloadButton = createButton("Save Image");
	downloadButton.mousePressed(function() {
		save();
	});

}

function makeSlider(min, max, value, label) {
	var labelElement = createDiv(label);
	var sliderElement = createSlider(min, max, value);
	labelElement.parent("controls");
	sliderElement.parent("controls");
	return sliderElement;
}



function draw() {
	// clear the background
	var skyHue = (primaryHue + 128) % 255; // find complement color
	background(skyHue, 50, 200);

	// draw the layers back to front
	for (l = 0; l < 24; l++) {
		var hueShift = (1 * (l % 2));
		var saturation = (l / 24.0) * 255;
		var brightness = 255 - (24 - l) * 5;

		fill(primaryHue + hueShift, saturation, brightness);
		stroke(255, 0, 255, 100); // transparent white
		drawLayer(l);
	}

}


// create mountains with random position/height
function populateMountains() {
	mountains = [];
	for (i = 0; i < 3; i++) {
		mountains[i] = {
			x: random(32),
			y: random(24),
			height: max(random(10), random(10))
		};
	}
}

function drawLayer(layer) {
	var y = 480 - (24 - layer) * paralaxSlider.value();

	beginShape();
	vertex(0, 640);
	for (col = 0; col <= 32; col++) {
		var x = col * 20;

		// start with no height then add in height contributions from noise and mountains
		var height = 0;
		height += sampleNoise(col, layer);
		for (var i = 0; i < mountains.length; i++) {
			height += sampleMountain(col, layer, mountains[i]);
		}

		// snap to grid
		// height = floor(height / 40) * 40;

		vertex(x, y - height);
	}
	vertex(640, 640);
	endShape(CLOSE);
}

// find the height contribution at x, y from the provided moutain data
function sampleMountain(x, y, mountain) {
	var distance = dist(x, y, mountain.x, mountain.y);
	// height of the mountain is inverse of distance from peak
	var height = constrain(mountain.height - distance, 0, mountain.height);
	height *= mountainScaleSlider.value();
	return height;
}


// find the height contribution at x, y from the noise
function sampleNoise(x, y) {
	var noiseScale = noiseRoughSlider.value() * 0.01;
	var sample = noise(x * noiseScale, y * noiseScale);
	sample = sample * noiseScaleSlider.value();
	return sample;

}
