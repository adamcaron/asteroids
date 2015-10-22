var canvas    = document.getElementById('game');
var context   = canvas.getContext('2d');
var SpaceTime = require('./spacetime.js')

getInitialState();

function getInitialState () {
  var spaceTime = new SpaceTime(canvas, context);
  listen(spaceTime);
};

function listen (spaceTime) {
  requestAnimationFrame(function gameLoop () {
    window.addEventListener("keydown", checkKeyPressed, false);

    requestAnimationFrame(gameLoop);
  });
};


function checkKeyPressed (e) {
  if (e.keyCode == "70") { // f
    console.log(spaceTime)
    // ship.changeColor(blue);
  };
}