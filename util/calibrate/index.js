var RSVP = require('rsvp');

function set(mod, meth, bufferFlag){

  var highest = 0,
      lowest = 1,
      buffer = bufferFlag || true,
      fetchedData;

  var calibrate = new RSVP.defer();

  function dataCall(err, data){
    if (err){
      console.log(err);
    } 

    calibrate.resolve(data);

  }


  function pushData(err, data){
    // singleGetData promise. then push to array. then return array 
  }

  function getData(){
    if (buffer) {
      mod[meth].call(mod, dataCall);
    } else {
      mod[meth].call(mod, pushData);
    }
  }

  function threshold(arr){
    console.log('threshold called')
    for (var i = 0, l = arr.length; i < l; i++){
        (arr[i] < lowest) && (lowest = arr[i]);
        (arr[i] > highest) && (highest = arr[i]);
      }
    return { 'high': highest, 'low': lowest }
  }

  var promise = calibrate.promise;

  promise
    .then(threshold)
    .catch(function(err){
      console.log("Error: ", err);
    });
}

exports.set = set;