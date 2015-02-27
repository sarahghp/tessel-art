var RSVP = require('rsvp');

function set(mod, meth, bufferFlag){

  var buffer = bufferFlag || true,            // function returns values between 0 and 1
      fetchedData = { high: 0, low: 1 };

  var calibrate = new RSVP.defer(),
      promise = calibrate.promise;

  function dataCall(err, data){
    if (err){
      console.log(err);
    } 
    calibrate.resolve(data);
  }


  function pushData(err, data){
    // singleGetData promise. then push to array. then return array 
  }

  function threshold(arr){
    for (var i = 0, l = arr.length; i < l; i++){
        (arr[i] < fetchedData.low) && (fetchedData.low = arr[i]);
        (arr[i] > fetchedData.high) && (fetchedData.high = arr[i]);
    }
    return fetchedData;
  }

  (function getData(){
    if (buffer) {
      mod[meth].call(mod, dataCall);
    } else {
      mod[meth].call(mod, pushData);
    }
  })();

 return promise
    .then(threshold)
    .catch(function(err){
      console.log("Error: ", err);
    });
}

exports.set = set;