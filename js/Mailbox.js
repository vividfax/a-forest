class Mailbox {

    constructor(x, y, fog) {

        this.gridX = x;
        this.gridY = y;
        this.x = x * cellSize;
        this.y = y * cellSize;
        this.symbol = mailboxEmojis[0];
        this.fog = fog;

        this.phrase = "";

        this.offsetX = 0;
        this.offsetY = 0;
        this.scale = 0.6;

        this.visiting = false;
        this.visited = false;

        this.greetings = ["Dearest friend", "Friend", "My dear", "My dearest friend", "My friend", "Dear friend"];
        this.goodbyes = ["Yours", "Yours always", "Much love", "Best wishes", "Remember this"];
        this.sender = ["Alys", "A"];

        this.snowflakeOffsetX = int(random(-cellSize*.3, cellSize*.3));
        this.snowflakeOffsetY = int(random(-cellSize*.3, cellSize*.3));
    }

    addChar(c) {

        this.phrase += c;

        if (this.phrase.length > 15 && !this.mature) {
            this.symbol = random(treeEmojis);
            this.mature = true;
            this.scale = random(1.8, 2.3);
            if (!typedSentence) typedSentence = true;
        }
    }

    update() {

    }

    display() {

        if (!this.visiting) {
            if (player.x == this.gridX && player.y == this.gridY) {
                if (mailCount < mail.mail.length) {
                    this.phrase += random(this.greetings) + ",";
                    this.phrase += "\n\n" + mail.mail[mailCount] + "\n\n";
                    this.phrase += random(this.goodbyes) + ",\n";
                    this.phrase += random(this.sender);
                    mailCount++;
                    this.visiting = true;
                    this.symbol = mailboxEmojis[1];
                }
                else {
                    this.phrase = "looks like it's just a blank piece of paper";
                    this.visiting = true;
                    this.symbol = mailboxEmojis[1];
                }
            }
        }
        // else if (this.visiting && !this.visited) {
        //     this.visited = true;
        //     this.symbol = mailboxEmojis[2];
        // }

        push();
        translate(this.x, this.y);
        cloudCanvas.translate(this.x, this.y);

        if (this.fog) {
            translate(this.snowflakeOffsetX, this.snowflakeOffsetY);
            drawFog();
        } else {


            translate(cellSize/2, cellSize/2-cellSize/3);
            translate(this.offsetX, this.offsetY);

            image(this.symbol, 0, cellSize/3, cellSize*.8*this.scale, cellSize*.8*this.scale);
        }

        pop();
    }
}