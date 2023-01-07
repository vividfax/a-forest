// ---- VARIABLES ---- //
let terrain = `grass`;
const footStepsGrass = {};
const footStepsGrassLength = 5;
const footStepsGrassPriority = 5;

const footStepsFlowers = {};
const footStepsFlowersLength = 5;
const footStepsFlowersPriority = 5;

const leaves = {};
const leavesLength = 5;
const leavesPriority = 10;

const plantingSound = {};
const plantingSoundLength = 4;
const plantingSoundPriority = 8;

const letterOpenSound = {};
const letterOpenSoundLength = 4;
const letterOpenSoundPriority = 20;

const turnLetterSound = {};
const turnLetterSoundLength = 4;
const turnLetterSoundPriority = 20;

const typingSound = new SoundObj();
const typingSoundPriority = 15;

const bumpSound = new SoundObj();
const bumpSoundPriority = 7;

const resetSound = new SoundObj();
const resetSoundPriority = 20;

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

const maxSounds = 5;

// ---- SOUND MANAGER OBJECT ---- //
const soundManager = {
  // Map of sounds that are currently playing
  currentSounds: new Map(),

  // Queue of next sounds to be played
  soundsQueue: [],

  addCurrentSound: function (player, soundObject) {
    this.currentSounds.set(player, soundObject);
  },
  removeCurrentSound: function (player) {
    this.currentSounds.delete(player);
  },
  getCurrentSounds: function () {
    for (let [key, value] of this.currentSounds) {
      console.log(key + " = " + value.name + `, priority = ${value.priority}`);
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
    for (let sound of this.soundsQueue) {
      console.log(`${sound.name}, priority = ${sound.priority}`);
    }
    console.log(`END------------`);
  },
};

// ---- SOUND OBJECT ---- //
function SoundObj(name, player, priority) {
  this.name = name;
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
      soundName,
      // for path to work currently, all mp3 need a number suffix
      new Tone.Player(`${path}${i + 1}.mp3`).toDestination(),
      priority
    );
    sound[i].player.onstop = () => {
      onStopped(sound[i].player, soundName);
    };
  }
}

function loadSound(sound, name, path, priority) {
  sound.name = name;
  sound.player = new Tone.Player(`${path}.mp3`).toDestination();
  sound.priority = priority;
  sound.player.onstop = () => {
    onStopped(sound.player);
  }
}

function onStopped(player) {
    soundManager.removeCurrentSound(player);
}

// ---- TRIGGERS ---- //

//Add a single sound
function addSound(soundObj) {
  if (soundObj.player.state === "started") {
    console.log(`${soundObj.name} is already playing`);
    return;
  }
  if (soundManager.soundsQueue.includes(soundObj)) {
    console.log(`${soundObj.name} sound already in queue`);
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

function addRandomSound(soundTypeArray, soundArraySize) {
  let x = randomBag(soundArraySize);
  let isInArray = false;

  do {
    if (soundManager.soundsQueue.includes(soundTypeArray[x[0]])) {
      x.shift();
      isInArray = true;
    } else isInArray = false;
  } while (isInArray && x.length > 0);
  if (x.length == 0) {
    console.log(`all potential sounds in queue`);
    return;
  }
  soundManager.addSoundToQueue(soundTypeArray[x[0]]);
}

function flushQueue() {
  if (
    soundManager.currentSounds.size + soundManager.soundsQueue.length <=
    maxSounds
  ) {
    console.log(`Sound: --------`);
    console.log(`Sound: queue + current = ${soundManager.currentSounds.size + soundManager.soundsQueue.length}`);
    // play sounds and add to current sounds map
    while (soundManager.soundsQueue.length > 0) {
      soundManager.soundsQueue[0].player.start();
      soundManager.addCurrentSound(
        soundManager.soundsQueue[0].player,
        soundManager.soundsQueue[0]
      );
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
      soundManager.addCurrentSound(
        soundManager.soundsQueue[0].player,
        soundManager.soundsQueue[0]
      );
      soundManager.removeSoundFromQueue();
      continue;
    }
    // get the lowest priority sound from currently playing map
    const lowestPrioritySound = getLowestPrioritySound();
    if (lowestPrioritySound.priority < soundManager.soundsQueue[0].priority) {
      // replace current sound with new sound
      lowestPrioritySound.player.stop();
      soundManager.removeCurrentSound(lowestPrioritySound.player);
      soundManager.soundsQueue[0].player.start();
      soundManager.addCurrentSound(
        soundManager.soundsQueue[0].player,
        soundManager.soundsQueue[0]
      );
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

  // iterate through current sounds map. key = player object, value = sound object
  for (const [key, soundObj] of soundManager.currentSounds) {
    if (soundObj.priority < temp.soundObj.priority) {
      temp.key = key;
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
