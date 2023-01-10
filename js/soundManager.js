// ---- VARIABLES ---- //
const terrain = `grass`;
const footStepsGrass = {};
const footStepsGrassLength = 5;
const footStepsGrassPriority = 5;

const footStepsFlowers = {};
const footStepsFlowersLength = 5;
const footStepsFlowersPriority = 5;

const leafTotree = {};
const leafTotreeLength = 4;
const leafTotreePriority = 11;

const leaves = {};
const leavesLength = 10;
const leavesPriority = 10;
const maxLeaves = 2;
let noOfLeaves = 0;

const letterOpenSound = {};
const letterOpenSoundLength = 4;
const letterOpenSoundPriority = 20;

const turnLetterSound = {};
const turnLetterSoundLength = 4;
const turnLetterSoundPriority = 20;

const plantingSound = new SoundObj();
const plantingSoundPriority = 8;

const typingSound = new SoundObj();
const typingSoundPriority = 15;

const bumpSound = new SoundObj();
const bumpSoundPriority = 7;

const resetSound = new SoundObj();
const resetSoundPriority = 100;

const windSound = new SoundObj();
const windSoundPriority = 7;

const houseBrokenSound = new SoundObj();
const houseBrokenSoundPriority = 12;

const houseFixedSound = new SoundObj();
const houseFixedSoundPriority = 12;

const animalSound = new SoundObj();
const animalSoundPriority = 8;

const seaLoop = new SoundObj();
const seaLoopPriority = 20;

const seagull = new SoundObj();
const seagullPriority = 10;

const splash = new SoundObj();
const splashPriority = 6;

const randomPanner = new Tone.Panner(0).toDestination();

const maxSounds = 5;
const volOffset = 12;

// ---- SOUND MANAGER OBJECT ---- //
const soundManager = {
  // Map of sounds that are currently playing
  currentSounds: new Map(),

  // Queue of next sounds to be played
  soundsQueue: [],

  addCurrentSound: function (playerName, soundObj) {
    this.currentSounds.set(playerName, soundObj);
  },
  removeCurrentSound: function (playerName) {
    this.currentSounds.delete(playerName);
  },
  getCurrentSounds: function () {
    for (let [name, soundObj] of this.currentSounds) {
      console.log(name + " = " + `, priority = ${soundObj.priority}`);
    }
  },
  addSoundToQueue: function (soundObj) {
    this.soundsQueue.push(soundObj);
  },
  removeSoundFromQueue: function () {
    this.soundsQueue.shift();
  },
  getSoundsQueue: function () {
    console.log(`START------------`);
    for (let soundObj of this.soundsQueue) {
      console.log(`${soundObj.player.name}, priority = ${soundObj.priority}`);
    }
    console.log(`END------------`);
  },
};

// ---- SOUND OBJECT ---- //
function SoundObj(player, priority) {
  this.player = player;
  this.priority = priority;
}

// ---- LOAD SOUNDS HERE ---- //
function preloadSounds() {
  // you can adjust volume levels from here
  loadSounds(footStepsFlowers, footStepsFlowersLength, `footstepFlowers`, `SFX/FootstepsFlowers/Step`, footStepsFlowersPriority, -24 + volOffset, 1);
  loadSounds(footStepsGrass, footStepsGrassLength, `footstepGrass`, `SFX/FootstepsGrass/Step`, footStepsGrassPriority, -24 + volOffset, 1);
  loadSounds(leafTotree, leafTotreeLength, `leafToTree`, `SFX/LeafToTree/leafToTree`, leafTotreePriority, -24 + volOffset, 1);
  loadSounds(leaves, leavesLength, `leaves`, `SFX/Leaves/Leaves`, leavesPriority, -20 + volOffset, 1);
  // connect leaf sounds to stereo panner
  for(let i = 0; i < leavesLength; i++) {
    leaves[i].player.connect(randomPanner);
  }

  loadSounds(letterOpenSound, letterOpenSoundLength, `letterOpenSound`, `SFX/OpenLetter/OpenLetter`, letterOpenSoundPriority, -9 + volOffset, 1);
  loadSounds(turnLetterSound, turnLetterSoundLength, `turnLetterSound`, `SFX/TurnLetter/TurnLetter`, turnLetterSoundPriority, -9 + volOffset, 1);

  loadSound(animalSound, `animal`, `SFX/animal`, animalSoundPriority, -12 + volOffset);
  loadSound(bumpSound, `bump`, `SFX/bump`, bumpSoundPriority, -24 + volOffset);
  bumpSound.player.fadeOut = 1;
  loadSound(houseBrokenSound, `houseBroken`, `SFX/houseBroken`, houseBrokenSoundPriority, -12 + volOffset);
  loadSound(houseFixedSound, `houseFixed`, `SFX/houseFixed`, houseFixedSoundPriority, -24 + volOffset);
  loadSound(plantingSound, `plantingSound`, `SFX/Planting1`, plantingSoundPriority, -24 + volOffset);
  loadSound(resetSound, `reset`, `SFX/ResetButton`, resetSoundPriority, -24 + volOffset);
  loadSound(seagull, `seagull`, `SFX/seagull`, seagullPriority, -24 + volOffset);
  loadSound(seaLoop, `seaLoop`, `SFX/sealoop`, seaLoopPriority, -24 + volOffset);
  seaLoop.player.loop = true;
  seaLoop.player.fadeOut = 1;
  loadSound(splash, `splash`, `SFX/splash`, splashPriority, -15);
}

