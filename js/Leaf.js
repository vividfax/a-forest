class Leaf {

    constructor(x, y, fog, word) {

        this.gridX = x;
        this.gridY = y;
        this.x = x * cellSize;
        this.y = y * cellSize;
        this.symbol = random(leafEmojis);
        this.phrase = word;

        this.fog = fog;

        this.offsetX = int(random(-cellSize/4, cellSize/4));
        this.offsetY = int(random(-cellSize/4, cellSize/4));
        this.scale = random(0.6, 0.8);

        this.snowflakeOffsetX = int(random(-cellSize*.3, cellSize*.3));
        this.snowflakeOffsetY = int(random(-cellSize*.3, cellSize*.3));

        this.onScreen = false;
    }

    addChar(c) {

        grid.grid[this.gridX][this.gridY] = new Tree(this.gridX, this.gridY, false, this.phrase + c);
        addRandomSound(plantingSound, plantingSoundLength); // leaf to plant
    }

    update() {

        if (random() < 0.01) {

            let words = this.phrase.trim().split(" ");
            let completions = markov.completions(words);
            if (completions.length > 0) {
                let completion = random(completions);
                this.phrase += " " + completion;

                grid.grid[this.gridX][this.gridY] = new Tree(this.gridX, this.gridY, this.fog, this.phrase);
                if (this.onScreen) addRandomSound(plantingSound, plantingSoundLength); // leaf to plant
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