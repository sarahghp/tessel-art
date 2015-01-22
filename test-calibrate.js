var tessel = require('tessel'),
    ambientlib = require('ambient-attx4'),
    ambient = ambientlib.use(tessel.port['A']),
    calibrate = require('./util/calibrate');

// var soundHigh, soundLow;

// function userCall(low, high) {
//   soundLow = low;
//   soundHigh = high;
//   console.log(soundLow, soundHigh);
// }

ambient.on('ready', function(){
  var test = calibrate.set(ambient, 'getSoundBuffer');
  console.log(test);
});

