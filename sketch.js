let grid;
let player;

let worldWidth = 1000;
let worldHeight = 1000;
let cellSize = 50;
let renderScale = 0.5;

let lastMoveWasDiagonal = false;
let hasMoved = false;
let hasMovedDiagonally = false;

let playerImage;

let seedlingEmoji;
let plantEmojis = [];
let treeEmojis = [];
let leafEmojis = [];
let flowerEmojis = [];
let abandonedHouseEmoji;
let houseEmojis = [];
let animalEmojis = [];

let markov;

let justCopyPaste = false;

let manualPlants;
let links;
let animals = [];

function preload() {

	manualPlants = loadJSON("./plants.json");
	links = loadJSON("./links.json");

	playerImage = loadImage("./images/player.png");

	seedlingEmoji = loadImage("./images/seedling.png");

	plantEmojis.push(loadImage("./images/herb.png"));
	plantEmojis.push(loadImage("./images/four-leaf-clover.png"));
	plantEmojis.push(loadImage("./images/shamrock.png"));
	plantEmojis.push(loadImage("./images/sheaf-of-rice.png"));

	treeEmojis.push(loadImage("./images/deciduous-tree.png"));
	treeEmojis.push(loadImage("./images/evergreen-tree.png"));

	leafEmojis.push(loadImage("./images/fallen-leaf.png"));
	leafEmojis.push(loadImage("./images/leaf-fluttering-in-wind.png"));
	leafEmojis.push(loadImage("./images/maple-leaf.png"));

	flowerEmojis.push(loadImage("./images/blossom.png"));
	flowerEmojis.push(loadImage("./images/cherry-blossom.png"));
	flowerEmojis.push(loadImage("./images/hibiscus.png"));
	flowerEmojis.push(loadImage("./images/rose.png"));
	flowerEmojis.push(loadImage("./images/rosette.png"));
	flowerEmojis.push(loadImage("./images/sunflower.png"));
	flowerEmojis.push(loadImage("./images/tulip.png"));

	abandonedHouseEmoji = loadImage("./images/derelict-house.png");
	houseEmojis.push(loadImage("./images/house-with-garden.png"));
	houseEmojis.push(loadImage("./images/house.png"));
	// houseEmojis.push(loadImage("./images/hut.png"));

	animalEmojis.push(loadImage("./images/deer.png"));
	animalEmojis.push(loadImage("./images/ewe.png"));
	animalEmojis.push(loadImage("./images/turkey.png"));
	animalEmojis.push(loadImage("./images/duck.png"));
	animalEmojis.push(loadImage("./images/cat.png"));
	animalEmojis.push(loadImage("./images/horse.png"));
	animalEmojis.push(loadImage("./images/ram.png"));
	animalEmojis.push(loadImage("./images/goat.png"));
	animalEmojis.push(loadImage("./images/llama.png"));
	animalEmojis.push(loadImage("./images/dog.png"));
}

function setup() {

	createCanvas(windowWidth, windowHeight);
	markov = RiTa.markov(3);

	window.addEventListener("copy", copyText);
	window.addEventListener("paste", pasteText);

	angleMode(DEGREES);
	textAlign(CENTER, CENTER);
	imageMode(CENTER);
	textFont("Fira Code");
	noStroke();

	grid = new Grid(worldWidth, worldHeight);

	for (let i = 0; i < grid.width*grid.height/500; i++) {

		animals.push(new Animal());
	}

	player = new Player();

	// createNoise();

    noLoop();
    draw();
}

function draw() {

    // background("#E2E2E2");

	push();

	translate(-player.cameraX * cellSize, -player.cameraY * cellSize);

    grid.display();
    //player.display();

	pop();

	displayUI();
}

function displayUI() {

	push();

	textAlign(LEFT, BOTTOM);
	textSize(cellSize/2);

	let uiWidth = width > 2048 ? 2048 : width;
	let leftEdge = width/2-uiWidth/2;

	let currentCell = grid.grid[player.x][player.y];
	let uiText = "";

	if (currentCell instanceof EmptyCell == false) {
		uiText = currentCell.phrase;
	} else {
		for (let i = 0; i < animals.length; i++) {
			if (animals[i].x == player.x && animals[i].y == player.y) {
				uiText = "^_^";
				break;
			}
		}
	}

	if (uiText != "") {
		fill("#F2F2F2");
		text(uiText, leftEdge+280+2, 20+2, uiWidth-300, height-40);
		text(uiText, leftEdge+280-2, 20+2, uiWidth-300, height-40);
		text(uiText, leftEdge+280-2, 20-2, uiWidth-300, height-40);
		text(uiText, leftEdge+280+2, 20-2, uiWidth-300, height-40);
		text(uiText, leftEdge+280+2, 20, uiWidth-300, height-40);
		text(uiText, leftEdge+280-2, 20, uiWidth-300, height-40);
		text(uiText, leftEdge+280, 20-2, uiWidth-300, height-40);
		text(uiText, leftEdge+280, 20+2, uiWidth-300, height-40);
		fill("#0A0A0A");
		text(uiText, leftEdge+280, 20, uiWidth-300, height-40);
		image(playerImage, leftEdge+150, height-70, 500, 500);
	}

	pop();
}

