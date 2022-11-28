class Weather {

    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.symbol = random(weatherEmojis);

        this.dead = false;

        this.scale = random(0.8, 1.2);
    }

    update() {

        if (this.dead) return;

        if (grid.grid[this.x][this.y].fog == false) {
            this.dead = true;
        }
    }

    move() {

        if (this.dead) return;

        if (random() < 0.3) {

            let directions = [[0,1],[1,0],[-1,0],[0,-1]];
            let direction = random(directions);

            this.x += direction[0];
            this.y += direction[1];

            if (this.x < 0) this.x = grid.width-1;
            else if (this.x >= grid.width) this.x = 0;
            if (this.y < 0) this.y = grid.height-1;
            else if (this.y >= grid.height) this.y = 0;
        }
    }

    display() {

        if (this.dead) return;

        let offsetX = int(random(-cellSize/7, cellSize/7));
        let offsetY = int(random(-cellSize/7, cellSize/7));

        weatherCanvas.push();

        weatherCanvas.translate(this.x *cellSize, this.y * cellSize);
        weatherCanvas.translate(cellSize/2, cellSize/2);
        weatherCanvas.translate(offsetX, offsetY);

        weatherCanvas.image(this.symbol, 0, cellSize/3, cellSize*.3*this.scale, cellSize*.3*this.scale);

        weatherCanvas.pop();
    }
}