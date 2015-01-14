var tessel = require('tessel'),
    Npx = require('npx'),
    npx = new Npx(2);

// Copper timer code
var readPin = tessel.port['GPIO'].digital[2], // G3
    startTime = +new Date(),
    timer;

readPin.output(0);
readPin.on('rise', function(){
  startTime = +new Date();
});

function checkTime(now){
  var pin = readPin.read();
  console.log(pin);
  if (pin){
    return now - startTime;
  } else {
    return 0;
  }
}

// Neopixel code

var animation = npx.newAnimation(5), // initialized with number of animation frames
    animationOne = npx.newAnimation(1),
    animationTwo = npx.newAnimation(1),
    animationThree = npx.newAnimation(1),
    animationFour = npx.newAnimation(1),
    flicker = npx.newAnimation(1).setAll('#000000');

// var colorArr = [['#00A775', '#ff4d58'], ['#ff4d58', '#00A775'], ['#a100b3', '#000000'], ['#000000', '#a100b3']];

var colorDict = {
  alive: '#00A775', // eventually reasons[reason] > color
  wavering: '#ff4d58', // eventually programmatically reduce
  dead: '#000000'
};

var patterns = [];

// All alive example

function allAlive(){
  for (var i = 0; i < 5; i++){
    patterns[i] = [colorDict[alive], colorDict[alive]];
  }
}


// #1 Waning

function waning(waningPixel){
  for (var i = 0; i < 5; i++){
    (i % 2) ? 
      (patterns[i] = [colorDict[alive], colorDict[alive]]) : 
      (patterns[i] = [colorDict[wavering], colorDict[alive]]);
  }
}


// #1 Dead

function dead(deadPixel){
  for (var i = 0; i < 5; i++){
    (i % 4) ? 
      (patterns[i] = [colorDict[alive], colorDict[alive]]) : 
      (patterns[i] = [colorDict[dead], colorDict[alive]]);
}  

function generatePattern(timer){

  switch(timer){
    case (timer < 10000):
      allAlive();
      break;

    case (timer < 60000):
      waning();
      break;

    case (timer >= 60000):
      dead();
      break;

    default: 
      console.log('Timer error, no match found');
  }

  animationOne.setPattern([patterns[0]]);
  animationTwo.setPattern([patterns[1]]);
  animationThree.setPattern([patterns[2]]);
  animationFour.setPattern([patterns[3]]);
}


function animatePixels(){

  var now = +new Date();
  timer = checkTime(now); // if connection is maintained, timer continues to count
  console.log('now: ', now, 'timer: ', timer);

  generatePattern(timer);

  npx.enqueue(animationOne,1000)
     .enqueue(flicker, 100)
     .enqueue(animationTwo, 1000)
     .enqueue(flicker, 100)
     .enqueue(animationThree,1000)
     .enqueue(flicker, 100)
     .enqueue(animationFour,1000)
     .run();
};

// setImmediate(animatePixels);

// it's likely still that the interval will be offset with the enqueue interval 
// but that is desirable in this case

setInterval(animatePixels, 4500);