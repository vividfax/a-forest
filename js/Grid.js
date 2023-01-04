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
        this.placeMailboxes();
        this.placeWater();
        this.growWater();
        this.growWater();
        this.growWater();
        this.growWater();
        this.growWater();
        this.growWater();
        this.clearCentre();
        this.removeWaterStragglers();
        this.removeWaterStragglers();
        this.placeEmptyCells();
    }

    placeFlowers() {

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {

                if (this.grid[i][j] == false) {
                    if (random() < 0.085) {
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

    placeMailboxes() {

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {

                if (random() < 0.003) {
                    if (!this.grid[i][j]) {
                        this.grid[i][j] = new Mailbox(i, j, true);
                    }
                }
            }
        }
    }

    placeWater() {

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {

                if (random() < 0.08) {
                    this.grid[i][j] = new Water(i, j, true);
                }
            }
        }
    }

    growWater() {

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

                        if (cache[x][y] instanceof Water) {
                            numberOfNeighbours++;
                        }
                    }
                }

                let isAlive = cache[i][j] instanceof Water == true;

                if (isAlive && numberOfNeighbours <= 1) {
                    this.grid[i][j] = false;
                } else if (!isAlive && numberOfNeighbours > 2) {
                    this.grid[i][j] = new Water(i, j, true);
                }
            }
        }
    }

    removeWaterStragglers() {

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

                        if (cache[x][y] instanceof Water) {
                            numberOfNeighbours++;
                        }
                    }
                }

                let isAlive = cache[i][j] instanceof Water == true;

                if (isAlive && numberOfNeighbours <= 2) {
                    this.grid[i][j] = false;
                }
            }
        }
    }

    clearCentre() {

        let x = int(worldWidth/2);
        let y = int(worldHeight/2);
        let radius = 3;

        for (let i = -radius; i <= radius; i++) {
            for (let j = -radius; j <= radius; j++) {
                this.grid[x+i][y+j] = false;
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

                    if (cell.height <= 0 || cell instanceof Water) this.clearFog(targetX, targetY);
                }
            }
        }
    }

    update() {

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {

                if (!showFog) {
                    this.grid[i][j].fog = false;
                }
                // this.grid[i][j].fog = false; // off by default

                this.grid[i][j].update();
            }
        }
    }

    display() {

        background("#97C791");

        push();
        cloudCanvas.push();
        weatherCanvas.push();
        translate(-cellSize/2, -cellSize/2);
        translate(-player.x * cellSize + width/2, -player.y * cellSize + height/2);
        cloudCanvas.translate(-cellSize/2, -cellSize/2);
        cloudCanvas.translate(-player.x * cellSize + width/2, -player.y * cellSize + height/2);
        weatherCanvas.translate(-cellSize/2, -cellSize/2);
        weatherCanvas.translate(-player.x * cellSize + width/2, -player.y * cellSize + height/2);

        let visibleGridWidth = int(width/cellSize/2) * 1/renderScale;
        let visibleGridHeight = int(height/cellSize/2) * 1/renderScale;

        for (let j = player.y+player.cameraY - visibleGridHeight/2 -1; j <= player.y+player.cameraY + visibleGridHeight/2+1; j++) {
            for (let i = player.x+player.cameraX - visibleGridWidth/2 -1; i <= player.x+player.cameraX + visibleGridWidth/2+1; i++) {

                let targetX = i;
                let targetY = j;

                if (targetX >= worldWidth || targetX < 0) targetX = mod(targetX, worldWidth);
                if (targetY >= worldHeight || targetY < 0)  targetY = mod(targetY, worldHeight);

                push();
                cloudCanvas.push();
                weatherCanvas.push();

                if (targetX > i) translate(-worldWidth*cellSize, 0);
                else if (targetX < i) translate(worldWidth*cellSize, 0);
                if (targetY > j) translate(0, -worldHeight*cellSize);
                else if (targetY < j) translate(0, worldHeight*cellSize);

                if (targetX > i) cloudCanvas.translate(-worldWidth*cellSize, 0);
                else if (targetX < i) cloudCanvas.translate(worldWidth*cellSize, 0);
                if (targetY > j) cloudCanvas.translate(0, -worldHeight*cellSize);
                else if (targetY < j) cloudCanvas.translate(0, worldHeight*cellSize);

                if (targetX > i) weatherCanvas.translate(-worldWidth*cellSize, 0);
                else if (targetX < i) weatherCanvas.translate(worldWidth*cellSize, 0);
                if (targetY > j) weatherCanvas.translate(0, -worldHeight*cellSize);
                else if (targetY < j) weatherCanvas.translate(0, worldHeight*cellSize);

                this.grid[targetX][targetY].display();

                if (player.x == targetX && player.y == targetY) {
                    player.display();
                }

                if (!this.grid[targetX][targetY].fog) {
                    for (let k = 0; k < animals.length; k++) {
                        if (animals[k].x == targetX && animals[k].y == targetY) {
                            animals[k].display();
                            break;
                        }
                    }
                }
                else if (this.grid[targetX][targetY].fog) {
                    for (let k = 0; k < weathers.length; k++) {
                        if (weathers[k].x == targetX && weathers[k].y == targetY) {
                            weathers[k].display();
                            break;
                        }
                    }
                }

                pop();
                cloudCanvas.pop();
                weatherCanvas.pop();
            }
        }

        pop();
        cloudCanvas.pop();
        weatherCanvas.pop();
    }
}
