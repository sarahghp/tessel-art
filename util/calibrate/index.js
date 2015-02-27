//TODO: Passing args to method if necc
//      Add event interface

var RSVP = require('rsvp');

function get(mod, meth, bufferFlag, bufferCalls, fetchedData){

  var notBuffer = bufferFlag || false,            
      bufferCalls = bufferCalls || 10,
      fetchedData = fetchedData || { high: 0, low: 1 }; // defaults to assuming function returns values between 0 and 1

  var calibrate = new RSVP.defer(),
      promise = calibrate.promise;

  function dataCall(err, data){
    if (err){
      console.log(err);
    } 
    calibrate.resolve(data);
  }

  function pushData(num){
    var promises = [];

    function getValue(){
      return new RSVP.Promise(function(resolve, reject){
        mod[meth].call(mod, function(err, data){
          if (err){
            reject(err);
          } else {
            console.log('resolved', data);
            resolve(data);
          }
        });
      });
    }

    for (var i = 0; i < num; i++){
      promises.push(getValue());
    }

    RSVP.all(promises)
        .then(function(arr){calibrate.resolve(arr)});
  }

  function threshold(arr){
    console.log('threshold called', arr);
    for (var i = 0, l = arr.length; i < l; i++){
        (arr[i] < fetchedData.low) && (fetchedData.low = arr[i]);
        (arr[i] > fetchedData.high) && (fetchedData.high = arr[i]);
    }
    return fetchedData;
  }

  (function getData(){
    if (!notBuffer) {
      mod[meth].call(mod, dataCall);   // if the method returns an array, we can just call it once
    } else {
      pushData(bufferCalls);          // otherwise pushData will call repeatedly to build a buffer manually
    }
  })();

 return promise
    .then(threshold)
    .catch(function(err){
      console.log("Error: ", err);
    });
}

exports.get = get;