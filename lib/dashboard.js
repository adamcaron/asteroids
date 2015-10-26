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
        spaceTime.ship.updateAngle(-15);
    }
    else if(e.keyCode == "39") { // right
        spaceTime.ship.updateAngle(15);
    }
    else if(e.keyCode == "38") { // up
        thrustShip(spaceTime);
    }
    else if(e.keyCode == "40") { // down
        if(spaceTime.ship.velocity > 0) {
            spaceTime.ship.velocity -= .1;
        }
        else {
            spaceTime.ship.velocity = 0;
        }
        spaceTime.ship.moveShip();
    }
}

function checkKeyUp (e) {
    if (e.keyCode == "70") {
        spaceTime.shields = [];
    }
};

function thrustShip (spaceTime) {
    if(spaceTime.ship.velocity < 3) {
        spaceTime.ship.velocity += .1;
    }
    else {
        spaceTime.ship.velocity = 3;
    }
    spaceTime.ship.thrustAngle = spaceTime.ship.angle;
    spaceTime.ship.moveShip();
}