// ---- VARIABLES ---- //
let terrain = `grass`;
let footStepsGrass = {};
let footStepsGrassLength = 5;
let footStepsGrassPriority = 5;

let footStepsFlowers = {};
let footStepsFlowersLength = 5;
let footStepsFlowersPriority = 5;

let leaves = {};
let leavesLength = 5;
let leavesPriority = 10;

let plantingSound = {};
let plantingSoundLength = 4;
let plantingSoundPriority = 8;

let letterOpenSound = {};
let letterOpenSoundLength = 4;
let letterOpenSoundPriority = 20;

let turnLetterSound = {};
let turnLetterSoundLength = 4;
let turnLetterSoundPriority = 20;

let typingSound = new SoundObj();
let typingSoundPriority = 15;

let bumpSound = new SoundObj();
let bumpSoundPriority = 7;

let resetSound = new SoundObj();
let resetSoundPriority = 20;

let windSound = new SoundObj();
let windSoundPriority = 7;

let houseBrokenSound = new SoundObj();
let houseBrokenSoundPriority = 12;

let houseFixedSound = new SoundObj();
let houseFixedSoundPriority = 12;

let animalSound = new SoundObj();
let animalSoundPriority = 8;

let seaLoop = new SoundObj();
let seaLoopPriority = 20;

let seagull = new SoundObj();
let seagullPriority = 10;

let splash = new SoundObj();
let splashPriority = 6;

const maxSounds = 10;

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
  loadSounds(
    footStepsGrass,
    footStepsGrassLength,
    `footstepGrass`,
    `SFX/FootstepsGrass/step`,
    footStepsGrassPriority
  );
  loadSounds(
    footStepsFlowers,
    footStepsFlowersLength,
    `footstepFlowers`,
    `SFX/FootstepsFlowers/Step`,
    footStepsFlowersPriority
  );
  loadSounds(
    leaves,
    leavesLength,
    `leaves`,
    `SFX/Leaves/Leaves1/Leaves`,
    leavesPriority
  );
  loadSounds(
    plantingSound,
    plantingSoundLength,
    `plantingSound`,
    `SFX/PlantingTrees/Planting`,
    plantingSoundPriority
  );
  loadSounds(
    letterOpenSound,
    letterOpenSoundLength,
    `letterOpenSound`,
    `SFX/Letters/OpenLetter/OpenLetter`,
    letterOpenSoundPriority
  );

  loadSounds(
    turnLetterSound,
    turnLetterSoundLength,
    `turnLetterSound`,
    `SFX/Letters/TurnLetter/TurnLetter`,
    turnLetterSoundPriority
  );

  loadSound(typingSound, `typing`, `SFX/Typing`, typingSoundPriority);
  typingSound.player.loop = true;
  typingSound.player.fadeOut = 1;

  loadSound(seaLoop, `seaLoop`, `SFX/sealoop`, seaLoopPriority);
  seaLoop.player.loop = true;
  seaLoop.player.fadeOut = 1;

  loadSound(windSound, `wind`, `SFX/wind`, windSoundPriority);
  loadSound(bumpSound, `bump`, `SFX/bump`, bumpSoundPriority);
  loadSound(resetSound, `reset`, `SFX/ResetButton`, resetSoundPriority);
  loadSound(houseBrokenSound, `houseBroken`, `SFX/houseBroken`, houseBrokenSoundPriority);
  loadSound(houseFixedSound, `houseFixed`, `SFX/houseFixed`, houseFixedSoundPriority);
  loadSound(animalSound, `animal`, `SFX/animal`, animalSoundPriority);
  loadSound(seagull, `seagull`, `SFX/seagull`, seagullPriority);
  loadSound(splash, `splash`, `SFX/splash`, splashPriority);
}

// ---- TEMPLATE FOR LOADING SOUNDS ---- //
function loadSounds(sound, noOfSounds, name, path, priority) {
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
  }
}

function loadSound(sound, name, path, priority) {
  sound.player = new Tone.Player(`${path}.mp3`).toDestination();
  sound.player.name = name;
  sound.priority = priority;
  sound.player.onstop = () => {
    onStopped(name);
  };
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
      console.log(`-------- TOTAL SOUNDS = ${soundManager.currentSounds.size}`);
      soundManager.removeSoundFromQueue();
    }
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
      console.log(`Sound: forced ${lowestPrioritySound.player.name} to stop`);
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
