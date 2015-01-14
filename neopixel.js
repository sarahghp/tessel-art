var tessel = require('tessel'); // import tessel
var gpio = tessel.port['GPIO']; // select the GPIO port
var myPin = gpio.digital[5]; // on GPIO, can be gpio.digital[0] through 5 or gpio.pin['G3'] through ‘G6’
// Turn on the pin
myPin.output(1); // setting ‘true’ has the same effect
// Read the pin
console.log('Reading pin:', myPin.read());
// Turn off the pin
myPin.output(0); // setting ‘false’ has the same effect. We could also call myPin.toggle() here.
// Read the pin
console.log('Reading pin:', myPin.read());

// var tessel = require('tessel'),
//     Npx = require('npx'),
//     npx = new Npx(2);

// var patterns = [[], [], [], [], []]; // one spot for each animation

// var pins = (function generatePins(){
  
//   // Pin constuctor
//   function Pin(port, reason){
//     this.pin = tessel.port['GPIO'].digital[port];
//     this.reason = reason;
//     this.startTime = +new Date();
//     this.timer = 0;

//     // this.setLow = function(){
//     //   this.pin.output(0);
//     //   console.log('In Low:', this.pin.read());
//     // }

//     this.checkTime = function(now){
//       var pin = this.pin.read();
//       if (pin){
//         this.timer = now - this.startTime;
//       } else {
//         this.timer = 0;
//       }
//     }
//   }

//   // Create array
//   var pinOne = new Pin(2, 'curiosity'), // G3
//       pinTwo = new Pin(4, 'recommendation'), // G5
//       arr = [pinOne, pinTwo]; 

//   // Set on-rise
//   (function setPins(arr){
//     arr.forEach(function(el){
//       el['pin'].rawWrite(0);
//       console.log('In set: ', el.pin.read());
//       el['pin'].on('rise', function(){
//         this.startTime = +new Date();
//       });
//     });
//   })(arr);

//   return arr;

// })();

// // Neopixel code

// var animation = npx.newAnimation(5), // initialized with number of animation frames
//     animationOne = npx.newAnimation(1),
//     animationTwo = npx.newAnimation(1),
//     animationThree = npx.newAnimation(1),
//     animationFour = npx.newAnimation(1),
//     flicker = npx.newAnimation(1).setAll('#000000');


// var colorDict = {
//   dead: '#000000',
//   curiosity:{
//     alive: '#00A775',
//     wavering: '#ff4d58', // eventually programmatically reduce
//   },
//   recommendation: {
//     alive: '#3d9e00',
//     wavering: '#9e0096', // eventually programmatically reduce
//   }
// };



// function alive(reason, pixel){
//   for (var i = 0; i < 5; i++){
//     patterns[i][pixel] = colorDict[reason]['alive'];
//   }
// }

// function waning(reason, waningPixel){
//   for (var i = 0; i < 5; i++){
//     (i % 2) ? 
//       (patterns[i][waningPixel] = colorDict[reason]['wavering']) : 
//       (patterns[i][waningPixel] = colorDict[reason]['alive']);
//   }
// }

// function dead(reason, deadPixel){
//   for (var i = 0; i < 5; i++){
//     (i % 4) ? 
//       (patterns[i][deadPixel] = colorDict['dead']) : 
//       (patterns[i][deadPixel] = colorDict[reason]['wavering']);
//     }
// }

// function off(pixel){
//   for (var i = 0; i < 5; i++){
//     patterns[i][pixel] = colorDict['dead'];
//   }
// } 

// function generatePattern(timer, pixel, reason){

//   switch(true){
//     case (timer === 0):
//       off(pixel);
//       break;
//     case (timer < 10000):
//       alive(reason, pixel);
//       break;

//     case (timer < 60000):
//       waning(reason, pixel);
//       break;

//     case (timer >= 60000):
//       dead(reason, pixel);
//       break;

//     default: 
//       console.log('Timer error, no match found');
//   }
// }


// function animatePixels(){

//   var now = +new Date();

//   pins.forEach(function(el, index){
//     el.checkTime(now);
//     generatePattern(el.timer, index, el.reason);
//     console.log(index, ' : ', el.pin.read());
//   });

//   // console.log(patterns);

//   animationOne.setPattern(patterns[0]);
//   animationTwo.setPattern(patterns[1]);
//   animationThree.setPattern(patterns[2]);
//   animationFour.setPattern(patterns[3]);

//   npx.enqueue(animationOne,1000)
//      .enqueue(flicker, 50)
//      .enqueue(animationTwo, 1000)
//      .enqueue(flicker, 50)
//      .enqueue(animationThree,1000)
//      .enqueue(flicker, 50)
//      .enqueue(animationFour,1000)
//      .run();
// };


// setImmediate(animatePixels);

// // it's likely still that the interval will be offset with the enqueue interval 
// // but that is desirable in this case

// setInterval(animatePixels, 5000);