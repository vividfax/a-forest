let grid;
let player;

let worldWidth = 500;
let worldHeight = 500;
let cellSize = 50;
let renderScale = 0.5;

let lastMoveWasDiagonal = false;
let hasMoved = false;

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

let manualPlants;
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

const music = new Tone.Player(
    "./music/section2.mp3"
).toDestination();
music.loop = true;

function preload() {

    manualPlants = loadJSON("./json/plants.json");
    links = loadJSON("./json/links.json");
    mail = loadJSON("./json/mail.json");
    kaomojis = loadJSON("./json/kaomoji.json");

    playerImage = loadImage("./images/player.png");

    seedlingEmoji = loadImage("./images/seedling.png");

    plantEmojis.push(loadImage("./images/herb.png"));
    plantEmojis.push(loadImage("./images/four-leaf-clover.png"));
    plantEmojis.push(loadImage("./images/shamrock.png"));
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
    flowerEmojis.push(loadImage("./images/cherry-blossom.png"));
    flowerEmojis.push(loadImage("./images/hibiscus.png"));
    flowerEmojis.push(loadImage("./images/rose.png"));
    flowerEmojis.push(loadImage("./images/rosette.png"));
    flowerEmojis.push(loadImage("./images/sunflower.png"));
    flowerEmojis.push(loadImage("./images/tulip.png"));

    abandonedHouseEmojis.push(loadImage("./images/brokenHouse1.png"));
    abandonedHouseEmojis.push(loadImage("./images/brokenHouse2.png"));
    houseEmojis.push(loadImage("./images/house1.png"));
    houseEmojis.push(loadImage("./images/house2.png"));
    // houseEmojis.push(loadImage("./images/hut.png"));

    animalEmojis.push(loadImage("./images/deer.png"));
    animalEmojis.push(loadImage("./images/ewe.png"));
    animalEmojis.push(loadImage("./images/turkey.png"));
    animalEmojis.push(loadImage("./images/cat.png"));
    animalEmojis.push(loadImage("./images/horse.png"));
    animalEmojis.push(loadImage("./images/ram.png"));
    animalEmojis.push(loadImage("./images/goat.png"));
    animalEmojis.push(loadImage("./images/llama.png"));
    animalEmojis.push(loadImage("./images/dog.png"));
    animalEmojis.push(loadImage("./images/cow.png"));
    animalEmojis.push(loadImage("./images/badger.png"));
    animalEmojis.push(loadImage("./images/hedgehog.png"));
    animalEmojis.push(loadImage("./images/rabbit.png"));
    animalEmojis.push(loadImage("./images/rooster.png"));
    animalEmojis.push(loadImage("./images/swan.png"));
    animalEmojis.push(loadImage("./images/turtle.png"));
    animalEmojis.push(loadImage("./images/zebra.png"));

    weatherEmojis.push(loadImage("./images/snowflake.png"));

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
    // postcardFont = loadFont("./fonts/Caveat-Regular.ttf");
    postcardFont = loadFont("./fonts/VT323-Regular.ttf");

    postcardWritingImages.push(loadImage("./images/postcard-writing.png"));
    postcardPhotoImages.push(loadImage("./images/postcard-back-1.png"));
    postcardPhotoImages.push(loadImage("./images/postcard-back-3.png"));
    postcardPhotoImages.push(loadImage("./images/postcard-back-4.png"));
    postcardPhotoImages.push(loadImage("./images/postcard-back-5.png"));

    walkLeftImgs.push(loadImage("./images/walkLeft1.png"));
    walkLeftImgs.push(loadImage("./images/walkLeft2.png"));
    walkRightImgs.push(loadImage("./images/walkRight1.png"));
    walkRightImgs.push(loadImage("./images/walkRight2.png"));
    walkUpImgs.push(loadImage("./images/walk-up-1.png"));
    walkUpImgs.push(loadImage("./images/walk-up-2.png"));
    walkDownImgs.push(loadImage("./images/walk-down-1.png"));
    walkDownImgs.push(loadImage("./images/walk-down-2.png"));

    preloadSounds();
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    markov = RiTa.markov(3);

    for (let i = 0; i < manualPlants.plants.length; i++) {
        markov.addText(manualPlants.plants[i]);
    }

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

    flushQueue();
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
        uiText = uiText.replace(/ ,/g, ",")
        uiText = uiText.replace(/ \./g, ".")
        uiText = uiText.replace(/\[ /g, "[")
        uiText = uiText.replace(/ \]/g, "]")
        uiText = uiText.replace(/\( /g, "(")
        uiText = uiText.replace(/ \)/g, ")")
    } else if (currentCell instanceof Mailbox) {

    } else {
        for (let i = 0; i < animals.length; i++) {
            if (animals[i].x == player.x && animals[i].y == player.y) {
                uiText = animals[i].phrase;
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

    if (uiText != "") {
        push();
        stroke("#eee");
        strokeWeight(17); // 6 or 17?
        strokeJoin(ROUND);
        fill("#0A0A0A");
        text(uiText, leftEdge+280, 20, uiWidth-300, height-40);
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
        music.start();
    }

    if (!player) return;
    if (!keyIsPressed) return;
    if (keyIsDown(CONTROL)) return;

    if (justCopyPaste) {
        justCopyPaste = false;
        return;
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

    let currentCell = grid.grid[player.x][player.y];

    if (currentCell instanceof Flower) {
        addRandomSound(footStepsFlowers, footStepsFlowersLength);
    } else {
        addRandomSound(footStepsGrass, footStepsGrassLength);
    }

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

    if ((keyCode == ENTER || keyCode == RETURN) && currentCell instanceof House) {
        open(currentCell.data.link);

        if (!currentCell.visited) {
            grid.grid[player.x][player.y].visited = true;
            grid.grid[player.x][player.y].symbol = houseEmojis[currentCell.houseType];

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
        return;
    }

    update();
    draw();
}

function reversePostcard() {

    let currentCell = grid.grid[player.x][player.y];

    if (currentCell instanceof Mailbox && (keyCode == ENTER || keyCode == RETURN)) {
        grid.grid[player.x][player.y].side *= -1;
    } else {
        return;
    }

    update();
    draw();
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
    } else {
        grid.grid[player.x][player.y].phrase += text;
    }

    draw();
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

    animals = [];
    weather = [];

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
    draw();
}

function keyReleased() {

    if (!keyIsPressed) {
        noLoop();
        timeHolding = 0;
    }
}
