var synth;

function setup() {
	createCanvas(640, 360);
  
	synth = new MonoSynth();
	synth.playNotes(makeSongOrganized());


}



function makeSongOrganized() {


    var fullPhrase = [];
    var introPhrase = makePhrase();
    var middlePhrase = makePhrase();
    var alternatePhrase = quickMusic.shiftPhrase(middlePhrase, -2);
    var concludingPhrase = quickMusic.clonePhrase(middlePhrase);
    concludingPhrase[concludingPhrase.length - 1][0] = 0;

    fullPhrase = fullPhrase.concat(
        introPhrase,
        middlePhrase,
        alternatePhrase,
        middlePhrase,

        introPhrase,
        middlePhrase,
        alternatePhrase,
        concludingPhrase
    );



    return quickMusic.imposePhrase(fullPhrase, quickMusic.nameToMIDI("C", 3), quickMusic.minorScale);


}



function makePhrase() {
    var phrase = [];

    var position = floor(random(7));
    var lengthLeft = 1;


    while (lengthLeft > 0) {
        position += sample([-2, -1, -1, -1, 0, 1, 1, 1, 2]);

        var length = sample([1 / 2, 1 / 4, 1 / 4, 1 / 4, 1 / 8, 1 / 8]);
        length = constrain(length, 0, lengthLeft);

        if (random() < 0.2) {
            phrase.push(["rest", length]);
        } else {
            phrase.push([position, length]);
        }

        lengthLeft -= length;
    }

    return phrase;
}



function sample(a) {
	return a[floor(random(a.length))];
}
