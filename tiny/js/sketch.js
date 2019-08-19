let inconsolata;
let canvas = 800;
let letterz;
let time, hang;
let col;
let olo;
let lor;


function preload(){
  inconsolata = loadFont('assets/Inconsolata-Regular.ttf');
  letterz = 'speedy edge operators flagrant oscillators full ledge pendulous parsing think pineapple schizz for ontic placeholder blistering strata, swollen, gliding, peripheral jitters, landing, liken here they roll and clump and bounce (placeholder) and boulversé tenuous agitations see an ecology of speeds form a processual rotunda where associated milieus gloop across a (non volitional) matrix crispy rhythmachines, oozes fabulatory ontologies of vibrational forceviscous globs and almond crinklesonieric trajactories these creatures lustfully cling to their terse curves screaching with laughter through latent surrounds';
}

function setup() {
  frameRate(30);
  createCanvas(canvas*1.5, canvas, WEBGL);
  col = random(0, 255);
  olo = random(0, 255);
  lor = random(0, 255);

}

function stacks(txt, xpos, ypos, spacer, angle){
  fill(col, olo, lor);
  textFont(inconsolata);
  textSize(20*angle);
  textAlign(LEFT, LEFT);
  rotateZ(angle*((300*angle)/(15*canvas)));
  text(txt, -400 + xpos + spacer, ypos-200);
}


function draw() {
  background(255);
  let time = millis()/10000;
  for(var i=0; (i<letterz.length); i++){
    let hang = (1+(i/10));
    stacks(letterz[i], (10*hang)*sin((i/10)*PI+(time*hang))+100*sin((i/100)*PI+time)+(i*sin(2*i*PI)), -350+(i*20), 0, (i*PI/100));
    stacks(letterz[i+21], (10*hang)*sin(((i+21)/10)*PI+(time*hang))+100*sin(((i+21)/100)*PI+time)+(i*sin(2*i*PI)), -350+(i*20), 48, (i*PI/100));
    stacks(letterz[i+42], (10*hang)*sin(((i+42)/10)*PI+(time*hang))+100*sin(((i+42)/100)*PI+time)+(i*sin(2*i*PI)), -350+(i*20), 120, (i*PI/100));
    stacks(letterz[i+63], (10*hang)*sin(((i+63)/10)*PI+(time*hang))+100*sin(((i+63)/100)*PI+time)+(i*sin(2*i*PI)), -350+(i*20), 240, (i*PI/100));
    stacks(letterz[i+84], (10*hang)*sin(((i+84)/10)*PI+(time*hang))+100*sin(((i+84)/100)*PI+time)+(i*sin(2*i*PI)), -350+(i*20), 360, (i*PI/100));
  }
}

// xpos 10*sin((time/1000)*PI)
// ypos -350+(i*20)
