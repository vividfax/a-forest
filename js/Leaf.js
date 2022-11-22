class Leaf {

    constructor(x, y, fog, word) {

        this.gridX = x;
        this.gridY = y;
        this.x = x * cellSize;
        this.y = y * cellSize;
        this.symbol = random(leafEmojis);
        this.phrase = word;

        this.fog = fog;

        this.offsetX = random(-cellSize/5, cellSize/5);
        this.offsetY = random(-cellSize/5, cellSize/5);
        this.scale = random(0.6, 0.8);
    }

    addChar(c) {

        grid.grid[this.gridX][this.gridY] = new Tree(this.gridX, this.gridY, false, this.phrase + c);
    }

    update() {

        if (this.fog) {
            return;
        }

        if (random() < 0.01) {

            let words = this.phrase.trim().split(" ");
            let completions = markov.completions(words);
            if (completions.length > 0) {
                let completion = random(completions);
                this.phrase += " " + completion;

                grid.grid[this.gridX][this.gridY] = new Tree(this.gridX, this.gridY, false, this.phrase);
            }

        }

    }

    display() {

        push();
        translate(this.x, this.y);

        if (this.fog) {
            fill("#E2E2E2");
            rect(0, 0, cellSize);
        } else {
            // fill("#97C791");
            // rect(0, 0, cellSize);

            // fill(255, 50);
            // textAlign(LEFT, TOP);
            // textWrap(CHAR);
            // textSize(cellSize/10);
            // text(this.phrase, 0, 0, cellSize, cellSize);

            translate(cellSize/2, cellSize/2 + 2);
            translate(this.offsetX, this.offsetY);
            scale(this.scale);

            fill(255);
            textAlign(CENTER, CENTER);
            textSize(cellSize * 2/3);
            text(this.symbol, 0, 0);
        }

        pop();
    }
}