// -------- MEDIA --------
const pianoMelodies = [],
  pianoMelodiesLength = 7;
const synthLoops = [],
  synthLoopsLength = 5;
// --------------------------------------------------
// --------------------------------------------------

// -------- VARIABLES --------
let substr;
let pianoIds = [];
let currentLoopIndex = 0;

// --------------------------------------------------
// --------------------------------------------------

// -------- INITIALISATION --------

function musicLoadSounds() {
  //Populates piano melodies array
  for (let i = 0; i < pianoMelodiesLength; i++) {
    pianoMelodies.push(
      new Tone.Player(`Music/Piano/PianoMelody${i + 1}.mp3`).toDestination()
    );
    pianoMelodies[i].name = `Piano${i}`;
  }

  let index = 1;
  // populates SynthLoop array
  for (let i = 0; i < synthLoopsLength * 2; i += 2) {
    synthLoops[i] = new Tone.Player().toDestination();
    synthLoops[i + 1] = new Tone.Player().toDestination();
    initPlayer(
      synthLoops[i],
      `Music/SynthLoops/synthloop${index}.mp3`,
      `synthloop${index}`
    );
    initPlayer(
      synthLoops[i + 1],
      `Music/SynthLoops/synthloop${index}.mp3`,
      `synthloop${index}Crossfade`,
      "2m"
    );
    index++;
  }
}

function initPlayer(player, path, name, fadeIn = 0, fadeOut = "2m") {
  player.load(path);
  player.name = name;
  player.fadeIn = fadeIn;
  player.fadeOut = fadeOut;
}

function initMusicSettings() {
  // -------- set tempo and loop points for transport --------
  Tone.Transport.position = "1:0:0";
  Tone.Transport.bpm.value = 60;
  Tone.Transport.setLoopPoints("1:0:0", "13:0:0");
  Tone.Transport.loop = true;
  // --------------------------------------------------
  // -------- schedule events --------
  // Bar 1 Beat 1
  scheduleStartEventOnTimeline(synthLoops[0], "1:0:0", 0);
  scheduleStopEventOnTimeline(synthLoops[1], "1:0:0");

  // Bar 2 Beat 1
  scheduleFade(synthLoops[0], "2:0:0", "fadeIn", "2m");

  // Bar 7 Beat 1
  scheduleStopEventOnTimeline(synthLoops[0], "7:0:0");
  scheduleStartEventOnTimeline(synthLoops[1], "7:0:0");
  // --------------------------------------------------
}

// --------------------------------------------------
// --------------------------------------------------

// -------- TRIGGERS --------

function schedulePiano(numberOfMelodies) {
  Tone.Transport.schedule((time) => {
    while (pianoIds.length > 0) {
      // clears all previous piano events
      Tone.Transport.clear(pianoIds[0]);
      pianoIds.shift();
    }
    if (numberOfMelodies === 0) return;
    pianoIds = generateRandomPianoMelodies(numberOfMelodies);
  }, "1:0:0");
}

function generateRandomPianoMelodies(numberOfMelodies) {
  let eventIDs = [];
  let randomIndexes = randomBag(pianoMelodiesLength);
  let randomStartTime = randomBag(11);

  for (let i = 0; i < numberOfMelodies; i++) {
    const eventId = scheduleStartEventOnTimeline(
      pianoMelodies[randomIndexes[0]],
      //triggering an event on bar 1 beat 1 doesn't work from here (long story), so instead we just defer to bar 1 beat 2
      randomStartTime[0] === 0
        ? randomStartTime[0] + 1 + ":1:0"
        : randomStartTime[0] + 1 + ":0:0"
    );
    // console.log(`Random Number = ${randomStartTime[0] + 1}`);
    randomIndexes.shift();
    randomStartTime.shift();
    eventIDs.push(eventId);
  }
  return eventIDs;
}

function scheduleStopEventOnTimeline(player, stopTime) {
  let eventId = Tone.Transport.schedule((time) => {
    player.stop(time);
  }, stopTime);
  return eventId;
}

