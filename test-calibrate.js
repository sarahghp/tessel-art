var tessel = require('tessel'),
    ambientlib = require('ambient-attx4'),
    ambient = ambientlib.use(tessel.port['A']),
    calibrate = require('./util/calibrate');

ambient.on('ready', function(){
  calibrate(ambient.getSoundBuffer);
});