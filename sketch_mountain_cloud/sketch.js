// draws a mountain range

var noiseRoughSlider;
var noiseScaleSlider;
var cloudNoiseRoughSlider;
var cloudNoiseScaleSlider;
var mountainScaleSlider;
var paralaxSlider;

var mistLevelSlider;
var cloudLevelSlider;
var cloudScaleSlider;

var rollMountainsButton;
var downloadButton;

var primaryHue;
var mountains = [];
var clouds = [];
var exporting = false;

function setup() {
	// create a place to draw
	var cnv = createCanvas(640, 640, SVG);
	// cnv.parent("output");
	colorMode(HSB, 255);
	primaryHue = random(255);

	populateMountains();
	populateClouds();


	noiseRoughSlider = makeSlider(1, 100, 50, "noiseRough");
	noiseScaleSlider = makeSlider(0, 200, 80, "noiseScale");
	cloudNoiseRoughSlider = makeSlider(1, 100, 50, "cloud noiseRough");
	cloudNoiseScaleSlider = makeSlider(0, 200, 80, "cloud noiseScale");
	mountainScaleSlider = makeSlider(0, 50, 25, "mountainScale");
	paralaxSlider = makeSlider(0, 20, 5, "paralax");


	mistLevelSlider = makeSlider(0, 200, 100, "mistLevel");
	cloudLevelSlider = makeSlider(0, 200, 0, "cloudLevel");
	cloudScaleSlider = makeSlider(0, 50, 10, "cloudScale");

	rollMountainsButton = createButton("Roll Mountains");
	rollMountainsButton.mousePressed(populateMountains);

	rollMountainsButton = createButton("Roll Clouds");
	rollMountainsButton.mousePressed(populateClouds);

	downloadButton = createButton("Save Image");
	downloadButton.mousePressed(function() {
		exporting = true;
		draw();
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
	// background(skyHue, 50, 200);
	clear();

	// draw the layers back to front
	for (l = 0; l < 16; l++) {
		var hueShift = (4 * (l % 2));
		var saturation = (l / 16.0) * 255;
		var brightness = 255 - (16 - l) * 5 - (10 * (l % 5));

		fill(primaryHue + hueShift, saturation, brightness);
		stroke(255, 0, 255, 0); // transparent white

		var y = 480 - (16 - l) * paralaxSlider.value();
		if (exporting) {
			y = 800 * l;
		}
		drawLayer(l, y);
	}

}


// create mountains with random position/height
function populateMountains() {
	mountains = [];

	mountains[0] = {
		x: random(8, 24),
		y: random(0, 16),
		height: 10
	};

	mountains[1] = {
		x: random(0, 32),
		y: random(0, 16),
		height: 5
	};

}

function populateClouds() {
	clouds = [];

	clouds[0] = {
		x: random(0, 32),
		y: random(0, 16),
		height: 8
	};

	clouds[1] = {
		x: random(0, 32),
		y: random(0, 16),
		height: 8
	};

	clouds[2] = {
		x: random(0, 32),
		y: random(0, 16),
		height: 4
	};
}

function drawLayer(layer, y) {


	beginShape();
	vertex(0, y);
	for (col = 0; col <= 32; col++) {
		var x = col * 20;

		// start with no height then add in height contributions from noise and mountains
		var mountainHeight = 0;
		mountainHeight += sampleNoise(col, layer);
		for (var i = 0; i < mountains.length; i++) {
			mountainHeight += sampleMountain(col, layer, mountains[i]);
		}

		var cloudHeight = 0;
		cloudHeight += cloudLevelSlider.value();
		cloudHeight += sampleCloudNoise(col, layer);
		for (i = 0; i < clouds.length; i++) {
			cloudHeight += sampleCloud(col, layer, clouds[i]);
		}


		var height = max(mountainHeight, cloudHeight, mistLevelSlider.value());


		ellipse(x, y - cloudHeight,
			sampleCloudNoise(col, layer) * 0.5 + 30,
			sampleCloudNoise(col, layer) * 0.5 + 30);


		//mist
		ellipse(x, y - mistLevelSlider.value(),
			30 + sampleCloudNoise(col, layer),
			30 + sampleCloudNoise(col, layer));


		// snap to grid
		// height = floor(height / 40) * 40;

		vertex(x, y - height);
	}
	vertex(640, y);
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

// find the height contribution at x, y from the provided moutain data
function sampleCloud(x, y, cloud) {
	var distance = dist(x, y, cloud.x, cloud.y);
	// height of the cloud is inverse of distance from peak
	var height = constrain(cloud.height - distance, 0, cloud.height);
	height *= cloudScaleSlider.value();
	return height;
}


// find the height contribution at x, y from the noise
function sampleNoise(x, y) {
	var noiseScale = noiseRoughSlider.value() * 0.01;
	var sample = noise(x * noiseScale, y * noiseScale);
	sample = sample * noiseScaleSlider.value();
	return sample;

}


// find the height contribution at x, y from the noise
function sampleCloudNoise(x, y) {
	var noiseScale = cloudNoiseRoughSlider.value() * 0.01;
	var sample = noise(x * noiseScale, y * noiseScale);
	sample = sample * cloudNoiseScaleSlider.value();
	return sample;

}
