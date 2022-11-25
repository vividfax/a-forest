class Grid {

    constructor(w, h) {

        this.width = w;
        this.height = h;
        this.grid = this.new2dArray();
        this.createGrid();
    }

    new2dArray() {

        let arr = [...Array(this.width)].map(e => Array(this.height));

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {

                arr[i][j] = false;
            }
        }

        return arr;
    }

    createGrid() {

        this.placeFlowers();
        this.growFlowers();
        this.growFlowers();
        this.growFlowers();
        this.growFlowers();
        this.placeHouses();
        this.placeEmptyCells();
        this.manuallyPlant();
    }

    placeFlowers() {

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {

                if (this.grid[i][j] == false) {
                    if (random() < 0.07) {
                        this.grid[i][j] = new Flower(i, j, true);
                    }
                }
            }
        }
    }

    growFlowers() {

        let cache = this.new2dArray();

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {

                cache[i][j] = this.grid[i][j];
            }
        }

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {

                let numberOfNeighbours = 0;

                for (let k = -1; k <= 1; k++) {
                    for (let l = -1; l <= 1; l++) {

                        if (k == 0 && l == 0) continue;

                        let x = i + k;
                        let y = j + l;

                        if (x < 0) {
                            x = this.width - 1;
                        } else if (x >= this.width) {
                            x = 0;
                        }

                        if (y < 0) {
                            y = this.height - 1;
                        } else if (y >= this.height) {
                            y = 0;
                        }

                        if (cache[x][y] instanceof Flower) {
                            numberOfNeighbours++;
                        }
                    }
                }

                let isAlive = cache[i][j];

                if (isAlive && numberOfNeighbours <= 1) {
                    this.grid[i][j] = false;
                } else if (!isAlive && numberOfNeighbours > 2) {
                    this.grid[i][j] = new Flower(i, j, true);
                }
            }
        }
    }

    placeHouses() {

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {

                if (random() < 0.01) {
                    this.grid[i][j] = new House(i, j, true);
                }
            }
        }
    }

    placeEmptyCells() {

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {

                if (this.grid[i][j] == false) this.grid[i][j] = new EmptyCell(i, j, true);
            }
        }
    }

    manuallyPlant() {

        for (let i = 0; i < manualPlants.plants.length; i++) {

            // let x = int(random(this.width));
            // let y = int(random(this.height));

            // while (this.grid[x][y] instanceof EmptyCell == false) {
            //     x = int(random(this.width));
            //     y = int(random(this.height));
            // }

            // this.grid[x][y] = new Tree(x, y, true, manualPlants.plants[i]);
            markov.addText(manualPlants.plants[i]);
        }
    }

    clearFog(x, y) {

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {

                if (i == 0 && j == 0) continue;

                let targetX = x + i;
                let targetY = y + j;

                if (targetX < 0) targetX = this.width-1;
                else if (targetX >= this.width) targetX = 0;
                if (targetY < 0) targetY = this.height-1;
                else if (targetY >= this.height) targetY = 0;

                let cell = this.grid[targetX][targetY];

                if (this.grid[targetX][targetY].fog) {
                    this.grid[targetX][targetY].fog = false;

                    if (cell.height <= 0) this.clearFog(targetX, targetY);
                }
            }
        }
    }

    update() {

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {

                // this.grid[i][j].fog = false; // off by default
                this.grid[i][j].update();
            }
        }
    }

    display() {

        background("#97C791");
        // updatePixels();

        push();
	    translate(-cellSize/2, -cellSize/2);
        translate(-player.x * cellSize + width/2, -player.y * cellSize + height/2);

        let visibleGridWidth = int(width/cellSize/2) * 1/renderScale;
        let visibleGridHeight = int(height/cellSize/2) * 1/renderScale;

        for (let j = player.y+player.cameraY - visibleGridHeight; j < player.y+player.cameraY + visibleGridHeight+1; j++) {
            for (let i = player.x+player.cameraX - visibleGridWidth; i < player.x+player.cameraX + visibleGridWidth+1; i++) {

                let targetX = i;
                let targetY = j;

                if (targetX >= worldWidth || targetX < 0) targetX = mod(targetX, worldWidth);
                if (targetY >= worldHeight || targetY < 0)  targetY = mod(targetY, worldHeight);

                push();
                if (targetX > i) translate(-worldWidth*cellSize, 0);
                else if (targetX < i) translate(worldWidth*cellSize, 0);
                if (targetY > j) translate(0, -worldHeight*cellSize);
                else if (targetY < j) translate(0, worldHeight*cellSize);

                this.grid[targetX][targetY].display();

                if (!this.grid[targetX][targetY].fog) {
                    for (let k = 0; k < animals.length; k++) {
                        if (animals[k].x == targetX && animals[k].y == targetY) {
                            animals[k].display();
                        }
                    }
                }

                if (player.x == targetX && player.y == targetY) {
                    player.display();
                }

                pop();
            }
        }

        pop();
    }
}

// function createNoise() {

// 	for (let y = 0; y < height; y++) {
// 		for (let x = 0; x < width; x++) {

//             let colour;

// 			if (random() < 0.5) {
// 				colour = color("#97C791");
// 			} else {
//                 colour = color("#98C192")
//             }
//             set(x, y, colour);
// 		}
// 	}

//     updatePixels();
// }