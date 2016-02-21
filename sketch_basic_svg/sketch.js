// shows how to use the p5.svg.js library to export a p5 drawing as svg

// requires p5.svg.js v0.5.2 and  p5.js v0.4.13
// https://github.com/zenozeng/p5.js-svg/releases
// https://github.com/processing/p5.js/releases


function setup() {
	// create a place to draw use "SVG" to activate the SVG p5 plugin
	createCanvas(6 * 72, 6 * 72, SVG);
	noLoop();
	fill(255, 0, 0);
	stroke(100);
	strokeWeight(3);

	// use p5.dom.js to create a button and set it up to call "save()"
	var button = createButton("Save SVG");
	button.mousePressed(function () {
		save();
	});
}


function draw() {
	// clear the background
	clear();

	// draw a 1-inch ellipse (72 pixels per inch)
	ellipse(1 * 72, height * 0.5, 72, 72);

	// push and pop will create a group in the exported svg
	push();
	ellipse(4 * 72, height * 0.5, 72, 72);
	ellipse(4.75 * 72, height * 0.5, 72, 72);
	pop();


}