// ---- TEMPLATE FOR LOADING SOUNDS ---- //
function loadSounds(sound, noOfSounds, name, path, priority, volume = 0, fadeOut = 0) {
  for (let i = 0; i < noOfSounds; i++) {
    const soundName = name + `${i + 1}`;
    sound[i] = new SoundObj(
      // for path to work currently, all mp3 need a number suffix
      new Tone.Player(`${path}${i + 1}.mp3`).toDestination(),
      priority
    );
    sound[i].player.onstop = () => {
      onStopped(soundName);
    };
    sound[i].player.name = soundName;
    sound[i].player.volume.value = volume;
    sound[i].player.fadeOut = fadeOut;
  }
}

function loadSound(sound, name, path, priority, volume = 0) {
  sound.player = new Tone.Player(`${path}.mp3`).toDestination();
  sound.player.name = name;
  sound.priority = priority;
  sound.player.onstop = () => {
    onStopped(name);
  };
  sound.player.volume.value = volume;
}

function onStopped(soundName) {
  // console.log(`removing ${soundName} sound`);
  soundManager.removeCurrentSound(soundName);
}

// ---- TRIGGERS ---- //

//Add a single sound
function addSound(soundObj) {
  if (soundObj.player.state === "started") {
    // console.log(`${soundObj.player.name} is already playing`);
    return;
  }
  if (soundManager.soundsQueue.includes(soundObj)) {
    // console.log(`${soundObj.player.name} sound already in queue`);
    return;
  }
  soundManager.addSoundToQueue(soundObj);
}

function randomBag(length) {
  let arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(i);
  }
  return shuffleArr(arr);
}

function shuffleArr(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function addRandomSound(soundArray, length) {
  let x = randomBag(length);

  for (let i = 0; i < length; i++) {
    if (soundManager.soundsQueue.includes(soundArray[x[i]])) continue;

    // console.log(`adding ${soundArray[x[i]].player.name} to queue`);
    soundManager.addSoundToQueue(soundArray[x[i]]);
    return;
  }
}

function flushQueue() {
  
  if (
    soundManager.currentSounds.size + soundManager.soundsQueue.length <=
    maxSounds
  ) {
  //  console.log(`Sound: ${soundManager.soundsQueue[0].player.state}`);
    // play sounds and add to current sounds map
    while (soundManager.soundsQueue.length > 0) {
      
      soundManager.soundsQueue[0].player.start();
      soundManager.addCurrentSound(
        soundManager.soundsQueue[0].player.name,
        soundManager.soundsQueue[0]
      );
      // console.log(`-------- TOTAL SOUNDS = ${soundManager.currentSounds.size}`);
      soundManager.removeSoundFromQueue();
    }
    noOfLeaves = 0;
    return;
  }
  // if max sound limit reached
  // sort queue based on priority
  soundManager.soundsQueue.sort(function (a, b) {
    return b.priority - a.priority;
  });
  while (soundManager.soundsQueue.length > 0) {
    if (soundManager.currentSounds.size + 1 <= maxSounds) {
      soundManager.soundsQueue[0].player.start();
      soundManager.addCurrentSound(soundManager.soundsQueue[0].player.name, soundManager.soundsQueue[0]);
      soundManager.removeSoundFromQueue();
      continue;
    }
    // get the lowest priority sound from currently playing map
    const lowestPrioritySound = getLowestPrioritySound();
    if (lowestPrioritySound.priority <= soundManager.soundsQueue[0].priority) {
      // replace current sound with new sound
      // console.log(`Sound: forced ${lowestPrioritySound.player.name} to stop`);
      lowestPrioritySound.player.stop();
      soundManager.soundsQueue[0].player.start();
      soundManager.addCurrentSound(soundManager.soundsQueue[0].player.name, soundManager.soundsQueue[0]);
      soundManager.removeSoundFromQueue();
      continue;
    }
    // if execution reaches here it means that there are no sounds left in the queue that are of higher priority than the currently playing sounds, this means they can be discarded.
    while(soundManager.soundsQueue.length > 0) {
      soundManager.removeSoundFromQueue();
    }
    noOfLeaves = 0;
    return;
  }
}

function getLowestPrioritySound() {
  let temp = { key: 42, soundObj: { priority: Number.MAX_SAFE_INTEGER } };
  

  // iterate through current sounds map. key = player name, value = sound object
  for (const [soundName, soundObj] of soundManager.currentSounds) {
    if (soundObj.priority < temp.soundObj.priority) {
      temp.key = soundName;
      temp.soundObj = soundObj;
    }
  }
  return temp.soundObj;
}

function changeTerrain(nextTerrain) {
  if (nextTerrain === `grass`) terrain = `grass`;
  else if (nextTerrain === `flower`) terrain = `flower`;
}

function stopLoopingSound(player) {
  player.stop();
}

function randomPanAssignment() {
  randomPanner.pan.value = random(-1, 1)
}
