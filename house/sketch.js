let dirt ;
let floor;
let player;
let house;
let abandonedHouse;
let dirtimg= [];
let score = 0;
function preload(){
    dirtimg.push( loadImage('lint1.png'));
    dirtimg.push( loadImage('lint2.png'));
    dirtimg.push( loadImage('lint3.png'));
    dirtimg.push( loadImage('lint4.png'));
      dirtimg.push( loadImage('lint1.png'));
    dirtimg.push( loadImage('lint2.png'));
    dirtimg.push( loadImage('lint3.png'));
    dirtimg.push( loadImage('lint4.png'));
      dirtimg.push( loadImage('lint1.png'));
    dirtimg.push( loadImage('lint2.png'));
    dirtimg.push( loadImage('lint3.png'));
    dirtimg.push( loadImage('lint4.png'));
  playerimg = loadImage('rake.png');
    house = loadImage("house.png");
      abandonedHouse = loadImage("broken-house.png");

}

function setup() {
    var canvas = createCanvas(800, 550);

    // Move the canvas so it's inside our <div id="sketch-holder">.
    canvas.parent('sketch-holder');

    floor = new Sprite();
    floor.collider = 'static';
    floor.x = 690
    floor.y = 100;
    floor.w = 500;
    floor.h = 0;
    floor.rotation = 48;

    floor = new Sprite();
    floor.collider = 'static';
    floor.x = 110
    floor.y = 100;
    floor.w = 500;
    floor.h = 0;
    floor.rotation = -48;

  dirt = new Group();
  for (let i = 0; i < 10; i++) {
    let c = createSprite(dirtimg[i],
      random(100, width-100),
      random(100, height-100));
    c.shapeColor = color( 0);
    dirt.add(c);
  }
  player = createSprite(playerimg);
}
function draw() {
    background(abandonedHouse);
  player.velocity.x = 
    (mouseX-player.position.x)*0.1;
  player.velocity.y = 
    (mouseY-player.position.y)*0.1;
  player.overlap(dirt, removeDirt);
  player.collide(floor);
  drawSprites();
  fill(255);
  noStroke();
  textSize(45);
  textAlign(CENTER, CENTER);
  if (dirt.length > 0) {
    // text(score, width/2, height/2);
  }
  else {
    background(house);
    text("location maintained!", width/2, height/2);
   prepareFrame();
    noLoop()
  }
  
}
function removeDirt(player, coin) {
  coin.remove();
  score += 1;
}

       function prepareFrame() {
         setTimeout(() => {

        var ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", "https://art.teleportacia.org/observation/vernacular/");
        ifrm.style.width = "640px";
        ifrm.style.height = "480px";
        document.body.appendChild(ifrm);
}, 2000)
    }
