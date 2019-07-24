var tiny;
var edgeOps;
var mic;
var analyzer;

// can add in more variables containing sound files and choose for trigSound function w/ random([array])
function preload() {
edgeOps = loadSound('assets/edge-operators/embers.wav');
tiny = loadSound('assets/tinies/tiny.sounds.wav', listenCreepy());
}

function setup() {
  frameRate(60);
  createCanvas(710, 200);
  background(255);
  textSize(30);
  textAlign(CENTER);

  tiny.amp(0);
  tinyChoices = loadStrings('assets/tinies.txt');
  edgeOptions = loadStrings('assets/edge-operators.txt');
}

function listenCreepy() {
console.log('tiny sounds have arrived');
//for listening in creepy
mic = new p5.AudioIn();
//starts listening creepier
mic.start();

analyzer = new p5.Amplitude();
analyzer.setInput(mic);
analyzer.smooth(0.5);
}

//write in parameter for start location in sound file********
function trigSound(cue, amp, dur, buf, rate) {
  let env;
  //envelope the sound nice
  //.Env() is deprecated for old versions so it's gotta be .Envelope nice
  env = new p5.Envelope();
  env.setExp(true);
  env.setADSR(0.2, dur, 0.8, 1.2);
  env.setRange(amp, 0);
  //play the edge operators (tiny sounds), triggered in draw function
  buf.play(cue, rate, amp, buf.duration()*random(0.0, 1.0), dur+1.4);
  env.play(buf);
  env.triggerRelease(buf, 0.2+dur);
}

function lilcurvy(level){
  var curve = (0.5)*(pow(3, level)-1);
  return curve;
}

let time = 0;
function draw() {

  //listening to sound to trigger sound function nice
  var volume = mic.getLevel();
  let avg = analyzer.getLevel();
  //play soundz creepy
  if (abs(volume-avg) > 0.005 && (frameCount) % 8 === 0) {
    trigSound(random(0.0, 0.3), lilcurvy(volume)*0.5, random(0.5, 2.0), tiny, 1.0);
  } else if ((frameCount) % 12 === 0) {
    trigSound(random(0.0, 0.1), 0, random(0.1, 0.2), edgeOps, 0.75);
  }

  //keep track of time...
  if(frameCount % 60 === 0){
	   time = time + 1;
   }
  //squeeze thresholds closer over 60s: reset timer if thresholds are crossed
  let squeeze = 0.1**(1+time/30);
  if (volume > (avg+squeeze)) {
	  time = 0;
  } else if ((avg-squeeze) > volume) {
    time = 0;
  }
  //if thresholds are not crossed after 60 seconds, trigger big soundz
  if (0.01 > squeeze) {
    trigSound(0, 1.0, random(2.0, 3.0), tiny, 1.0);
    time = 0;
  }

  //for visualizing thresholds:
  let yvolume = map(volume, 0, 1, height, 0);
  let yupper = map((avg+squeeze), 0, 1, height, 0);
  let ylower = map((avg-squeeze), 0, 1, height, 0);

  noStroke();
  fill(175);
  rect(0, 0, 20, height);
  // Then draw a rectangle on the graph, sized according to volume
  stroke(0, 0, 0);
  line(0, yvolume, 19, yvolume);
  stroke(128,0,128);
  line(0, yupper, 19, yupper);
  stroke(255, 204, 0);
  line(0, ylower, 19, ylower);
  text(time, width / 2, height / 2);
}

function mousePressed(){
    let whodat = floor(random(tinyChoices.length));
    let gotcha = floor(random(edgeOptions.length));
    tiny.setPath('assets/tinies/'.concat(tinyChoices[whodat]));
    console.log('assets/tinies/'.concat(tinyChoices[whodat]));
    edgeOps.setPath('assets/edge-operators/'.concat(edgeOptions[gotcha]));
    console.log('assets/tinies/'.concat(edgeOptions[gotcha]));
}
