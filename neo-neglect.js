var tessel = require('tessel'),
    Npx = require('npx'),
    npx = new Npx(2);

var pubnub = require("pubnub").init({
  publish_key: "pub-c-09f2fc82-1e55-478c-a93d-f0d7265ee647", 
  subscribe_key: "sub-c-e9a1c52e-9ab9-11e4-a626-02ee2ddab7fe" 
});

var patterns = [[], [], [], [], []]; // one spot for each animation

var pins = (function generatePins(){
  
  // Pin constuctor
  function Pin(port, reason){
    this.pin = tessel.port['GPIO'].digital[port];
    this.reason = reason;
    this.startTime = +new Date();
    this.timer = 0;

    this.checkTime = function(now){
      var pin = this.pin.rawRead();
      if (pin){
        this.timer = now - this.startTime;
      } else {
        this.startTime = +new Date();
        this.timer = 0;
      }
    }
  }

  // Create array
  var pinOne = new Pin(2, 'curiosity'), // G3
      pinTwo = new Pin(4, 'recommendation'), // G5
      arr = [pinOne, pinTwo]; 

  // Set on-rise
  (function setPins(arr){
    arr.forEach(function(el){
      el['pin'].on('rise', function(){
        this.startTime = +new Date();
      });
      el['pin'].pull(pulldown);
    });
  })(arr);

  return arr;

})();

// Neopixel code

var animation = npx.newAnimation(5), // initialized with number of animation frames
    animationOne = npx.newAnimation(1),
    animationTwo = npx.newAnimation(1),
    animationThree = npx.newAnimation(1),
    animationFour = npx.newAnimation(1);


var colorDict = {
  dying: '#313149',
  dead: '#000010',
  flicker: '#000001',
  curiosity:{
    alive: '#00A775',
    wavering: '#313149', // eventually programmatically reduce
  },
  recommendation: {
    alive: '#9d252d',
    wavering: '#313149', // eventually programmatically reduce (#222280)
  }
};



function alive(reason, pixel){
  console.log('Alive', pixel);
  pubnub.publish({channel: "book-message", error: function(){console.log("Pubnub error")}, message: "Book is alive!"});
  for (var i = 0; i < 5; i++){
    var rand = Math.random() * 10;
    (rand < 9.5) ?
      (patterns[i][pixel] = colorDict[reason]['alive']) :
      (patterns[i][pixel] = colorDict['flicker']);
  }
}

function waning(reason, waningPixel){
  console.log('Waning', pixel);
  pubnub.publish({channel: "book-message", error: function(){console.log("Pubnub error")}, message: "Book is waning! Reeeead."});
  for (var i = 0; i < 5; i++){
    var rand = Math.random() * 10;
    (rand < 7) ? 
      (patterns[i][waningPixel] = colorDict[reason]['wavering']) : 
      (patterns[i][waningPixel] = colorDict[reason]['alive']);
  }
}

function dying(reason, deadPixel){
  console.log('Dying', pixel);
  pubnub.publish({channel: "book-message", error: function(){console.log("Pubnub error")}, message: "Book is dying! You monster!"});
  for (var i = 0; i < 5; i++){
    var rand = Math.random() * 10;
    (rand < 7.2) ? 
      (patterns[i][deadPixel] = colorDict['dying']) : 
      (patterns[i][deadPixel] = colorDict[reason]['alive']);
    }
}

function dead(reason, deadPixel){
  console.log('Dead', pixel);
  pubnub.publish({channel: "book-message", error: function(){console.log("Pubnub error")}, message: "Book is dead! RIP"});
  for (var i = 0; i < 5; i++){
    var rand = Math.random() * 10;
    (rand < 7) ? 
      (patterns[i][deadPixel] = colorDict['dead']) : 
      (patterns[i][deadPixel] = colorDict[reason]['alive']);
    }
}

function off(pixel){
  for (var i = 0; i < 5; i++){
    patterns[i][pixel] = '#000001';
  }
} 

function generatePattern(timer, pixel, reason){

  switch(true){
    case (timer === 0):
      off(pixel);
      break;
    case (timer < 30000):
      alive(reason, pixel);
      break;

    case (timer < 50000):
      waning(reason, pixel);
      break;

    case (timer < 100000):
      dying(reason, pixel);
      break;

    case (timer >= 100000):
      dead(reason, pixel);
      break;

    default: 
      console.warn('Timer error, no match found');
  }
}


function animatePixels(){

  var now = +new Date();

  pins.forEach(function(el, index){
    el.checkTime(now);
    generatePattern(el.timer, index, el.reason);
    console.log(index, ' : ', el.pin.rawRead());
  });

  animationOne.setPattern(patterns[0]);
  animationTwo.setPattern(patterns[1]);
  animationThree.setPattern(patterns[2]);
  animationFour.setPattern(patterns[3]);

  npx.enqueue(animationOne,   500)
     .enqueue(animationTwo,   500)
     .enqueue(animationThree, 500)
     .enqueue(animationFour,  500)
     .run();
};


setImmediate(animatePixels);

// it's likely still that the interval will be offset with the enqueue interval 
// but that is desirable in this case

setInterval(animatePixels, 2200);