let inconsolata;
let randyX = [];
let randyZ = [];
let point = 25;
let canvas = 800;
let letz;
var mic;

function preload() {
  inconsolata = loadFont('assets/inconsolata.otf');
  wordz = loadStrings('assets/schizz.txt', listenCreepy());
}
function setup() {
  createCanvas(canvas*1.5, canvas, WEBGL);
  letz = split(wordz[0], ' ');
  console.log(letz);
  buildarrays();
}

function listenCreepy() {
console.log('tiny sounds have arrived');
//for listening in creepy
mic = new p5.AudioIn();
mic.start();
}

function buildarrays(){
  for(var i=0; (i<letz.length); i++){
    append(randyX, random(800, 1200));
    append(randyZ, random(800, 1200));
  }
}

function draw() {
  background(0);
  var volume = mic.getLevel();
  for(var i=0; (i<letz.length); i++){
    boasty(
      randyX[i],
      randyZ[i],
      floor(point-((point/2)*(i/letz.length)))*(1/(1+exp(-5*(volume-0.25)))),
      letz[i].length*i - 500, //floor((point-((point/2)*(i/letz.length)))*i),
      0, //floor((point-((point/2)*(i/letz.length)))*i),
      letz[i]);
  }
}

function boasty(zig, zag, point, where, dat, oi) {
  let time = millis();
  textFont(inconsolata);
  textSize(point);
  textAlign(LEFT, LEFT);
  rotateX(-(time/zig)*((mouseY)/(canvas*10))-0.01);
  rotateZ(-(time/zag)*((mouseY)/(canvas*10))-0.01);
  text(oi, where, dat);
}
