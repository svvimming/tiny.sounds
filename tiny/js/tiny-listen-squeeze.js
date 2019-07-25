var work, arounds, are;
var the, best, nice, hehe;
var mic;
var analyzer;

function preload() {
work = loadSound('assets/edge-operators/embers.mp3');
arounds = loadSound('assets/edge-operators/embers.mp3');
are = loadSound('assets/edge-operators/embers.mp3');
the = loadSound('assets/tinies/tiny.sounds.mp3');
best = loadSound('assets/tinies/tiny.sounds.mp3');
nice = loadSound('assets/tinies/tiny.sounds.mp3');
hehe = loadSound('assets/tinies/tiny.sounds.mp3', listenCreepy());
}

function setup() {
  frameRate(60);
  createCanvas(710, 200);
  background(255);
  edgeOps = [work, arounds, are];
  tinies = [the, best, nice, hehe];
  edgeOptions = loadStrings('assets/edge-operators.txt');
  tinyChoices = loadStrings('assets/tinies.txt');
}

function listenCreepy() {
console.log('tiny sounds have arrived');
//for listening in creepy
mic = new p5.AudioIn();
mic.start();
//for listening in creepier
analyzer = new p5.Amplitude();
analyzer.setInput(mic);
analyzer.smooth(0.5);
}

function trigSound(cue, rate, level, dur, buf) {
  let env;
  //envelope the sound nice
  env = new p5.Envelope(0.15, level, dur, level, 0.35, 0.0);
  //env.setExp(true);
  //play the tiny sounds, triggered in draw function
  buf.play(cue, rate, env, buf.duration()*random(0.0, 1.0), dur+0.5);
  env.play();
}

let time = 0;
let i = 0;
let j = 0;

function draw() {
  //listening creepy to trigger sound function nice
  var volume = mic.getLevel();
  let avg = analyzer.getLevel();
  //play soundz creepy
  if (abs(volume-avg) > 0.005 && (frameCount) % 20 === 0) {
    trigSound(random(0.0, 0.3), 1.0, (1/(1+exp(-5*(volume-0.25)))), random(0.7, 2.5), tinies[(i % 3)]);
    //1/(1+e**(-k(x-x0)))
    i++;
  } else if ((frameCount) % 20 === 0) {
    trigSound(random(0.0, 0.3), random(0.75, 1.15), volume, random(0.1, 0.2), edgeOps[(j % 3)]);
    j++;
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

//to change soundz
function mousePressed(){
    //generate random indices
    let whodat = floor(random(edgeOptions.length));
    let gotcha = floor(random(tinyChoices.length));
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
