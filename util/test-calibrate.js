var tessel = require('tessel'),
    ambientlib = require('ambient-attx4'),
    ambient = ambientlib.use(tessel.port['C']),
    calibrate = require('./calibrate');

ambient.on('ready', function(){
  console.log('Called ambient on-ready');
  console.log(calibrate.set(ambient, 'getSoundBuffer'));
});

