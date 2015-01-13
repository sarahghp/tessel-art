// Import the interface to Tessel hardware
var tessel = require('tessel');

// Set the led pins as outputs with initial states
// Truthy initial state sets the pin high
// Falsy sets it low.
var led1 = tessel.led[0].output(1);
var led2 = tessel.led[1].output(0);
var led3 = tessel.led[2].output(0);
var led4 = tessel.led[3].output(1);

setInterval(function () {
    console.log("I'm blinking! (Press CTRL + C to stop)");
    // Toggle the led states
    led1.toggle();
    led2.toggle();
    led3.toggle();
    led4.toggle();
}, 200);