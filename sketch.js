let grid;
let player;
let mode = 0;
var ifrm; 
let worldWidth = 500;
let worldHeight = 500;
let cellSize = 50;
let renderScale = 0.5;

let lastMoveWasDiagonal = false;
let hasMoved = false;
//serverport variables
let serial; // variable to hold an instance of the serialport library
let portName = 'COM6';
let inData; // for incoming serial data
let byteCount = 0;
//
let playerImage;

let seedlingEmoji;
let plantEmojis = [];
let treeEmojis = [];
let leafEmojis = [];
let flowerEmojis = [];
let abandonedHouseEmojis = [];
let houseEmojis = [];
let animalEmojis = [];
let weatherEmojis = [];
let pawPrintsEmoji;
let mailboxEmojis = [];
let waterEmoji;
let waterAnimals = [];

let walkLeftImgs = [];
let walkRightImgs = [];
let walkUpImgs = [];
let walkDownImgs = [];

let postcardWritingImages = [];
let postcardPhotoImages = [];

let markov;

let justCopyPaste = false;

let plantsJson;
let poemsJson;
let happyJson;
let sadJson;
let links;
let mail;
let kaomojis;

let mailCount = 0;

let animals = [];
let weathers = [];

let interacted = false;
let moved = false;
let typed = false;
let typedSentence = false;

let cloudCanvas;
let weatherCanvas;

let timeHolding = 0;

let regularFont;
let postcardFont;

let walkCycle = -1;

let treesOnScreen = 0;
let waterOnScreen = false;
let waveCrashNextFrame = false;

let plantIsHappy = Math.random() < 0.5;
let markovIsHappy = Math.random() < 0.5;
let happyMarkov;
let sadMarkov;

let showFog = true;

let aboutDisplayed = false;
let housePanelOpen = false;

