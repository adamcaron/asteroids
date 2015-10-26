var canvas    = document.getElementById('game');
var context   = canvas.getContext('2d');
var Game      = require('./game.js');

var game      = new Game(canvas, context);
listen();

function listen () {
  requestAnimationFrame(function gameLoop () {
      context.clearRect(0, 0, canvas.width, canvas.height);
      game.spaceTime.drawAll();
    requestAnimationFrame(gameLoop);
  });
};

window.addEventListener("keydown", checkKeyDown, false);
window.addEventListener("keyup", checkKeyUp, false);

function checkKeyDown (e) {
    if (e.keyCode == "32") { //spacebar
        game.spaceTime.fireLaser();
    }
    else if(e.keyCode == "70") { //f
        game.spaceTime.activeShield();
    }
    else if(e.keyCode == "68") { //d
        if(game.spaceTime.mines.length < 5) {
        game.spaceTime.layMine();
        }
    }
    else if (e.keyCode == "37") { // left
        game.spaceTime.ship.updateAngle(-45);
    }
    else if(e.keyCode == "39") { // right
        game.spaceTime.ship.updateAngle(45);
    }
    else if(e.keyCode == "38") { // up
        if(game.spaceTime.ship.velocity < 3) {
            game.spaceTime.ship.velocity += .1;
        }
        else {
            game.spaceTime.ship.velocity = 3;
        }
        game.spaceTime.ship.moveShip();
    }
    else if(e.keyCode == "40") { // down
        if(game.spaceTime.ship.velocity > 0) {
            game.spaceTime.ship.velocity -= .1;
        }
        else {
            game.spaceTime.ship.velocity = 0;
        }
        game.spaceTime.ship.moveShip();
    }
}

function checkKeyUp (e) {
    if (e.keyCode == "70") {
        game.spaceTime.shields = [];
    }
};