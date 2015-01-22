var RSVP = require('rsvp');

function set(mod, meth, bufferFlag){

  var highest = 0,
      lowest = 1,
      buffer = bufferFlag || true;

       console.log(meth, bufferFlag, buffer);

  function dataCall(err, data){
    if (err){
      console.log(err);
    } 
    return data;
  }


  function pushData(err, data){
    // singleGetData promise. then push to array. then return array 
  }

  function getData(){
    if (buffer) {
      console.log('called');
      return mod[meth].call(mod, dataCall); // use return instead of fetchedData to hold?
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

  var calibrate = new RSVP.Promise(function(resolve, reject){
    var arr = getData();
    console.log(arr);
    resolve(arr);
    reject(Error("Promise failed"));
  });

  return calibrate
        .then(threshold(val))
        .catch(function(err){
          console.log("Error: ", err);
        });
}

exports.set = set;