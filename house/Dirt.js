class Dirt {

    constructor(sprite) {

        this.x = random(50, width-50);
        this.y = random(150, height-50);

        this.sprite = sprite;

        this.collected = false;
    }

    update() {

        if (!this.collected && dist(this.x, this.y, broom.x, broom.y) < 50) {

            this.collected = true;
            dirtCollectedCount++;
        }
    }

    display() {

        if (!this.collected) {

            push();
            imageMode(CENTER);

            image(this.sprite, this.x, this.y);

            pop();
        }
    }
}