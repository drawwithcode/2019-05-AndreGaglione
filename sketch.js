var capture;

function setup() {
  createCanvas(windowWidth,windowHeight);

  capture = createCapture(VIDEO);
  capture.size(windowWidth, windowHeight);
  capture.hide();

  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  background('black');

  //text part
  var myText = "press to solve the chaos";
  drawingContext.font = "400 120px Press Start 2P Display";
  drawingContext.textAlign = "center";
  fill('white');
  text(myText, width/2, pmouseY+height/3);

  var inverted_height = -height;
  var myFeed = capture.loadPixels();

  //moving pretty unlogically the camera inside the space
  if(mouseX<width/2){
    image(myFeed, mouseY, mouseX, windowWidth/(mouseX/20), windowHeight/(mouseY/20));
    if(mouseIsPressed){
      //putting cointinously randomness (a sort of animation) to the camera
      image(myFeed, mouseY, mouseX, random()*width, random()*height);
    }
  }
  //in the right part things are different
  else {
    if(mouseIsPressed){
      image(myFeed, mouseX, mouseY, random()*width+width/8, random()*height + inverted_height/8);
    }
    else {
      image(myFeed, mouseX, mouseY, windowWidth/(mouseY/10) + width/8, windowHeight/(mouseX/10)+ inverted_height/8);
    }
  }


}


//Object
