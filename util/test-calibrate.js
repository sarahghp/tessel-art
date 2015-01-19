var tessel = require('tessel'),
    calibrate = require('./util/calibrate.js')
    ambientlib = require('ambient-attx4'),
    ambient = ambientlib.use(tessel.port['B']);

    ambient.on('ready', function(){
      calibrate(ambient.getSoundLevel);
    });
