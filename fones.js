let cnv;
let song;
let mic;
let amp;
let xoff = 0;
let xstep = 3;
let lispo;
let myFont;
let stars;

function preload() {

  song = loadSound('images/sea.mp3');
  lispo = loadStrings('images/lispo.txt', doText);
  myFont = loadFont('images/PFGaramondClassic-OsFReg.ttf');
  stars = loadImage ("images/stars.png");
}

function doText(data) {
  lispo = data;
}


function setup() {

  let cnv = createCanvas(windowWidth, windowHeight);

  song.loop();
  song.setVolume(0.5);

  
  textAlign(LEFT);


  mic = new p5.AudioIn();
  mic.start();
  reverb = new p5.Reverb();
  delay = new p5.Delay() ;
  mic.connect(reverb);
  amp = new p5.Amplitude();
  reverb.set(5, 0);
  delay.amp(8);
  amp.setInput(mic);
  //background(255);



  fill('#00A99D');
  textFont(myFont);
  for (var i = 0; i < lispo.length; i++) {
    //textAlign(windowWidth/2, windowHeight/2);
    textSize(18);
    text(lispo[i], 150, 150+i*20);
  }
}

function draw() {

  noStroke();
  fill('#AF1528');
  let level = amp.getLevel();
  // adjust map values to taste; actual levels
  // tend to be between 0 and 0.5
  let barHeight = map(level, 0, 0.05, 0, height);
  rect(xoff, height - barHeight, xstep, barHeight);
  xoff += xstep;
  if (xoff > width) {
    xoff = 0;
  }
  fill('white');
  textFont(myFont);
  textSize(18);
  text('Ξυπνάς και δεν είναι πια εκεί.', 150, 670);
  text('Μουρμουρίζεις μια μελωδία που φέρνει τη νύχτα.', 150, 690);

  image(stars, 0, 0);
}
