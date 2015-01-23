var tessel = require('tessel'),
    servolib = require('servo-pca9685'),
    servo = servolib.use(tessel.port['B']);

var target = 1; // Eventually will be driven by pubnub input

function moveToTarget(target){
  for (var i = 0, t = target; i < t; i += 0.05){
    (function(j){
      setTimeout(function move(){
        console.log('Position:', j);
        servo.move(1, j);
      }, j * 10000);
    })(i);
  }
}

servo.on('ready', function () {
  servo.configure(1, 0.05, 0.14, function () {
    moveToTarget(target);  
  });
});