function preload() {

    plantsJson = loadJSON("./json/plants.json");
    poemsJson = loadJSON("./json/poems.json");
    happyJson = loadJSON("./json/happy.json");
    sadJson = loadJSON("./json/sad.json");

    links = loadJSON("./json/links.json");
    mail = loadJSON("./json/mail.json");
    kaomojis = loadJSON("./json/kaomoji.json");

    playerImage = loadImage("./images/player.png");

    seedlingEmoji = loadImage("./images/seedling.png");

    plantEmojis.push(loadImage("./images/herb.png"));
    plantEmojis.push(loadImage("./images/four-leaf-clover.png"));
    plantEmojis.push(loadImage("./images/sheaf-of-rice.png"));

    treeEmojis.push(loadImage("./images/red-tree.png"));
    treeEmojis.push(loadImage("./images/pine-tree.png"));
    treeEmojis.push(loadImage("./images/lemon-tree.png"));
    treeEmojis.push(loadImage("./images/weird-tree.png"));
    treeEmojis.push(loadImage("./images/conifer-tree-2.png"));
    treeEmojis.push(loadImage("./images/conifer-tree.png"));
    treeEmojis.push(loadImage("./images/deciduous-tree-2.png"));
    treeEmojis.push(loadImage("./images/deciduous-tree-3.png"));
    treeEmojis.push(loadImage("./images/deciduous-tree.png"));

    leafEmojis.push(loadImage("./images/fallen-leaf.png"));
    leafEmojis.push(loadImage("./images/fallen-leaf-green.png"));

    flowerEmojis.push(loadImage("./images/blossom.png"));
    flowerEmojis.push(loadImage("./images/hibiscus.png"));
    flowerEmojis.push(loadImage("./images/rose.png"));
    flowerEmojis.push(loadImage("./images/sunflower.png"));
    flowerEmojis.push(loadImage("./images/tulip.png"));
    flowerEmojis.push(loadImage("./images/violet.png"));
    flowerEmojis.push(loadImage("./images/blue-flower.png"));
    flowerEmojis.push(loadImage("./images/dandelion.png"));

    abandonedHouseEmojis.push(loadImage("./images/brokenHouse1.png"));
    abandonedHouseEmojis.push(loadImage("./images/brokenHouse2.png"));
    houseEmojis.push(loadImage("./images/house1.png"));
    houseEmojis.push(loadImage("./images/house2.png"));
    // houseEmojis.push(loadImage("./images/hut.png"));

    animalEmojis.push(loadImage("./images/deer.png"));
    animalEmojis.push(loadImage("./images/cat.png"));
    animalEmojis.push(loadImage("./images/horse.png"));
    animalEmojis.push(loadImage("./images/goat.png"));
    animalEmojis.push(loadImage("./images/llama.png"));
    animalEmojis.push(loadImage("./images/dog.png"));
    animalEmojis.push(loadImage("./images/cow.png"));
    animalEmojis.push(loadImage("./images/badger.png"));
    animalEmojis.push(loadImage("./images/bunny.png"));
    animalEmojis.push(loadImage("./images/rooster.png"));
    animalEmojis.push(loadImage("./images/turtle.png"));
    animalEmojis.push(loadImage("./images/zebra.png"));
    animalEmojis.push(loadImage("./images/sheep.png"));
    animalEmojis.push(loadImage("./images/porcupine.png"));

    weatherEmojis.push(loadImage("./images/snowflake.png"));
    weatherEmojis.push(loadImage("./images/snowflake-2.png"));

    pawPrintsEmoji = loadImage("./images/paw-prints.png");

    mailboxEmojis.push(loadImage("./images/closed-mailbox-with-raised-flag.png"));
    mailboxEmojis.push(loadImage("./images/open-mailbox-with-raised-flag.png"));
    mailboxEmojis.push(loadImage("./images/open-mailbox-with-lowered-flag.png"));

    waterEmoji = loadImage("./images/water-wave.png");

    waterAnimals.push(loadImage("./images/dolphin.png"));
    waterAnimals.push(loadImage("./images/otter.png"));
    waterAnimals.push(loadImage("./images/fish.png"));
    waterAnimals.push(loadImage("./images/fish.png"));
    waterAnimals.push(loadImage("./images/fish.png"));
    waterAnimals.push(loadImage("./images/duck.png"));
    waterAnimals.push(loadImage("./images/duck.png"));
    waterAnimals.push(loadImage("./images/duck.png"));

    regularFont = loadFont("./fonts/FiraCode-Regular.ttf");
    postcardFont = loadFont("./fonts/VT323-Regular.ttf");

    postcardWritingImages.push(loadImage("./images/postcard-writing.png"));
    postcardPhotoImages.push(loadImage("./images/postcard-back-1.png"));
    postcardPhotoImages.push(loadImage("./images/postcard-back-3.png"));
    postcardPhotoImages.push(loadImage("./images/postcard-back-4.png"));
    postcardPhotoImages.push(loadImage("./images/postcard-back-5.png"));
    postcardPhotoImages.push(loadImage("./images/postcard-flower.png"));
    postcardPhotoImages.push(loadImage("./images/postcard-snow.png"));
    postcardPhotoImages.push(loadImage("./images/postcard-water.png"));

    walkLeftImgs.push(loadImage("./images/walkLeft1.png"));
    walkLeftImgs.push(loadImage("./images/walkLeft2.png"));
    walkRightImgs.push(loadImage("./images/walkRight1.png"));
    walkRightImgs.push(loadImage("./images/walkRight2.png"));
    walkUpImgs.push(loadImage("./images/walk-up-1.png"));
    walkUpImgs.push(loadImage("./images/walk-up-2.png"));
    walkDownImgs.push(loadImage("./images/walk-down-1.png"));
    walkDownImgs.push(loadImage("./images/walk-down-2.png"));

    musicLoadSounds();
    initMusicSettings();
    preloadSounds();
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    mode = 0;

    serial = new p5.SerialPort(); // make a new instance of the serialport library
    serial.on('list', printList); // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen); // callback for the port opening
    serial.on('data', serialEvent); // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.on('close', portClose); // callback for the port closing
    serial.list(); // list the serial ports
    serial.open(portName); // open a serial port

    happyMarkov = RiTa.markov(3);
    sadMarkov = RiTa.markov(3);

    for (let i = 0; i < poemsJson.plants.length; i++) {
        happyMarkov.addText(poemsJson.plants[i], 2);
        sadMarkov.addText(poemsJson.plants[i], 2);
    }

    // for (let i = 0; i < plantsJson.plants.length; i++) {
    //     happyMarkov.addText(plantsJson.plants[i], 1);
    //     sadMarkov.addText(plantsJson.plants[i], 1);
    // }

    for (let i = 0; i < happyJson.happy.length; i++) {
        happyMarkov.addText(happyJson.happy[i],5);
    }

    for (let i = 0; i < sadJson.sad.length; i++) {
        sadMarkov.addText(sadJson.sad[i],5);
    }

    markov = happyMarkov;

    cloudCanvas = createGraphics(windowWidth, windowHeight);
    weatherCanvas = createGraphics(windowWidth, windowHeight);

    window.addEventListener("copy", copyText);
    window.addEventListener("paste", pasteText);

    angleMode(DEGREES);
    textAlign(CENTER, CENTER);
    imageMode(CENTER);
    textFont("monospace");
    noStroke();
    frameRate(2);

    grid = new Grid(worldWidth, worldHeight);
    createAnimals();
    createWeather();
    player = new Player();

    noLoop();

    let resetButton = createButton("Reset");
    resetButton.position(10, 10);
    resetButton.mousePressed(reset);


    let aboutButton = createButton("About");
    aboutButton.position(windowWidth - 210, 10);
    aboutButton.mousePressed(about);


    if (mode == 0) {
        let img = document.getElementById("titleCard");
//         document.getElementById("titleCard").src="./images/titlecard.gif";
        document.getElementById("titleCard").style.display = "block"
    }
}