function keyPressed() {

	if (!player) return;

	if (keyIsDown(CONTROL)) {
		return;
	}

	if (justCopyPaste) {
		justCopyPaste = false;
		return;
	}

	move();
	tend();
	enterHouse();

    draw();
}

function move() {

	if (lastMoveWasDiagonal) {
		lastMoveWasDiagonal = false;
		return;
	}

   if ((keyCode == UP_ARROW && keyIsDown(LEFT_ARROW)) || (keyCode == LEFT_ARROW && keyIsDown(UP_ARROW))) {
		player.move(-1, -1);
		lastMoveWasDiagonal = true;
		hasMovedDiagonally = true;
	} else if ((keyCode == DOWN_ARROW && keyIsDown(LEFT_ARROW)) || (keyCode == LEFT_ARROW && keyIsDown(DOWN_ARROW))) {
		player.move(-1, 1);
		lastMoveWasDiagonal = true;
		hasMovedDiagonally = true;
	} else if ((keyCode == UP_ARROW && keyIsDown(RIGHT_ARROW)) || (keyCode == RIGHT_ARROW && keyIsDown(UP_ARROW))) {
		player.move(1, -1);
		lastMoveWasDiagonal = true;
		hasMovedDiagonally = true;
	} else if ((keyCode == DOWN_ARROW && keyIsDown(RIGHT_ARROW)) || (keyCode == RIGHT_ARROW && keyIsDown(DOWN_ARROW))) {
		player.move(1, 1);
		lastMoveWasDiagonal = true;
		hasMovedDiagonally = true;
	} else if (keyCode == UP_ARROW) {
		player.move(0, -1);
	} else if (keyCode == DOWN_ARROW) {
		player.move(0, 1);
	} else if (keyCode == LEFT_ARROW) {
		player.move(-1, 0);
	} else if (keyCode == RIGHT_ARROW) {
		player.move(1, 0);
	} else {
		return;
	}

    grid.update();

	for (let i = 0; i < animals.length; i++) {
		animals[i].move();
	}
}

function tend() {

	let currentCell = grid.grid[player.x][player.y];

	let bannedKeys = [BACKSPACE, DELETE, ENTER, RETURN, TAB, ESCAPE, SHIFT, CONTROL, OPTION, ALT, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW];

    if (!bannedKeys.includes(keyCode) && keyCode != 91 && keyCode != 20) {
		if (currentCell instanceof EmptyCell && keyCode != 32) {
			grid.grid[player.x][player.y] = new Tree(player.x, player.y);
			grid.grid[player.x][player.y].symbol = seedlingEmoji;
			currentCell = grid.grid[player.x][player.y];
		}
		if (currentCell instanceof Tree || currentCell instanceof Leaf) {
			grid.grid[player.x][player.y].addChar(key);
		}
	} else if (keyCode == DELETE || keyCode == BACKSPACE) {

		if (currentCell instanceof Tree || currentCell instanceof Leaf) {
			if (currentCell.phrase.length == 1) {
				grid.grid[player.x][player.y] = new EmptyCell(player.x, player.y);
			} else {
				grid.grid[player.x][player.y].phrase = currentCell.phrase.slice(0, -1);
			}
		}
	}
}

function enterHouse() {

	let currentCell = grid.grid[player.x][player.y];

	if ((keyCode == ENTER || keyCode == RETURN) && currentCell instanceof House) {
		open(currentCell.data.link);

		if (!currentCell.visited) {
			grid.grid[player.x][player.y].visited = true;
			grid.grid[player.x][player.y].symbol = random(houseEmojis);

			for (let i = 0; i < grid.width; i++) {
				for (let j = 0; j < grid.height; j++) {

					if (grid.grid[i][j] instanceof House && !grid.grid[i][j].visited && grid.grid[i][j].data.label === grid.grid[player.x][player.y].data.label) {
						grid.grid[i][j].visited = true;
						grid.grid[i][j].symbol = random(houseEmojis);
					}
				}
			}
		}
	}
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

	fill("#eee");
	translate(cellSize/2, cellSize/2);
	ellipse(0, 0, cellSize*random(1, 1.4));
	ellipse(-cellSize/random(4, 8), -cellSize/random(4, 8), cellSize * random(.6, 1.4), cellSize * random(.6, 1.4));
	ellipse(cellSize/random(4, 8), cellSize/random(4, 8), cellSize * random(.6, 1.4), cellSize * random(.6, 1.4));
	ellipse(-cellSize/random(4, 8), cellSize/random(4, 8), cellSize * random(.6, 1.4), cellSize * random(.6, 1.4));
	ellipse(cellSize/random(4, 8), -cellSize/random(4, 8), cellSize * random(.6, 1.4), cellSize * random(.6, 1.4));
}