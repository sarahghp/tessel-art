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

var animation = npx.newAnimation(5); // initialized with number of animation frames
var animationOne = npx.newAnimation(1);
var animationTwo = npx.newAnimation(1);

var colorArr = [['#00A775', '#ff4d58'], ['#ff4d58', '#00A775'], ['#a100b3', '#000000'], ['#000000', '#a100b3']];

function animatePixels(){

  var now = +new Date();
  timer = checkTime(now); // if connection is maintained, timer continues to count
  console.log('now: ', now, 'timer: ', timer);

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
     .run();
};

setImmediate(animatePixels);
setInterval(animatePixels, 4000);