function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
        // Display the list the console:
        //   console.log(i + portList[i]);
    }
}

function serverConnected() {
    console.log('connected to server.');
}

function portOpen() {
    console.log('the serial port opened.')
}


function update() {

    for (let i = 0; i < animals.length; i++) {
        animals[i].move();
    }
    for (let i = 0; i < weathers.length; i++) {
        weathers[i].move();
        weathers[i].update();
    }
}

function draw() {

    cloudCanvas.clear();
    weatherCanvas.clear();

    treesOnScreen = 0;
    waterOnScreen = false;

    push();
    cloudCanvas.push();
    weatherCanvas.push();

    translate(-player.cameraX * cellSize, -player.cameraY * cellSize);
    cloudCanvas.translate(-player.cameraX * cellSize, -player.cameraY * cellSize);
    weatherCanvas.translate(-player.cameraX * cellSize, -player.cameraY * cellSize);

    grid.display();
    //player.display();

    pop();
    cloudCanvas.pop();
    weatherCanvas.pop();

    image(cloudCanvas, width/2, height/2);
    image(weatherCanvas, width/2, height/2);

    displayUI();
    displayPostcard();
   

 let currentCell = grid.grid[player.x][player.y];

    if (!housePanelOpen && currentCell instanceof House) {
        housePanelOpen = true;
        ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", "/a-forest/house/index.html");
        ifrm.style.width = "800px";
        ifrm.style.height = "550px";
        ifrm.style.zIndex = "10000"; 

    } else if (housePanelOpen == true && currentCell instanceof House == false) {
        ifrm.remove("iframe");
    }


    if (keyIsPressed && !(keyIsDown(ENTER) || keyIsDown(RETURN))) {
        frameRate(timeHolding+3);
        timeHolding++;
        if (timeHolding > 1) {
            keyPressed();
        }
        if (timeHolding > 2) timeHolding = 2;
    } else {
        noLoop();
        timeHolding = 0;
    }

   checkMusicTransition();

    if (waterOnScreen) {
        if (seaLoop.player.state === "stopped") {
            addSound(seaLoop);
        }
    } else if (!waterOnScreen) {
        seaLoop.player.stop();
    }

    if(soundManager.soundsQueue.length > 0) {
        // console.log(`sounds queue length = ${soundManager.soundsQueue.length}`);
        flushQueue();
    }

    if (waveCrashNextFrame) {
        waveCrashNextFrame = false;
        addSound(splash);
    }

    updateMarkov();
    serialEvent();
}


function serialEvent() {
    inData = serial.readLine();

    if (!inData) return;
    byteCount++;

  //  console.log(inData)
    if (inData <=600){
        plantIsHappy = true;
    }else {
        plantIsHappy = false;
    }
}

