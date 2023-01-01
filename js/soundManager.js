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

const typingSound = new SoundObj();
const typingSoundPriority = 15;

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
    `SFX/Leaves/Leaves`,
    leavesPriority
  );
  loadSound(typingSound,`typing`, `SFX/Typing`, typingSoundPriority);
  typingSound.player.loop = true;
  typingSound.player.fadeOut = 1;
}

// function setup() {
//   createButtons();
//   createCanvas(windowWidth, windowHeight);
//   background(220);
//   // frameRate(5);
// }

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
    // UI version
    // onStopped(sound.player, name);
  }
}

// UI version of onStopped
// function onStopped(player, soundName) {
//     const row = document.getElementById(`ID${soundName}`);
//     row.remove();
//     soundManager.removeCurrentSound(player);
// }

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
  // generateTableFromArray(soundsQueueTable, soundManager.soundsQueue);
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
  // generateTableFromArray(soundsQueueTable, soundManager.soundsQueue);
}

function flushQueue() {
  if (
    soundManager.currentSounds.size + soundManager.soundsQueue.length <=
    maxSounds
  ) {
    // play sounds and add to current sounds map
    while (soundManager.soundsQueue.length > 0) {
      soundManager.soundsQueue[0].player.start();
      soundManager.addCurrentSound(
        soundManager.soundsQueue[0].player,
        soundManager.soundsQueue[0]
      );
      // generateTable(currentlyPlayingSoundsTable, soundManager.currentSounds);
      // removeTableRow();
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
      // generateTable(currentlyPlayingSoundsTable, soundManager.currentSounds);
      // removeTableRow();
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
      // generateTable(currentlyPlayingSoundsTable, soundManager.currentSounds);
      // removeTableRow();
      soundManager.removeSoundFromQueue();
      continue;
    }
    // if execution reaches here it means that there are no sounds left in the queue that are of higher priority than the currently playing sounds, this means they can be discarded.
    while(soundManager.soundsQueue.length > 0) {
      // removeTableRow();
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
