class Player {

    constructor() {

        this.x;
        this.y;
        this.cameraX = 0;
        this.cameraY = 0;
        this.reset();
        this.symbol = walkDownImgs[1];

        grid.grid[this.x][this.y].fog = false;
    }

    reset() {

        this.x = int(worldWidth/2);
        this.y = int(worldHeight/2);
        this.cameraX = 0;
        this.cameraY = 0;
        grid.clearFog(this.x, this.y);
    }

    move(x, y) {

        let targetCell = grid.grid[mod(this.x+x, worldWidth)][mod(this.y+y, worldHeight)];

        if (targetCell instanceof Water) {
            addSound(bumpSound);
            return;
        }

        if (targetCell instanceof Flower) {
            addRandomSound(footStepsFlowers, footStepsFlowersLength);
        } else {
            addRandomSound(footStepsGrass, footStepsGrassLength);
        }

        this.x += x;
        this.y += y;

        this.x = mod(this.x, worldWidth);
        this.y = mod(this.y, worldHeight);

        grid.clearFog(this.x, this.y);

        this.cameraX -= x;
        this.cameraY -= y;

        if (this.cameraX > width/cellSize*0.25 || this.cameraX < -width/cellSize*0.25) {
            this.cameraX += x;
        }

        if (this.cameraY > height/cellSize*0.1 || this.cameraY < -height/cellSize*0.1) {
            this.cameraY += y;
        }

        hasMoved = true;
        this.steps++;
    }

    display() {

        push();
        translate(this.x *cellSize, this.y * cellSize);
        translate(cellSize/2, cellSize/2);

        //fill("#97C791");
        //rect(-cellSize/2, -cellSize/2, cellSize);

        // fill(0);
        // textSize(cellSize);
        // text(this.symbol, 0, 0);
        image(this.symbol, 0, -cellSize*.1, cellSize, cellSize);

        pop();
    }
}