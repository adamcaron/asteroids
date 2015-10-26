var canvas    = document.getElementById('game');
var context   = canvas.getContext('2d');
var SpaceTime = require('./spacetime.js');
var Game      = require('./game.js');

var game      = new Game();
var spaceTime = new SpaceTime(canvas, context, game);
listen();

function listen () {
  requestAnimationFrame(function gameLoop () {
      context.clearRect(0, 0, canvas.width, canvas.height);

      spaceTime.drawAll();
    requestAnimationFrame(gameLoop);
  });
};

window.addEventListener("keydown", checkKeyDown, false);
window.addEventListener("keyup", checkKeyUp, false);

function checkKeyDown (e) {
    if (e.keyCode == "32") { //spacebar
        spaceTime.fireLaser();
    }
    else if(e.keyCode == "70") { //f
        spaceTime.activeShield();
    }
    else if(e.keyCode == "68") { //d
        if(spaceTime.mines.length < 5) {
        spaceTime.layMine();
        }
    }
    else if (e.keyCode == "37") { // left
        spaceTime.ship.moveShip(-45,0);
    }
    else if(e.keyCode == "39") { // right
        spaceTime.ship.moveShip(45,0);
    }
    else if(e.keyCode == "38") { // up
        spaceTime.ship.moveShip(0,10);
    }
    else if(e.keyCode == "40") { // down
        spaceTime.ship.moveShip(0,-10);
    }
}

function checkKeyUp (e) {
    if (e.keyCode == "70") {
        spaceTime.shields = [];
    }
};