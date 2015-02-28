var tessel = require('tessel'),
    ambientlib = require('ambient-attx4'),
    ambient = ambientlib.use(tessel.port['C']),
    calibrate = require('./calibrate');

// Using event syntax
ambient.on('ready', function(){
  calibrate.get(ambient, 'getSoundBuffer');
  
  calibrate.on('calibrated', function(data){
    console.log('on-calibrate', data);
  })
});

// Using as a promise
ambient.on('ready', function(){
  calibrate.get(ambient, 'getSoundBuffer')
           .then(function(data){
              console.log('promised', data);
            });
});

// Using all arguments
// Using as a promise
ambient.on('ready', function(){
  calibrate.get(ambient, 'getSoundLevel',{
              returnsSingle: true,
              calls: 20,
              thresholds: { high: 10, low: -1 }
            })
           .then(function(data){
              console.log('options', data);
            });
});

// Using all arguments
// Using event syntax
ambient.on('ready', function(){
  calibrate.get(ambient, 'getSoundLevel', {
    returnsSingle: true,
    calls: 20,
    thresholds: { high: 10, low: -1 }
  });

  calibrate.on('calibrated', function(data){
    console.log('on-calibrate', data);
  })
});