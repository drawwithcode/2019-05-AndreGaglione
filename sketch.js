var spiral;
var font;
var capture;

function preload() {
  font = loadFont('assets/Gayathri-Bold.ttf');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('black');
  //for framecount
  frameRate(5);
  capture = createCapture(VIDEO);
  capture.size(640, 480);
  capture.hide();//la mostro dopo

  button = createButton("take a pic");
  button.position(windowWidth / 2 - 50, windowHeight / 2 + 100);
  button.mousePressed(pic);



  spiral = new Spiral(600, 150);

  push();
  rSlider = createSlider(0, 255, 0);
  rSlider.position(windowWidth / 2 - 100, windowHeight / 2 + 30);
  gSlider = createSlider(0, 255, 0);
  gSlider.position(windowWidth / 2 - 100, windowHeight / 2 + 50);
  bSlider = createSlider(0, 255, 0);
  bSlider.position(windowWidth / 2 - 100, windowHeight / 2 + 70);
  pop();

}

function pic() {
  save("selfie.png");
}

function draw() {
  push();
  textAlign(CENTER, CENTER);
  fill('yellow');
  textSize(50);
  textFont(font);
  text("say cheeeese", windowWidth / 2, windowHeight / 2 - 20);
  pop();

  spiral.display();


}
//webcam input
function Spiral(_x, _y,) {
  this.x = _x;
  this.y = _y;

  this.start = width/2;
  this.angle = 90;
  this.speed = 0.1;
  this.distance = this.speed*40;

  this.move = function() {
    this.x =  this.start; //crea una spirale - tunnel
    this.y = height/2;
    this.angle -= this.speed;
    this.start = this.start - this.distance;
  }

  this.display = function() {
    translate(width/2, height/2);
    imageMode(CENTER);
    var myImage = capture.loadPixels();
    rotate((frameCount));
    rotate(this.angle);

    image(myImage, this.x, this.y, myImage.width, myImage.height);

    //filtro
    var r = rSlider.value();
    var g = gSlider.value();
    var b = bSlider.value();
    noStroke();
    fill(color(r, g, b, 75));
    rectMode(CENTER);
    rect(this.x, this.y, myImage.width, myImage.height);
  }

}
