function calibrate(modDotMeth, runs){
  var highest = 0,
      lowest = 1,
      runs = runs || 100;

  var callback = function(err, data){
      if (err){
        console.error(err);
        return;
      }
      (data < lowest) && (lowest = data);
      (data > highest) && (highest = data);
      console.log(lowest, highest);
    }

  console.log('Called');

  for (var i = 0; i < runs; i++) {
    modDotMeth(callback);
  };
}

module.exports = calibrate;