function calibrate(modDotMeth){
  var highest = 0,
      lowest = 1;

  console.log(modDotMeth.toString());

  function callback(err, data){
    console.log('called');
    if (err){
        console.error(err);
    }
    console.log(data);

    for (var i = 0, l = data.length; i < l; i++){
      (data[i] < lowest) && (lowest = data[i]);
      (data[i] > highest) && (highest = data[i]);
    }

    console.log(lowest, highest);

  }

   (modDotMeth)(callback);

}

module.exports = calibrate;