class Water {

    constructor(x, y, fog) {

        this.x = x * cellSize;
        this.y = y * cellSize;
        this.gridX = x;
        this.gridY = y;
        this.symbol = "";
        this.fog = fog;
        this.wave = false;
        this.waveNextFrame = false;
        this.animal = false;
        this.animalAge = 0;
        this.animalSymbol;

        this.snowflakeOffsetX = int(random(-cellSize*.3, cellSize*.3));
        this.snowflakeOffsetY = int(random(-cellSize*.3, cellSize*.3));
    }

    update() {

    }

    display() {

        push();
        translate(this.x, this.y);
        cloudCanvas.translate(this.x, this.y);

        let corners = [1,1,1,1];
        let cornerRadius = 15;

        if (grid.grid[mod(this.gridX + 1, worldWidth)][mod(this.gridY, worldHeight)] instanceof Water) {
            corners[1] = 0;
            corners[2] = 0;
        }
        if (grid.grid[mod(this.gridX - 1, worldWidth)][mod(this.gridY, worldHeight)] instanceof Water) {
            corners[0] = 0;
            corners[3] = 0;
        }
        if (grid.grid[mod(this.gridX, worldWidth)][mod(this.gridY + 1, worldHeight)] instanceof Water) {
            corners[2] = 0;
            corners[3] = 0;
        }
        if (grid.grid[mod(this.gridX, worldWidth)][mod(this.gridY - 1, worldHeight)] instanceof Water) {
            corners[0] = 0;
            corners[1] = 0;
        }

        fill("#57A9CB");
        rect(0, 0, cellSize, cellSize, corners[0]*cornerRadius, corners[1]*cornerRadius, corners[2]*cornerRadius, corners[3]*cornerRadius);

        if (this.fog) {
            translate(this.snowflakeOffsetX, this.snowflakeOffsetY);
            drawFog();
        } else {

            if (!waterOnScreen) waterOnScreen = true;

            let lefthandCell = grid.grid[mod(this.gridX - 1, worldWidth)][this.gridY];
            let rightHandCell = grid.grid[mod(this.gridX + 1, worldWidth)][this.gridY];


            if (!this.wave && lefthandCell instanceof Water == false && rightHandCell instanceof Water && random() < 0.02) {
                this.wave = true;
            }

            if (this.wave) {
                translate(cellSize/2, cellSize/2);
                image(waterEmoji, 0, 0, cellSize*.7, cellSize*.7);
                this.wave = false;

                if (rightHandCell instanceof Water) {
                    grid.grid[this.gridX + 1][this.gridY].waveNextFrame = true;
                } else {
                    waveCrashNextFrame = true;
                }

                if (this.animal) {
                    this.animal = false;
                    this.animalAge = 0;
                    // addSound(seagull);
                }
            }
            else if (this.animal) {
                translate(cellSize/2, cellSize/2);
                translate(random(-3, 3), random(-3, 3));
                image(this.symbol, 0, 0, cellSize/2, cellSize/2);
            }

            if (this.waveNextFrame) {
                this.wave = true;
                this.waveNextFrame = false;
            }

            if (this.animal) {
                this.animalAge++;

                if (this.animalAge > random(12, 20)) {
                    this.animal = false;
                    this.animalAge = 0;
                    // addSound(seagull);
            }
            } else if (!this.animal && random() < 0.001) {

                this.animal = true;
                this.symbol = random(waterAnimals);
                addSound(seagull);
            }
        }

        pop();
    }
}