function serialError(err) {
    console.log('Something went wrong with the serial port.' + err);
}

function portClose() {
    console.log('The serial port closed.');
}



function createAnimals() {

    for (let i = 0; i < grid.width*grid.height/500; i++) {

        let targetX = int(random(grid.width));
        let targetY = int(random(grid.height));

        let x = int(worldWidth/2);
        let y = int(worldHeight/2);

        let valid = true;

        for (let j = -1; j <= 1; j++) {
            for (let k = -1; k <= 1; k++) {

                if (x+j == targetX && y+k == targetY) {
                    valid = false;
                    break;
                }
            }
        }

        if (grid.grid[targetX][targetY] instanceof Water) continue;

        if (valid) {
            animals.push(new Animal(targetX, targetY));
        }
    }
}

function createWeather() {

    for (let i = 0; i < grid.width*grid.height/50; i++) {

        let targetX = int(random(grid.width));
        let targetY = int(random(grid.height));

        let x = int(worldWidth/2);
        let y = int(worldHeight/2);

        let valid = true;

        for (let j = -1; j <= 1; j++) {
            for (let k = -1; k <= 1; k++) {

                if (x+j == targetX && y+k == targetY) {
                    valid = false;
                    break;
                }
            }
        }

        if (valid) {
            weathers.push(new Weather(targetX, targetY));
        }
    }
}

function displayUI() {

    push();

    textAlign(LEFT, BOTTOM);
    textSize(cellSize*.5);

    let uiWidth = width > 2048 ? 2048 : width;
    let leftEdge = width/2-uiWidth/2;

    let currentCell = grid.grid[player.x][player.y];
    let uiText = "";

    if (currentCell instanceof EmptyCell == false && currentCell instanceof Mailbox == false) {
        uiText = currentCell.phrase;
        uiText = uiText.replace(/ ,/g, ",\n");
        uiText = uiText.replace(/ \./g, ".\n");
        uiText = uiText.replace(/ \?/g, "?\n");
        uiText = uiText.replace(/ \!/g, "!\n");
        uiText = uiText.replace(/ ;/g, ";\n");
        uiText = uiText.replace(/ :/g, ":\n");
        uiText = uiText.replace(/\[ /g, "[");
        uiText = uiText.replace(/ \]/g, "]");
        uiText = uiText.replace(/\( /g, "(");
        uiText = uiText.replace(/ \)/g, ")");
        uiText = uiText.trim();
    } else if (currentCell instanceof Mailbox) {

    } else {
        for (let i = 0; i < animals.length; i++) {
            if (animals[i].x == player.x && animals[i].y == player.y) {
                uiText = animals[i].phrase;
                addSound(animalSound);
                break;
            }
        }
    }

    let noCharacter = false;

    if (uiText == "" && currentCell instanceof EmptyCell) {

        noCharacter = true;

        if (!moved) {
            uiText = "Press the ARROW keys to walk";
        } else if (!typed) {
            uiText = "Try typing something…";
        } else if (!typedSentence) {
            uiText = "Try typing a longer sentence…";
        }
    }

    if (currentCell instanceof Mailbox) {

        noCharacter = true;

        uiText = "Press ENTER to see reverse side";
    }

    if (aboutDisplayed) {
        uiText = "Press ESCAPE to close";
    }

    if (uiText != "") {
        push();
        stroke("#eee");
        strokeWeight(17); // 6 or 17?
        strokeJoin(ROUND);
        fill("#0A0A0A");
        text(uiText, leftEdge+280, 20, uiWidth/3, height-40);
        pop();

        if (!noCharacter) {
            image(playerImage, leftEdge+150, height-70, 500, 500);
        }
    }

    pop();
}

function displayPostcard() {

    let currentCell = grid.grid[player.x][player.y];

    if (currentCell instanceof Mailbox) {

        currentCell.displayPostcard();
    }
}

