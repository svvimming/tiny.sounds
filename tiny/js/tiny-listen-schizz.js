var work, arounds, are;
var the, best, nice, hehe;
var mic;
var analyzer;
var amplitude;
var creepy = false;

//variables for tiny wordz & background
let inconsolata;
let randyX = [];
let randyZ = [];
let point = 30;
let canvas = 800;
let wordz, letz;
let rflip = 0;
let gflip = 0;
let bflip = 0;

function preload() {
  work = loadSound('assets/edge-operators/embers.mp3');
  arounds = loadSound('assets/edge-operators/embers.mp3');
  are = loadSound('assets/edge-operators/embers.mp3');
  the = loadSound('assets/tinies/tiny.sounds.mp3');
  best = loadSound('assets/tinies/tiny.sounds.mp3');
  nice = loadSound('assets/tinies/tiny.sounds.mp3');
  hehe = loadSound('assets/tinies/tiny.sounds.mp3', listenCreepy());
  inconsolata = loadFont('assets/Inconsolata-Regular.ttf');
  wordz = loadStrings('assets/schizz.txt');
}

function setup() {
  frameRate(60);
  createCanvas(canvas*1.5, canvas, WEBGL);
  //background(255);
  edgeOps = [work, arounds, are];
  tinies = [the, best, nice, hehe];
  edgeOptions = loadStrings('assets/edge-operators.txt');
  tinyChoices = loadStrings('assets/tinies.txt');
  letz = split(wordz[0], ' ');
  //console.log(letz);
  buildarrays();
}

function listenCreepy() {
console.log('tiny sounds have arrived');
//for listening in creepy
mic = new p5.AudioIn(boring());
mic.start(letsCreep(), boring());
//for listening in creepier
analyzer = new p5.Amplitude();
analyzer.setInput(mic);
analyzer.smooth(0.5);

amplitude = new p5.Amplitude();
}

function letsCreep(){
  creepy = true;
}

function boring(){
  creepy = false;
}

function buildarrays(){
  for(var i=0; (i<letz.length); i++){
    append(randyX, random(800, 1200));
    append(randyZ, random(800, 1200));
  }
}

function trigSound(cue, rate, level, dur, buf) {
  let env;
  //envelope the sound nice
  env = new p5.Envelope(0.15, level, dur, level, 0.35, 0.0);
  env.setADSR(0.15, dur, 0.8, 1.0);
  //env.setExp(true);
  //play the tiny sounds, triggered in draw function
  buf.play(cue, rate, env, buf.duration()*random(0.0, 1.0), dur+0.5);
  env.play();
  amplitude.setInput(buf);
}

function boasty(zig, zag, point, where, dat, oi) {
  let time = millis();
  //fill(255)
  fill(255-rflip, 255-gflip, 255-bflip);
  textFont(inconsolata);
  textSize(point);
  textAlign(LEFT, LEFT);
  rotateX(-(time/zig)*((mouseY)/(canvas*50))-0.01);
  rotateZ(-(time/zag)*((mouseY)/(canvas*50))-0.01);
  text(oi, where, dat);
}

let time = 0;
let i = 0;
let j = 0;

function draw() {
  background(rflip, gflip, bflip);
  //listening creepy to trigger sound function nice
  if (creepy === true){
    var volume = mic.getLevel();
    var avg = analyzer.getLevel();
  } else {
    var volume = pow((pow(((mouseX*2)/(canvas*1.5)), 2)+pow(((mouseY*2)/canvas), 2)), 0.5);
    var avg = pow((pow(((pmouseX*2)/(canvas*1.5)), 2)+pow(((pmouseY*2)/canvas), 2)), 0.5);
  }
  //play soundz creepy
  if (abs(volume-avg) > 0.005 && (frameCount) % 20 === 0) {
    trigSound(random(0.0, 0.3), 1.0, (1/(1+exp(-5*(volume-0.25)))), random(1.0, 2.5), tinies[(i % 3)]);
    //1/(1+e**(-k(x-x0)))
    i++;
  } else if ((frameCount) % 20 === 0) {
    trigSound(random(0.0, 0.3), random(0.75, 1.15), (1/(1+exp(2-(3*volume)))), random(0.1, 0.2), edgeOps[(j % 3)]);
    j++;
  }
  // draw tiny wordz
  var ampout = (1.33*amplitude.getLevel());
  for(var k=0; (k<letz.length); k++){
    boasty(
      randyX[k],
      randyZ[k],
      floor(point-((point/2)*(k/letz.length)))*(1/(1+exp(-5*(ampout-0.05)))),
      letz[k].length*k - 500, //floor((point-((point/2)*(k/letz.length)))*k),
      0, //floor((point-((point/2)*(k/letz.length)))*k),
      letz[k]);
  }

  //keep track of time...
  if(frameCount % 60 === 0){
	   time = time + 1;
     console.log(time);
   }
  //squeeze thresholds closer over 60s: reset timer if thresholds are crossed
  let squeeze = 0.1**(1+time/30);
  if (volume > (avg+squeeze)) {
	  time = 0;
  } else if ((avg-squeeze) > volume) {
    time = 0;
  }
  //if thresholds are not crossed after 60 seconds, trigger a huge tiny
  if (0.01 > squeeze) {
    trigSound(0, 1.0, 1.0, random(4.0, 6.0), tinies[3]);
    time = 0;
  }
}

//to change soundz & colours
function mousePressed(){
    noLoop();
    //generate random indices
    let whodat = floor(random(edgeOptions.length));
    let gotcha = floor(random(tinyChoices.length));

    rflip = floor((whodat/edgeOptions.length)*255);
    gflip = floor((gotcha/tinyChoices.length)*255);
    bflip = random(0, 255);
    //grab new filepath for buffers with index
    work.setPath('assets/edge-operators/'.concat(edgeOptions[whodat]));
    arounds.setPath('assets/edge-operators/'.concat(edgeOptions[whodat]));
    are.setPath('assets/edge-operators/'.concat(edgeOptions[whodat]));
    console.log('assets/tinies/'.concat(edgeOptions[whodat]));

    the.setPath('assets/tinies/'.concat(tinyChoices[gotcha]));
    best.setPath('assets/tinies/'.concat(tinyChoices[gotcha]));
    nice.setPath('assets/tinies/'.concat(tinyChoices[gotcha]));
    hehe.setPath('assets/tinies/'.concat(tinyChoices[gotcha]));
    console.log('assets/tinies/'.concat(tinyChoices[gotcha]));
}

function mouseReleased(){
  loop();
}
