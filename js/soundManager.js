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
  soundManager.removeCurrentSound(soundName);
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

function shuffleArr(array, length) {
  let randomIndex;
  for (let i = 0; i < length; i++) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * i);

    // And swap it with the current element.
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

function addRandomSound(soundArray, length) {
  shuffleArr(soundArray, length);
  console.log(`sound in current? ${soundManager.currentSounds.has(soundArray[0].player.name)}`);
/*
  for (let i = 0; i < length; i++) {
    if (
      soundManager.soundsQueue.includes(soundArray[i]) ||
      soundManager.currentSounds.has(soundArray[i].player)
    )
      continue;
    console.log(`adding ${soundArray[i].name} to queue`);
    soundManager.addSoundToQueue(soundArray[i]);
    return;
  }
  */
}

function flushQueue() {
  console.log(`-------- TOTAL SOUNDS = ${soundManager.currentSounds.size + soundManager.soundsQueue.length}`);
  if (
    soundManager.currentSounds.size + soundManager.soundsQueue.length <=
    maxSounds
  ) {
   console.log(`Sound: ${soundManager.soundsQueue[0].player.state}`);
    // play sounds and add to current sounds map
    while (soundManager.soundsQueue.length > 0) {
      if(soundManager.soundsQueue[0].player.state === "stopped") {
        soundManager.soundsQueue[0].player.start();
        soundManager.addCurrentSound(
          soundManager.soundsQueue[0].player,
          soundManager.soundsQueue[0]
        );
      }
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
      console.log(`Sound: forced sound to stop`);
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