function scheduleStartEventOnTimeline(
  player,
  startTime,
  index = currentLoopIndex
) {
  let eventId = Tone.Transport.schedule((time) => {
    player.start(time);
    currentLoopIndex = index;
    // console.log(`Name = ${player.name}, Position = ${Tone.Transport.position}`);
  }, startTime);
  return eventId;
}

function scheduleFade(player, startTime, fadeType, fadeTime) {
  let eventId = Tone.Transport.schedule((time) => {
    if (fadeType === "fadeIn") player.fadeIn = fadeTime;
    else if (fadeType === "fadeOut") player.fadeOut = fadeTime;
    else console.log(`incorrect fade type given`);
  }, startTime);
  return eventId;
}

function checkMusicTransition() {
  // call changeMusicIntensityLevel(currentLoopIndex,nextLoopIndex,pianoMelodies)
  // currentLoopIndex is set automatically
  // section 1 = 0, section 2 = 2, section 3 = 4, section 4 = 6, section 5 = 8

  // -------- transition to section 1 --------
  if (treesOnScreen < 5 && currentLoopIndex !== 0) {
    changeMusicIntensityLevel(currentLoopIndex, 0, 0);
  }

  // -------- transition to section 2 --------
  if (treesOnScreen >= 5 && treesOnScreen < 10 && currentLoopIndex !== 2) {
    changeMusicIntensityLevel(currentLoopIndex, 2, 3);
  }

  // -------- transition to section 3 --------
  if (treesOnScreen >= 10 && treesOnScreen < 15 && currentLoopIndex !== 4) {
    changeMusicIntensityLevel(currentLoopIndex, 4, 5);
  }

  // -------- transition to section 4 --------
  if (treesOnScreen >= 15 && treesOnScreen < 20 && currentLoopIndex !== 6) {
    changeMusicIntensityLevel(currentLoopIndex, 6, 7);
  }
  // -------- transition to section 5 --------
  if (treesOnScreen >= 20 && currentLoopIndex !== 8) {
    changeMusicIntensityLevel(currentLoopIndex, 8, 0);
  }
}

function changeMusicIntensityLevel(
  currentLoopIndex,
  nextLoopIndex,
  pianoMelodies
) {
  Tone.Transport.cancel(); // clears all scheduled events
  synthLoops[currentLoopIndex].stop();
  synthLoops[currentLoopIndex + 1].stop();
  synthLoops[nextLoopIndex].fadeIn = 0;
  const substr = Tone.Transport.position.split(":");
  const currentBar = int(substr[0]);
  const nextBar = currentBar + 1 + ":0:0";

  // console.log("Current pos = " + Tone.Transport.position);
  // console.log("Next bar = " + nextBar);

  // Bar 1 Beat 1
  scheduleStartEventOnTimeline(
    synthLoops[nextLoopIndex],
    "1:0:0",
    nextLoopIndex
  );
  scheduleStopEventOnTimeline(synthLoops[nextLoopIndex + 1], "1:0:0");
  schedulePiano(pianoMelodies);

  // Bar 2 Beat 1
  scheduleFade(synthLoops[nextLoopIndex], "2:0:0", "fadeIn", "2m");

  // Bar 7 Beat 1
  scheduleStopEventOnTimeline(synthLoops[nextLoopIndex], "7:0:0");
  scheduleStartEventOnTimeline(synthLoops[nextLoopIndex + 1], "7:0:0");

  // On next bar
  let transportReset = Tone.Transport.schedule((time) => {
    Tone.Transport.position = "1:0:0";
    // console.log(`--------RESET TO SECTION ${nextLoopIndex}--------`);
  }, nextBar);

  Tone.Transport.schedule((time) => {
    Tone.Transport.clear(transportReset);
  }, nextBar);
}
// --------------------------------------------------
// --------------------------------------------------

function randomBag(length) {
  let arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(i);
  }
  return shuffleArr(arr);
}

function shuffleArr(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
