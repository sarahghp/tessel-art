var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    RSVP = require('rsvp');

function Calibrate(){

  var self = this;

  this.get = function (mod, meth, userOptions){

      var options = {
        returnsSingle: false,
        calls: 10,
        thresholds: { high: 1, low: 0 }
      }

      if (userOptions){
        userOptions.returnsSingle && (options.returnsSingle = userOptions.returnsSingle);
        userOptions.calls && (options.calls = userOptions.calls);
        userOptions.thresholds && (options.thresholds = userOptions.thresholds);
      }

      var notBuffer   = options.returnsSingle,            
          bufferCalls = options.calls,
          fetchedData = { high: options.thresholds.low, low: options.thresholds.high }; // reverse values for threshold test 

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
        for (var i = 0, l = arr.length; i < l; i++){
            (arr[i] < fetchedData.low) && (fetchedData.low = arr[i]);
            (arr[i] > fetchedData.high) && (fetchedData.high = arr[i]);
        }
        fetchedData['buffer'] = arr;
        self.emit('calibrated', fetchedData); // emit event for those who prefer event interface
        return fetchedData;     // return data for those using .then()
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
}


util.inherits(Calibrate, EventEmitter);
module.exports = new Calibrate();