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
    }

    update() {

    }

    display() {

        push();
        translate(this.x, this.y);
        cloudCanvas.translate(this.x, this.y);

        let corners = [1,1,1,1];
        let cornerRadius = 15;

        if (grid.grid[this.gridX + 1][this.gridY] instanceof Water) {
            corners[1] = 0;
            corners[2] = 0;
        }
        if (grid.grid[this.gridX - 1][this.gridY] instanceof Water) {
            corners[0] = 0;
            corners[3] = 0;
        }
        if (grid.grid[this.gridX][this.gridY + 1] instanceof Water) {
            corners[2] = 0;
            corners[3] = 0;
        }
        if (grid.grid[this.gridX][this.gridY - 1] instanceof Water) {
            corners[0] = 0;
            corners[1] = 0;
        }

        fill("#57A9CB");
        rect(0, 0, cellSize, cellSize, corners[0]*cornerRadius, corners[1]*cornerRadius, corners[2]*cornerRadius, corners[3]*cornerRadius);

        if (this.fog) {
            drawFog();
        } else {

            let lefthandCell = grid.grid[this.gridX - 1][this.gridY];
            let rightHandCell = grid.grid[this.gridX + 1][this.gridY];

            if (!this.wave && lefthandCell instanceof Water == false && rightHandCell instanceof Water && random() < 0.02) {
                this.wave = true;
            }

            if (this.wave) {
                translate(cellSize/2, cellSize/2);
                image(waterEmoji, 0, 0, cellSize*.7, cellSize*.7);
                this.wave = false;

                if (rightHandCell instanceof Water) {
                    grid.grid[this.gridX + 1][this.gridY].waveNextFrame = true;
                }
            }

            if (this.waveNextFrame) {
                this.wave = true;
                this.waveNextFrame = false;
            }
        }

        pop();
    }
}