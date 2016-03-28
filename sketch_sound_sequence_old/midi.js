var xhr = new XMLHttpRequest();
xhr.open("GET", "assets/C.mid", true);
xhr.responseType = "arraybuffer";
xhr.addEventListener("load", readMIDI);
xhr.send();



function readMIDI(e) {
    var xhr = e.currentTarget;
    if (xhr.status !== 200) {
        console.error("Problem Loading MIDI");
        return;
    }
    console.log("READING MIDI", xhr.response);

    var midiFile = new MIDIFile(xhr.response);
    console.log("tracksCount", midiFile.header.getTracksCount());
    var events = midiFile.getMidiEvents();
    console.log("events", events);
    for (i = 0; i < 10000; i++) {
        var e = events[i];
        if (e.subtype !== 9) continue;
        console.log("event", e, e.track, e.channel, e.type, e.subtype);

        setTimeout(playMIDI, e.playTime,
            e.param1,
            0.1);


    }
}
