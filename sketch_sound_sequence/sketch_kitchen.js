var leadSynth, bassSynth;
var soundRecorder, soundFile;

function setup() {
  createCanvas(640, 360);
  MonoSynth.prototype.reportNote = showNote;
  background(50);

  songId = floor(random(100000));


  playNextSong();
  setInterval(function () {
    playNextSong();
  }, 9000);
}


function playNextSong() {
  var songId = floor(random(100000));
  background(50);
  textSize(32);
  fill(255);
  text("Song: " + songId, 10, 40);
  playASong(songId);
}

function playASong(seed) {
  var params = randomizeParams(seed);
  console.log(JSON.stringify(params, null, " "));

  var bassline = makeBassline(params.bass);
  var lead = makeLead(params.lead);

  bassSynth = new MonoSynth();
  configureSynth(bassSynth, params.bass);
  bassSynth.amplitude = 0.25;
  bassLine = quickMusic.imposePhrase(bassline, quickMusic.nameToMIDI(params.tonic, params.bass.octave), params.scale);
  bassSynth.playNotes(bassLine);

  leadSynth = new MonoSynth();
  configureSynth(leadSynth, params.lead);
  bassSynth.amplitude = 0.5;
  lead = quickMusic.imposePhrase(lead, quickMusic.nameToMIDI(params.tonic, params.lead.octave), params.scale);
  leadSynth.playNotes(lead);

  text(params.tonic + " " + params.scaleName, 10, height - 40);
}



function randomizeParams(seed) {
  songSeed = seed || floor(random(1000000));

  console.log("Song Seed", songSeed);
  randomSeed(songSeed);

  params = {};
  params.tonic = sample(quickMusic.noteNames);
  params.scaleName = sample(Object.keys(quickMusic.scales));
  params.scale = quickMusic.scales[params.scaleName];

  params.lead = {};
  params.lead.name = "Lead";
  params.lead.octave = sample([2, 3, 3, 4, 5]);
  params.lead.waveType = sample(['sine', 'triangle', 'sawtooth', 'square']);
  params.lead.spacing = random(-0.1, 0.15);
  params.lead.decay = min(random(), random(), random());
  params.lead.seed = floor(random(10000));
  params.lead.phraseShift = sample([-3, -2, -2, -1, 1, 2, 5, 7, 14]);
  params.lead.brownianSteps = [-2, -1, -1, -1, 0, 1, 1, 1, 2];
  params.lead.noteLengths = sample([
    [1 / 2, 1 / 4, 1 / 4, 1 / 4, 1 / 8, 1 / 8],
    [1 / 2, 1 / 4],
    [1 / 8],
    [1 / 2, 1 / 16, 1 / 16, 1 / 16],
    [1 / 3, 1 / 6]
  ]);
  params.lead.restChance = sample([0, 0.2, 0.2, 0.2, 0.5]);

  params.bass = {};
  params.bass.name = "Bass";
  params.bass.octave = sample([1, 2, 2, 3, 4]);
  params.bass.waveType = sample(['sine', 'triangle', 'sawtooth', 'square']);
  params.bass.spacing = random(-0.1, 0.15);
  params.bass.decay = min(random(), random(), random());
  params.bass.seed = floor(random(10000));

  return params;
}

function configureSynth(synth, synthParams) {
  synth.name = synthParams.name;
  synth.oscillator.setType(synthParams.waveType);
  synth.spacing = synthParams.spacing;
  synth.envelope.setADSR(0.01, 0.05, 0.75, synthParams.decay);
}


function makeBassline(params) {
  randomSeed(params.seed);

  var phrase = [];
  var beats = sample([1, 2, 4]);
  for (var i = 0; i < 4; i++) {
    var position = sample([0, 3, 4]);
    for (var beat = 0; beat < beats; beat++) {
      phrase.push([position, 1 / beats]);
    }
  }
  phrase = phrase.concat(phrase);

  // remove last measure of beats
  phrase = phrase.slice(0, phrase.length - beats);

  // add a long tonic note
  phrase.push([0, 1]);
  return phrase;

}


function makeLead(params) {
  randomSeed(params.seed);

  var fullPhrase = [];
  var introPhrase = makePhrase(params);
  var middlePhrase = makePhrase(params);
  var alternatePhrase = quickMusic.shiftPhrase(middlePhrase, params.phraseShift);
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
  return fullPhrase;
}



function makePhrase(params) {
  var phrase = [];

  var position = floor(random(7));
  var lengthLeft = 1;


  while (lengthLeft > 0) {
    position += sample(params.brownianSteps);
    var length = sample(params.noteLengths);
    length = constrain(length, 0, lengthLeft);

    if (random() < params.restChance) {
      phrase.push(["rest", length]);
    }
    else {
      phrase.push([position, length]);
    }

    lengthLeft -= length;
  }

  return phrase;
}


function showNote(synth, note, length, time) {
  // console.log("Note Played.", synth.name, note, quickMusic.midiToName(note), length);

  push();
  noStroke();
  if (synth === leadSynth) {
    fill(0, 250, 150);
  }
  if (synth === bassSynth) {
    fill(0, 150, 250);
  }
  rect(map(time, 0, 8, 0, width), map(note, 0, 96, height, 0), map(length, 0, 8, 0, width) - 2, 7, 3, 3, 3, 3);
  pop();
}


function sample(a) {
  return a[floor(random(a.length))];
}
