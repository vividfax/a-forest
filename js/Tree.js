class Tree {

    constructor(x, y, fog, phrase) {

        this.gridX = x;
        this.gridY = y;
        this.x = x * cellSize;
        this.y = y * cellSize;
        this.symbol = random(plantEmojis);
        this.phrase = phrase || "";

        this.fog = fog;
        this.mature = false;
        this.maturityAge = 40;

        if (this.phrase.length > this.maturityAge && this.symbol == treeEmojis[0]) {
            this.symbol = random(treeEmojis);
            this.mature = true;
        }

        this.offsetX = int(random(-cellSize/4, cellSize/4));
        this.offsetY = int(random(-cellSize/4, cellSize/4));
        this.scale = random(1.8, 2.3);

        if (!this.mature) {
            this.scale = 0.6;
        }

        this.snowflakeOffsetX = int(random(-cellSize*.3, cellSize*.3));
        this.snowflakeOffsetY = int(random(-cellSize*.3, cellSize*.3));

        this.onScreen = false;
    }

    addChar(c) {

        this.phrase += c;

        if (this.phrase.length > 15 && !this.mature) {
            this.symbol = random(treeEmojis);
            this.mature = true;
            this.scale = random(1.8, 2.3);
            if (!typedSentence) typedSentence = true;
            if (this.onScreen) addRandomSound(plantingSound, plantingSoundLength); // plant to tree
        }
    }

    update() {

        if (random() < 0.1) {

            let words = this.phrase;
            words = words.replace(/,/g, " ,")
            words = words.replace(/\./g, " .")
            words = words.replace(/\[/g, "[ ")
            words = words.replace(/\]/g, " ]")
            words = words.replace(/\(/g, "( ")
            words = words.replace(/\)/g, " )")
            words = words.trim().split(/ /g);

            let completions = markov.completions(words);

            while (completions.length <= 0 && words.length > 1) {
                words.shift();
                completions = markov.completions(words);
            }

            if (completions.length > 0) {
                let completion = random(completions);
                this.phrase += " " + completion;
            }
        }

        if (this.phrase.length > this.maturityAge && !this.mature) {
            this.symbol = random(treeEmojis);
            this.mature = true;
            this.scale = random(1.8, 2.3);
            if (this.onScreen) addRandomSound(plantingSound, plantingSoundLength); // plant to tree
        }

        if (this.mature) {

            let tries = 8;

            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {

                    if (i == 0 && j == 0) continue;

                    let x = this.gridX + i;
                    let y = this.gridY + j;

                    if (x < 0) x == grid.width-1;
                    if (y < 0) y == grid.height-1;
                    if (x >= grid.width) x == 0;
                    if (y >= grid.height) y == 0;

                    if (grid.grid[x][y] instanceof EmptyCell) {
                        if (random(tries) < 0.1) {

                            let phrase = this.phrase;
                            phrase = phrase.replace(/[^a-zA-Z]/g, " ");
                            phrase = phrase.replace(/[ ]+/g, " ");
                            phrase = phrase.trim();
                            let words = phrase.split(" ");
                            let word = random(words);
                            grid.grid[x][y] = new Leaf(x, y, grid.grid[x][y].fog, word);
                            if (this.onScreen) addRandomSound(leaves, leavesLength);
                            break;
                        }
                    }

                    tries--;
                }
            }
        }

        this.onScreen = false;
    }

    display() {

        push();
        translate(this.x, this.y);
        cloudCanvas.translate(this.x, this.y);

        if (this.fog) {
            translate(this.snowflakeOffsetX, this.snowflakeOffsetY);
            drawFog();
        } else {

            this.onScreen = true;

            // fill("#97C791");
            // rect(0, 0, cellSize);

            // fill(255, 50);
            // textAlign(LEFT, TOP);
            // textWrap(CHAR);
            // textSize(cellSize/10);
            // text(this.phrase, 0, 0, cellSize, cellSize);

            translate(cellSize/2, cellSize/2);
            translate(this.offsetX, this.offsetY);

            if (this.mature) {
                translate(0, -cellSize/2);
                treesOnScreen++;
            }
            // scale(this.scale);

            // fill(255);
            // textAlign(CENTER, CENTER);
            // textSize(cellSize * 2/3);
            image(this.symbol, 0, 0, cellSize*.8*this.scale, cellSize*.8*this.scale);
            //text(this.symbol, 0, 0);
        }

        pop();
    }
}