function keyPressed() {

    if (!interacted) {
        interacted = true;
        mode = 1;
        document.getElementById("titleCard").style.display = "none"
        document.getElementById("title-container").style.display = "none"
        // Starts music
        Tone.Transport.start();
        return;
    }

    if (!player) return;
    if (!keyIsPressed) return;
    if (keyIsDown(CONTROL)) return;

    if (justCopyPaste) {
        justCopyPaste = false;
        return;
    }

    if (aboutDisplayed) {
        if (keyIsDown(ESCAPE)) {
            about();
        } else {
            return;
        }
    }

    move();
    write();
    enterHouse();
    reversePostcard();
}

function move() {

    let walkNumber;

    if (walkCycle == -1) walkNumber = 0;
    else walkNumber = 1;

    if (lastMoveWasDiagonal) {
        lastMoveWasDiagonal = false;
        return;
    }

    if (keyIsDown(LEFT_ARROW) && keyIsDown(UP_ARROW)) {
        player.move(-1, -1);
        player.symbol = walkLeftImgs[walkNumber];
        lastMoveWasDiagonal = true;
    } else if (keyIsDown(LEFT_ARROW) && keyIsDown(DOWN_ARROW)) {
        player.move(-1, 1);
        player.symbol = walkLeftImgs[walkNumber];
        lastMoveWasDiagonal = true;
    } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(UP_ARROW)) {
        player.move(1, -1);
        player.symbol = walkRightImgs[walkNumber];
        lastMoveWasDiagonal = true;
    } else if (keyIsDown(RIGHT_ARROW) && keyIsDown(DOWN_ARROW)) {
        player.move(1, 1);
        player.symbol = walkRightImgs[walkNumber];
        lastMoveWasDiagonal = true;
    } else if (keyIsDown(UP_ARROW)) {
        player.move(0, -1);
        player.symbol = walkUpImgs[walkNumber];
    } else if (keyIsDown(DOWN_ARROW)) {
        player.move(0, 1);
        player.symbol = walkDownImgs[walkNumber];
    } else if (keyIsDown(LEFT_ARROW)) {
        player.move(-1, 0);
        player.symbol = walkLeftImgs[walkNumber];
    } else if (keyIsDown(RIGHT_ARROW)) {
        player.move(1, 0);
        player.symbol = walkRightImgs[walkNumber];
    } else {
        return;
    }

    if (!moved) moved = true;
    walkCycle *= -1;

    grid.update();

    update();
    loop();
}

function write() {

    let currentCell = grid.grid[player.x][player.y];

    // if (currentCell instanceof Mailbox) return;

    if (keyIsDown(DELETE) || keyIsDown(BACKSPACE)) {
        if (currentCell instanceof Tree || currentCell instanceof Leaf) {
            if (currentCell.phrase.length == 1) {
                grid.grid[player.x][player.y] = new EmptyCell(player.x, player.y);
            } else {
                grid.grid[player.x][player.y].phrase = currentCell.phrase.slice(0, -1);
            }
        }
    } else if (key.length == 1 || (keyIsDown(ENTER) || keyIsDown(RETURN))) {
        if (currentCell instanceof EmptyCell && !keyIsDown(32) && !(keyIsDown(ENTER) || keyIsDown(RETURN))) {
            grid.grid[player.x][player.y] = new Tree(player.x, player.y);
            grid.grid[player.x][player.y].symbol = seedlingEmoji;
            currentCell = grid.grid[player.x][player.y];
            if (!typed) typed = true;
            plantingSound.player.playbackRate = random(0.5, 1.5);
            plantingSound.player.stop();
            addSound(plantingSound); // planting sapling
        }
        if (currentCell instanceof Tree || currentCell instanceof Leaf || currentCell instanceof Mailbox) {
            if (keyIsDown(ENTER) || keyIsDown(RETURN)) {
                grid.grid[player.x][player.y].addChar("\n");
            } else {
                grid.grid[player.x][player.y].addChar(key);
            }
        }
    } else {
        return;
    }

    update();
    loop();
}

