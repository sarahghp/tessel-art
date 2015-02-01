var tessel = require('tessel'),
    servolib = require('servo-pca9685'),
    servo = servolib.use(tessel.port['B']),
    Npx = require('npx'),
    npx = new Npx(1),
    animation = npx.newAnimation(1);

var pubnub = require("pubnub").init({
  publish_key: "pub-c-09f2fc82-1e55-478c-a93d-f0d7265ee647", 
  subscribe_key: "sub-c-e9a1c52e-9ab9-11e4-a626-02ee2ddab7fe" 
});

var target = 0,
    init = 0;

// These colors make no sense because the pixel is being illogical & I can't figure out why.

var colorDict = {
  'inert':  '#0000bb',  // should show blue
  'low':    '#ff588a',  // should show green
  'medium': '#00dd00',  // should show orange
  'high':   '#00a775'   // should show red
};

function setLED(target){
  console.log('set LED called');
  switch(true){
    case (Math.abs(target) < 0.1):
      console.log('Inert called', colorDict.inert);
      animation.setAll(colorDict.inert);
      break;

    case (target < 3):
      console.log('Low called', colorDict.low);
      animation.setAll(colorDict.low);
      break;

    case (target < 5):
      console.log('Medium called', colorDict.medium);
      animation.setAll(colorDict.medium);
      break;

    case (target > 5):
      console.log('High called', colorDict.high);
      animation.setAll(colorDict.high);
      break;

    default:
      console.log('Color error, no match found');
  }
}

function moveToTarget(target){

  if (target > init){
      for (var i = init, t = target; i < t; i += 0.05){
        (function(j){
          setTimeout(function moveUp(){
            console.log('Up Position:', 0.95-j);
            servo.move(1, 0.95-j);
          }, j * 10000);
        })(i);
      } 
    init = target;
  } else if (target < init && Math.abs(target) > 0.01) {
    for (var i = init, t = target; i > t; i -= 0.05){
      (function(j){
        setTimeout(function moveDown(){
          console.log('Down Position:', 0.95-j);
          servo.move(1, 0.95-j);
        }, (0.95-j) * 10000);
      })(i);
    }
    init = target;
  } else if (Math.abs(target) < 0.1){
    for (var i = init; 0 < i; i-= 0.05){
      (function(j){
        setTimeout(function moveDown(){
          console.log('0 Position:', 0.95-j);
          servo.move(1, 0.95-j);
        }, (0.95-j) * 10000);
      })(i);
    }
    init = 0;
  }
}

servo.on('ready', function () {
  console.log('Running');
  servo.configure(1, 0.05, 0.10);
  
  pubnub.subscribe({
    channel: "spiny-servo",
    message: function(m){
      console.log('Message received:', m);
      moveToTarget(+m * .1);
      setLED(+m);
      npx.play(animation);
    }
  });

});