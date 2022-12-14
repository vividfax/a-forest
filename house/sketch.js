let dirt ;
let floor;
let player;
let house;
let abandonedHouse;
let links;
let dirtimg= [];
let score = 0;

let linkHttp = "";
let linkLabel = "";

let ifrm;

let won = false;

function preload(){
    dirtimg.push( loadImage('../images/lint1.png'));
    dirtimg.push( loadImage('../images/lint2.png'));
    dirtimg.push( loadImage('../images/lint3.png'));
    dirtimg.push( loadImage('../images/lint4.png'));
    dirtimg.push( loadImage('../images/lint1.png'));
    dirtimg.push( loadImage('../images/lint2.png'));
    dirtimg.push( loadImage('../images/lint3.png'));
    dirtimg.push( loadImage('../images/lint4.png'));
    dirtimg.push( loadImage('../images/lint1.png'));
    dirtimg.push( loadImage('../images/lint2.png'));
    dirtimg.push( loadImage('../images/lint3.png'));
    dirtimg.push( loadImage('../images/lint4.png'));
    playerimg = loadImage('../images/rake.png');
    house = loadImage("../images/house.png");
    abandonedHouse = loadImage("../images/broken-house.png");
    links = loadJSON("../json/links.json");
}

// function setup() {
//     var canvas = createCanvas(800, 550);

//     // Move the canvas so it's inside our <div id="sketch-holder">.
//     // canvas.parent('sketch-holder');

//      floor = new Sprite();
//     floor.collider = 'static';
//     floor.x = 690
//     floor.y = 100;
//     floor.w = 500;
//     floor.h = 0;
//     floor.rotation = 48;

//     floor = new Sprite();
//     floor.collider = 'static';
//     floor.x = 110
//     floor.y = 100;
//     floor.w = 500;
//     floor.h = 0;
//     floor.rotation = -48;

//     floor = new Sprite();
//     floor.collider = 'static';
//     floor.x =0
//     floor.y = 400;
//     floor.w = 400;
//     floor.h = 0;
//     floor.rotation = 90;


//     floor = new Sprite();
//     floor.collider = 'static';
//     floor.x =800;
//     floor.y = 400;
//     floor.w = 400;
//     floor.h = 0;
//     floor.rotation = 90;

//     floor = new Sprite();
//     floor.collider = 'static';
//     floor.x =0;
//     floor.y = 530;
//     floor.w = 2000;
//     floor.h = 0;
//     floor.rotation = 0;

//     floor = new Sprite();
//     floor.collider = 'static';
//     floor.x = 400;
//     floor.y = 0;
//     floor.w = 440;
//     floor.h = 0;
//     floor.rotation = 0;

//   dirt = new Group();
//   for (let i = 0; i < 10; i++) {
//     let c = createSprite(dirtimg[i],
//       random(100, width-100),
//       random(100, height-100));
//     c.shapeColor = color( 0);
//     dirt.add(c);
//   }
//   player = createSprite(playerimg);

//     prepareFrame();
// }

// function draw() {
//     clear();
//     background(abandonedHouse);
//   player.velocity.x =
//     (mouseX-player.position.x)*0.1;
//   player.velocity.y =
//     (mouseY-player.position.y)*0.1;
//   player.overlap(dirt, removeDirt);
//   player.collide(floor);
//   drawSprites();
//   fill(255);
//   noStroke();
//   textSize(45);
//   textAlign(CENTER, CENTER);
//   if (dirt.length > 0) {
//     // text(score, width/2, height/2);
//   }
//   else {
//     background(house);
//     won = true;
//     // text("location maintained!", width/2, height/2);
//     // noLoop()
//   }

//   if (won) {
//     won = false;
//     ifrm.style.visibility = "visible";
//     window.top.houseMaintained();
//   }
// }

let dirtCollectedCount = 0;
let dirtPieces = [];
let broom;

function setup() {

    createCanvas(800, 550);

    broom = new Broom(playerimg);

    for (let i = 0; i < 10; i++) {

        dirtPieces.push(new Dirt(dirtimg[i]));
    }

    prepareFrame();
}

function draw() {

    if (dirtCollectedCount >= 10) {
        won = true;
    }

    if (won) {
        won = false;
        ifrm.style.visibility = "visible";
        window.top.houseMaintained();
    }

    if (window.top.isHouseMaintained()) {

        clear();
        image(house, 0, 0, width, height);
        return;
    }

    clear();
    image(abandonedHouse, 0, 0, width, height);

    for (let i = 0; i < dirtPieces.length; i++) {

        dirtPieces[i].update();
        dirtPieces[i].display();
    }

    broom.update();
    broom.display();
}

// function removeDirt(player, coin) {
//   coin.remove();
//   score += 1;
// }

function prepareFrame() {
         setTimeout(() => {
let rand = Math.floor(Math.random() * 15);
        ifrm = document.createElement("iframe");
        fill(0)
        strokeCap(ROUND);
        strokeWeight(10)
        stroke(255)
        textSize(22)
        text( linkLabel, width/2, 530)
        ifrm.style.visibility = "hidden";
        ifrm.style.width = "640px";
        ifrm.style.height = "480px";
        document.body.appendChild(ifrm);
}, 2000)
}

function addLink(linkParts) {
    linkHttp = linkParts.link;
    linkLabel = linkParts.label;

    setFrameLink();
}

function setFrameLink() {
    ifrm.setAttribute("src", linkHttp);
}

function reset() {

    ifrm.style.visibility = "hidden";

    dirtCollectedCount = 0;

    broom = new Broom(playerimg);

    dirtPieces = [];

    for (let i = 0; i < 10; i++) {

        dirtPieces.push(new Dirt(dirtimg[i]));
    }

    // if (dirt.length > 0) {
    //     dirt.removeAll();
    // }

    // dirt = new Group();

    // for (let i = 0; i < 10; i++) {
    //   let c = createSprite(dirtimg[i],
    //     random(100, width-100),
    //     random(100, height-100));
    //   c.shapeColor = color( 0);
    //   dirt.add(c);
    // }
}

function load() {

    ifrm.style.visibility = "visible";

    // dirt = new Group();
}
