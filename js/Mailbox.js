class Mailbox {

    constructor(x, y, fog) {

        this.gridX = x;
        this.gridY = y;
        this.x = x * cellSize;
        this.y = y * cellSize;
        this.symbol = mailboxEmojis[0];
        this.fog = fog;

        this.phrase = "";
        this.empty = false;

        this.offsetX = 0;
        this.offsetY = 0;
        this.scale = 0.6;

        this.visiting = false;
        this.visited = false;

        this.greetings = ["Dearest friend", "Friend", "My dear", "My dearest friend", "My friend", "Dear friend"];
        this.goodbyes = ["Yours", "Yours always", "Much love", "Best wishes"];
        this.sender = ["Alys", "A"];

        this.snowflakeOffsetX = int(random(-cellSize*.3, cellSize*.3));
        this.snowflakeOffsetY = int(random(-cellSize*.3, cellSize*.3));

        this.side = 1;
        this.w = 960;
        this.h = 600;
        this.postcardWritingImage = random(postcardWritingImages);
        this.postcardPhotoImage = random(postcardPhotoImages);
    }

    addChar(c) {

        if (!this.empty) return;

        this.phrase += c;
    }

    update() {

    }

    display() {

        if (!this.visiting) {
            if (player.x == this.gridX && player.y == this.gridY) {
                if (mailCount < mail.mail.length) {
                    this.phrase = mail.mail[mailCount];
                    mailCount++;
                    this.visiting = true;
                    this.symbol = mailboxEmojis[1];
                }
                else {
                    // this.phrase = "looks like it's just a blank piece of paper";
                    this.empty = true;
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

    displayPostcard() {

        push();
        translate(width/2, height/2);

        if (this.side == 1) {
            rectMode(CENTER);
            fill("#eee");
            rect(0, 0, this.w+20, this.h+20);
            image(this.postcardWritingImage, 0, 0);

            textAlign(LEFT, TOP);
            textSize(cellSize*.45);
            textLeading(cellSize*.45);
            textFont(postcardFont);
            rectMode(CORNER);
            fill("#404040");
            text(this.phrase, -this.w/2+40, -this.h/2+30, this.w/2-60, this.h-0);
        } else if (this.side == -1) {

            rectMode(CENTER);
            fill("#eee");
            rect(0, 0, this.w+20, this.h+20);
            image(this.postcardPhotoImage, 0, 0);
        }

        pop();
    }
}