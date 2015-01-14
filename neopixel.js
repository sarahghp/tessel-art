var tessel = require('tessel'),
    Npx = require('npx'),
    npx = new Npx(2);

// Copper timer code
var readPin = tessel.port['GPIO'].digital[0].read(), // G1
    startTime = +new Date(),
    timer;

// setInterval(function(){
//   console.log(readPin, startTime);
// }, 1000);

// Neopixel code

var animation = npx.newAnimation(5); // initialized with number of animation frames
var animationOne = npx.newAnimation(1);
var animationTwo = npx.newAnimation(1);

var colorArr = [['#00A775', '#ff4d58'], ['#ff4d58', '#00A775'], ['#a100b3', '#072e00'], ['#072e00', '#a100b3']];

function animatePixels(){

  var now = +new Date();
  timer = now - startTime;
  console.log('now: ' + now, timer);

  if (timer < 50000){
    animationOne.setPattern(colorArr[0]);
    animationTwo.setPattern(colorArr[1]);
  } else { 
    animationOne.setPattern(colorArr[2]);
    animationTwo.setPattern(colorArr[3]);
  }

  npx.enqueue(animationOne,1000)
     .enqueue(animationTwo,1000)
     .enqueue(animationOne,1000)
     .enqueue(animationTwo,1000)
     .enqueue(animationOne,1000)
     .enqueue(animationTwo,1000)
     .enqueue(animationOne,1000)
     .enqueue(animationTwo,1000)
     .enqueue(animationOne,1000)
     .enqueue(animationTwo,1000)
     .enqueue(animationOne,1000)
     .enqueue(animationTwo,1000)
     .run();
};

setImmediate(animatePixels);
setInterval(animatePixels, 10000);


// Pin.on('rise'), start things, then on('fall'), start over
