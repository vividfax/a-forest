class EmptyCell {

    constructor(x, y, fog) {

        this.x = x * cellSize;
        this.y = y * cellSize;
        this.symbol = "";
        this.fog = fog;

        this.pawOffsetX = int(random(-cellSize*.1, cellSize*.1));
        this.pawOffsetY = int(random(-cellSize*.1, cellSize*.1));
    }

    update() {

    }

    display() {

        push();
        translate(this.x, this.y);
        cloudCanvas.translate(this.x, this.y);

        if (this.fog) {
            drawFog();
        }

        pop();
    }
}