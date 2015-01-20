function calibrate(mod, meth, userCall){
  var highest = 0,
      lowest = 1;

  function callback(err, data){
    if (err){
        console.error(err);
    }

    for (var i = 0, l = data.length; i < l; i++){
      (data[i] < lowest) && (lowest = data[i]);
      (data[i] > highest) && (highest = data[i]);
    }
    userCall(lowest, highest);
  }

  mod[meth].call(mod, callback);

}


exports.set = calibrate;