var tessel = require('tessel'),
    Npx = require('npx'),
    npx = new Npx(2);

var animation = npx.newAnimation(5) // initialized with number of animation frames

var animationOne = npx.newAnimation(1).setPattern(['#00A775', '#ff4d58']);
var animationTwo = npx.newAnimation(1).setPattern(['#ff4d58', '#00A775']);
var animationThree = npx.newAnimation(1).setPattern(['#00A775', '#ff4d58']);


npx.enqueue(animationOne,1000)
   .enqueue(animationTwo,1000)
   .enqueue(animationOne,1000)
   .enqueue(animationTwo,1000)
   .enqueue(animationOne,1000)
   .enqueue(animationTwo,1000)
   .enqueue(animationOne,1000)
   .enqueue(animationTwo,1000)
   .enqueue(animationOne,1000)
   .enqueue(animationTwo,1000)
   .enqueue(animationOne,1000)
   .enqueue(animationTwo,1000)
   .run();