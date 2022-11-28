class Animal {

    constructor(x, y) {

        this.x = x;
        this.y = y;
        this.symbol = random(animalEmojis);

        this.previousPositions = [];
    }

    move() {

        this.previousPositions.push([this.x, this.y]);

        if (this.previousPositions.length > 5) {
            this.previousPositions.shift();
        }

        if (random() < 0.3) {

            let directions = [[0,1],[1,0],[-1,0],[0,-1]];
            let direction = random(directions);
            let x = direction[0];
            let y = direction[1];

            let targetCell = grid.grid[mod(this.x+x, worldWidth)][mod(this.y+y, worldHeight)];

            if (targetCell instanceof Water) return;

            this.x += x;
            this.y += y;

            this.x = mod(this.x, worldWidth);
            this.y = mod(this.y, worldHeight);
        }
    }

    display() {

        push();

        translate(this.x *cellSize, this.y * cellSize);
        translate(cellSize/2, cellSize/2);

        image(this.symbol, 0, cellSize*.3, cellSize/2, cellSize/2);

        pop();

        for (let i = 0; i < this.previousPositions.length; i++) {

            let x = this.previousPositions[i][0];
            let y = this.previousPositions[i][1];

            if (x == this.x && y == this.y) {
                continue;
            }

            if (grid.grid[x][y].fog) continue;

            if (grid.grid[x][y] instanceof EmptyCell == false) {
                continue;
            }

            let cellBelow = grid.grid[x][y+1];

            if (cellBelow instanceof House || cellBelow instanceof Tree) continue;

            push();

            translate(this.previousPositions[i][0] *cellSize, this.previousPositions[i][1] * cellSize);
            translate(cellSize/2, cellSize/2);

            tint(255, (i+1)*30);
            image(pawPrintsEmoji, 0, cellSize*.3, cellSize/3, cellSize/3);

            pop();
        }
    }
}