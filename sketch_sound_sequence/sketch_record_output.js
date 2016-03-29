// This example shows how to use p5.soundRecorder
// and p5.soundFile to record and download a .wav
// file containing the sounds your sketch makes.
//
// See also [p5.SoundRecorder Reference](http://p5js.org/reference/#/p5.SoundRecorder)


// **setup()** is called by p5 kick off the program.
function setup() {
    createCanvas(640, 360);

    // Create an instance of MonoSynth to play the notes.
    var synth = new MonoSynth();

    // Pass a hardcoded song to the synth.
    synth.playNotes([
        [60, 1 / 2],
        [62, 1 / 2],
        [64, 1 / 2],
        [65, 1 / 2],
        [67, 1 / 2],
        [69, 1 / 2],
        [71, 1 / 2]
    ]);

    // Declare and create the soundRecorder and soundFile.
    var soundRecorder = new p5.SoundRecorder();
    var soundFile = new p5.SoundFile();

    // Tell `soundRecorder` to start recording to `soundFile`.
    soundRecorder.record(soundFile);

    // Use `setTimeout` to schedule a function to be run later.
    // The first parameter is an entire function.
    // The second parameter is the time from now when we want
    // the function to run, in milliseconds.
    setTimeout(function() {
        console.log("Recording Complete");
        soundRecorder.stop();
    }, 4000);


    // Create a play button with p5.dom
    playButton = createButton("Play Recording");

    // Provide the function we want to be run when
    // the button is pressed.
    playButton.mousePressed(function() {
        soundFile.play();
    });

    // Create a download button with p5.dom
    saveButton = createButton("Download .wav");

    // Provide the function we want to be run when
    // the button is pressed.
    saveButton.mousePressed(function() {
        save(soundFile, "output.wav");
    });
}
