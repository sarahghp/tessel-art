var tessel = require('tessel'),
    servolib = require('servo-pca9685'),
    servo = servolib.use(tessel.port['B']);

var pubnub = require("pubnub").init({
  publish_key: "pub-c-09f2fc82-1e55-478c-a93d-f0d7265ee647", 
  subscribe_key: "sub-c-e9a1c52e-9ab9-11e4-a626-02ee2ddab7fe" 
});

var target = 0,
    init = 0;

function moveToTarget(target){

  if (target > init){
    console.log('Before execution:', init);
      for (var i = init, t = target; i < t; i += 0.05){
        (function(j){
          setTimeout(function moveUp(){
            console.log('Up Position:', 0.95-j);
            // servo.move(1, 0.95-j);
          }, j * 10000);
        })(i);
      } 
    init = target;
    console.log('After move up', init);
  } else if (target < init && Math.abs(target) > 0.01) {
    for (var i = init, t = target; i > t; i -= 0.05){
      (function(j){
        setTimeout(function moveDown(){
          console.log('Down Position:', 0.95-j);
          // servo.move(1, 0.95-j);
        }, (0.95-j) * 10000);
      })(i);
    }
    init = target;
  } else if (Math.abs(target) < 0.1){
    for (var i = init; 0 < i; i-= 0.05){
      (function(j){
        setTimeout(function moveDown(){
          console.log('0 Position:', 0.95-j);
          // servo.move(1, 0.95-j);
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
    }
  });

});