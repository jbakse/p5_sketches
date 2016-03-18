// sketch.js
function setup() {
	createCanvas(400, 400);


	a = Pluck();

	// a.play(Rndi(220, 880), 1 / 8);

	// a.blend = Add(0.5, Sine(0.05, 0.5)._)

}

function draw() {
	var x = mouseX / width;
	a.amp = x;

	// a.frequency = x * 880;
}
