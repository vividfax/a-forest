class EmptyCell {

    constructor(x, y, fog) {

        this.x = x * cellSize;
        this.y = y * cellSize;
        this.symbol = "";
        this.fog = fog;
    }

    update() {

    }

    display() {

        push();
        translate(this.x, this.y);

        if (this.fog) {
            fill("#E2E2E2");
            rect(0, 0, cellSize);
        }

        pop();
    }
}