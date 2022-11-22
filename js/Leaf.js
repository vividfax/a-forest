class Leaf {

    constructor(x, y, fog, word) {

        this.gridX = x;
        this.gridY = y;
        this.x = x * cellSize;
        this.y = y * cellSize;
        this.symbol = random(leafEmojis);
        this.phrase = word;

        this.fog = fog;
    }

    addChar(c) {

        grid.grid[this.gridX][this.gridY] = new Tree(this.gridX, this.gridY, false, this.phrase + c);
    }

    update() {

        if (random() < 0.01) {

            markov.addText(this.phrase);
            let words = this.phrase.trim().split(" ");
            let completions = markov.completions(words);
            let completion = random(completions);
            this.phrase += " " + completion;

            grid.grid[this.gridX][this.gridY] = new Tree(this.gridX, this.gridY, false, this.phrase);
        }

    }

    display() {

        push();
        translate(this.x, this.y);

        fill("#97C791");
        rect(0, 0, cellSize);

        fill(255, 50);
        textAlign(LEFT, TOP);
        textWrap(CHAR);
        textSize(cellSize/10);
        text(this.phrase, 0, 0, cellSize, cellSize);

        fill(255);
        textAlign(CENTER, CENTER);
        textSize(cellSize * 2/3);
        text(this.symbol, cellSize / 2, cellSize / 2 + 2);

        pop();
    }
}