function enterHouse() {

    let currentCell = grid.grid[player.x][player.y];

    if ((keyCode == ENTER || keyCode == RETURN) &&  currentCell instanceof House) {
       // open(currentCell.data.link);

       housePanelOpen = true;

       document.body.appendChild(ifrm);
        if (!currentCell.visited) {
            grid.grid[player.x][player.y].visited = true;
            grid.grid[player.x][player.y].symbol = houseEmojis[currentCell.houseType];
            addSound(houseFixedSound);
            for (let i = 0; i < grid.width; i++) {  
                for (let j = 0; j < grid.height; j++) {
                    if (grid.grid[i][j] instanceof House && !grid.grid[i][j].visited && grid.grid[i][j].data.label === grid.grid[player.x][player.y].data.label) {
                        grid.grid[i][j].visited = true;
                        // console.log()
                        grid.grid[i][j].symbol = houseEmojis[currentCell.houseType];
                    }
                }
            }
        }
    } else {
        if (currentCell.visited && housePanelOpen == true) { 
            housePanelOpen = false
        }
        return;
    }
    update();
    redraw();
}

function reversePostcard() {

    let currentCell = grid.grid[player.x][player.y];

    if (currentCell instanceof Mailbox && (keyCode == ENTER || keyCode == RETURN)) {
        grid.grid[player.x][player.y].side *= -1;
        addRandomSound(turnLetterSound, turnLetterSoundLength);
    } else {
        return;
    }

    update();
    redraw();
}

function copyText() {

    justCopyPaste = true;

    let currentCell = grid.grid[player.x][player.y];

    if (currentCell instanceof Tree || currentCell instanceof Leaf) {

        navigator.clipboard.writeText(currentCell.phrase);
    }
}

function pasteText() {

    justCopyPaste = true;

    navigator.clipboard.readText().then(cliptext => pasteMyText(cliptext), err => console.log(err));
}

function pasteMyText(text) {

    let currentCell = grid.grid[player.x][player.y];

    if (currentCell instanceof EmptyCell) {
        grid.grid[player.x][player.y] = new Tree(player.x, player.y, false, text);
        plantingSound.player.playbackRate = random(0.5, 1.5);
        plantingSound.player.stop();
        addSound(plantingSound); // planting sapling
    } else {
        grid.grid[player.x][player.y].phrase += text;
    }

    redraw();
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

function drawFog() {

    cloudCanvas.push();
    translate(cellSize/2, cellSize/2);
    cloudCanvas.translate(cellSize/2, cellSize/2);
    cloudCanvas.noStroke();
    cloudCanvas.fill("#eee");
    cloudCanvas.ellipse(0, 0, cellSize*random(1, 1.4));
    cloudCanvas.ellipse(-cellSize/random(4, 8), -cellSize/random(4, 8), cellSize * random(.6, 1.4), cellSize * random(.6, 1.4));
    cloudCanvas.ellipse(cellSize/random(4, 8), cellSize/random(4, 8), cellSize * random(.6, 1.4), cellSize * random(.6, 1.4));
    cloudCanvas.ellipse(-cellSize/random(4, 8), cellSize/random(4, 8), cellSize * random(.6, 1.4), cellSize * random(.6, 1.4));
    cloudCanvas.ellipse(cellSize/random(4, 8), -cellSize/random(4, 8), cellSize * random(.6, 1.4), cellSize * random(.6, 1.4));
    cloudCanvas.pop();
}

function reset() {

    addSound(resetSound);

    animals = [];
    weathers = [];

    moved = false;
    typed = false;
    typedSentence = false;
    mailCount = 0;

    grid = new Grid(worldWidth, worldHeight);
    createAnimals();
    createWeather();
    player = new Player();

    // createNoise();

    noLoop();
    redraw();
}

function about() {

    let about = document.getElementById("aboutModal")

    if (window.getComputedStyle(about, null).getPropertyValue("display") === 'none') {
        about.style.display = 'grid';
        aboutDisplayed = true;
    } else {
        about.style.display = 'none';
        aboutDisplayed = false;
    }

    redraw();
}

function keyReleased() {

    if (!keyIsPressed) {
        noLoop();
        timeHolding = 0;
    }
}

function updateMarkov() {

    if (plantIsHappy && !markovIsHappy) {
        markovIsHappy = true;
        markov = happyMarkov;
    } else if (!plantIsHappy && markovIsHappy) {
        markovIsHappy = false;
        markov = sadMarkov;
    }

    console.log("are the plants happy? " + markovIsHappy)


}
