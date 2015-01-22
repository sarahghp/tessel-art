var RSVP = require('rsvp');

function set(mod, meth, bufferFlag){

  var highest = 0,
      lowest = 1,
      buffer = bufferFlag || true;

  function dataCall(err, data){
    if (err){
      console.log(err);
    } 

    var calibrate = new RSVP.Promise(function(resolve, reject){
      resolve(data);
      reject(Error("Promise failed"));
    });

    console.log('DC called', calibrate);


    return calibrate;
  }


  function pushData(err, data){
    // singleGetData promise. then push to array. then return array 
  }

  function getData(){
    if (buffer) {
      return mod[meth].call(mod, dataCall);
    } else {
      return mod[meth].call(mod, pushData);
    }
  }

  function threshold(arr){
    for (var i = 0, l = arr.length; i < l; i++){
        (arr[i] < lowest) && (lowest = arr[i]);
        (arr[i] > highest) && (highest = arr[i]);
      }
    return { 'high': highest, 'low': lowest }
  }

  getData()
    .then(threshold)
    .catch(function(err){
      console.log("Error: ", err);
    });
}

exports.set = set;