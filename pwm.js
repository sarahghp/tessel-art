var tessel = require('tessel'),
    port = tessel.port['GPIO'],
    pin = port.pwm[0],
    count = 0;

port.pwmFrequency(10000);
setInterval(function () {
  pin.pwmDutyCycle(++count%10/10);  // 10 steps 
  console.log(count%10/10);
}, 500);