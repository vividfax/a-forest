class Tree {

    constructor(x, y, fog, phrase) {

        this.gridX = x;
        this.gridY = y;
        this.x = x * cellSize;
        this.y = y * cellSize;
        this.symbol = treeEmojis[0];
        this.phrase = phrase || "";

        this.fog = fog;
        this.mature = false;
        this.maturityAge = 40;

        if (this.phrase.length > this.maturityAge && this.symbol == treeEmojis[0]) {
            this.symbol = random([treeEmojis[1], treeEmojis[2]]);
            this.mature = true;
        }
    }

    addChar(c) {

        this.phrase += c;

        if (this.phrase.length > 15 && this.symbol == treeEmojis[0]) {
            this.symbol = random([treeEmojis[1], treeEmojis[2]]);
            this.mature = true;
        }
    }

    update() {

        if (this.fog) {
            return;
        }

        if (random() < 0.1) {

            if (this.mature) {
                markov.addText(this.phrase);
            }
            let words = this.phrase.trim().split(" ");
            let completions = markov.completions(words);
            if (completions.length > 0) {
                let completion = random(completions);
                this.phrase += " " + completion;
            }
        }

        if (this.phrase.length > this.maturityAge && this.symbol == treeEmojis[0]) {
            this.symbol = random([treeEmojis[1], treeEmojis[2]]);
            this.mature = true;
        }

        if (this.mature) {

            let tries = 8;

            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {

                    if (i == 0 && j == 0) continue;

                    let x = this.gridX + i;
                    let y = this.gridY + j;

                    if (x < 0) x == grid.width;
                    if (y < 0) y == grid.height;
                    if (x >= grid.width) x == 0;
                    if (y >= grid.height) y == 0;

                    if (grid.grid[x][y] instanceof EmptyCell) {
                        if (random(tries) < 0.1) {

                            let phrase = this.phrase.trim().replace(/[ ]+/g, " ");
                            let words = phrase.split(" ");
                            let word = random(words);
                            grid.grid[x][y] = new Leaf(x, y, false, word);
                            break;
                        }
                    }

                    tries--;
                }
            }
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