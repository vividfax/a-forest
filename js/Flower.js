class Flower {

    constructor(x, y, fog) {

        this.x = x * cellSize;
        this.y = y * cellSize;
        this.symbol = random(flowerEmojis);
        this.fog = fog;

        this.phrase = ":)";

        this.offsetX = int(random(-cellSize/7, cellSize/7));
        this.offsetY = int(random(-cellSize/7, cellSize/7));
        this.scale = random(0.4, 0.6);
    }

    update() {

    }

    display() {

        push();
        translate(this.x, this.y);

        if (this.fog) {
            drawFog();
        } else {
            translate(cellSize/2, cellSize/2);
            translate(this.offsetX, this.offsetY);

            image(this.symbol, -cellSize/5, -cellSize/5, cellSize*.8*this.scale, cellSize*.8*this.scale);
            image(this.symbol, cellSize/5, -cellSize/5, cellSize*.8*this.scale, cellSize*.8*this.scale);
            image(this.symbol, 0, cellSize/5, cellSize*.8*this.scale, cellSize*.8*this.scale);
        }

        pop();
    }
}