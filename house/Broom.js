class Broom {

    constructor(sprite) {

        this.x = random(width);
        this.y = random(100, height);

        this.sprite = sprite;
    }

    update() {

        let currentVector = createVector(this.x, this.y);
        let mouseVector = createVector(mouseX, mouseY);
        let newVector = p5.Vector.lerp(currentVector, mouseVector, 0.1);

        this.x = newVector.x;
        this.y = newVector.y;
    }

    display() {

        push();
        imageMode(CENTER);
        angleMode(DEGREES);
        translate(this.x, this.y);
        rotate(20);

        image(this.sprite, 0, 0);

        pop();
    }
}