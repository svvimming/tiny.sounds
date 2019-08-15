const express = require('express');
const app = express();
const tiniesFolder = './tiny/assets/tinies';
const edgeOpsFolder = './tiny/assets/edge-operators';
const fs = require('fs');

app.use(express.static('tiny'));

app.listen(3000);

const data1 = fs.readdirSync(tiniesFolder);
fs.writeFile('./tiny/assets/tinies.txt', '', 'utf8', callback);
var i;
for (i = 0; i < data1.length; i++) {
  if(data1[i] !== '.DS_Store'){
    console.log(data1[i]);
    fs.appendFileSync('./tiny/assets/tinies.txt', data1[i], 'utf8');
    if(i<data1.length-1) {fs.appendFileSync('./tiny/assets/tinies.txt', '\n', 'utf8')};
  }
}

const data2 = fs.readdirSync(edgeOpsFolder);
fs.writeFile('./tiny/assets/edge-operators.txt', '', 'utf8', callback);
var j;
for (j = 0; j < data2.length; j++) {
  if(data2[j] !== '.DS_Store'){
    console.log(data2[j]);
    fs.appendFileSync('./tiny/assets/edge-operators.txt', data2[j], 'utf8');
    if(j<data2.length-1) {fs.appendFileSync('./tiny/assets/edge-operators.txt', '\n', 'utf8')};
  }
}

function callback(){
  console.log("nice data!");
}
