var RSVP = require('rsvp');

var highest = 0,
    lowest = 1,
    options = {};

function setOptions(mod, meth, bufferFlag){  // or get rid of this and just put everything inside set
  options.mod = mod;
  options.meth = meth;
  options.buffer = bufferFlag || true;
  options.userCall = undefined || userCall;
}


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
  if (options.buffer) {
    return options.mod[options.meth].call(options.mod, options.dataCall); // use return instead of fetchedData to hold?
  } else {
    return options.mod[options.meth].call(options.mod, options.pushData);
  }

}

function sort(data){
  for (var i = 0, l = data.length; i < l; i++){
      (data[i] < lowest) && (lowest = data[i]);
      (data[i] > highest) && (highest = data[i]);
    }
  return { 'high': highest, 'low': lowest }
}

var calibrate = new RSVP.Promise(function(resolve, reject){

  data = getData();

  resolve(return data);

  reject(Error("Promise failed"));

});



function set(mod, meth, bufferFlag){
  setOptions(mod, meth, bufferFlag);
  return calibrate.then(sort(val)).catch(function(err){
    console.log("Error: ", err);
  })
}

exports.set = set;

/* 

create promise, which on resolution, returns an object with low & hi values

1. Get values from (a) buffer or (b) by creating an array, based on the method [buffer flag]
2. Iterate through to get high & low
3. Return object with high & low
4. Use then to call a function in the test file 


*/


// function set(mod, meth, userCall){
//   var highest = 0,
//       lowest = 1;

//   function callback(err, data){
//     if (err){
//         console.error(err);
//     }

//     for (var i = 0, l = data.length; i < l; i++){
//       (data[i] < lowest) && (lowest = data[i]);
//       (data[i] > highest) && (highest = data[i]);
//     }
//     userCall(lowest, highest);
//   }

//   mod[meth].call(mod, callback);

// }


// exports.set = set;