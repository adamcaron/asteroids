const $       = require('jquery');
var canvas    = document.getElementById('game');
var context   = canvas.getContext('2d');
var Game      = require('./game.js');

var game      = new Game(canvas, context);
listen();

function listen () {
    requestAnimationFrame(function gameLoop () {
        if (game.lives > 0) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            game.spaceTime.drawAll();

            requestAnimationFrame(gameLoop);
        }
        else {
            gameOver();
        }
  });
};

window.addEventListener("keydown", checkKeyDown, false);
window.addEventListener("keyup", checkKeyUp, false);

function checkKeyDown (e) {
    if (e.keyCode == "32") { //spacebar
        game.spaceTime.fireLaser();
    }
    else if(e.keyCode == "68") { //d
        if(game.spaceTime.mines.length < 5) {
        game.spaceTime.layMine();
        }
    }
    else if (e.keyCode == "37") { // left
        game.spaceTime.ship.updateAngle(-15);
    }
    else if(e.keyCode == "39") { // right
        game.spaceTime.ship.updateAngle(15);
    }
    else if(e.keyCode == "38") { // up
        thrustShip(game.spaceTime);
    }
    else if(e.keyCode == "40") { //down
        game.spaceTime.activeShield();
    }
    game.spaceTime.ship.moveShip();

}

function checkKeyUp (e) {
    if (e.keyCode == "40") { //down
        game.spaceTime.shields = [];
    }

    game.spaceTime.ship.flame = false;
}

function thrustShip (spaceTime) {
    if(spaceTime.ship.velocity <= 0) {
        spaceTime.ship.thrustAngle = spaceTime.ship.angle;
        spaceTime.ship.velocity += .2;
    }
    else if(spaceTime.ship.thrustAngle !== spaceTime.ship.angle) {
        if(spaceTime.ship.velocity > 0) {
        spaceTime.ship.velocity -= .3;
        }
        else {
            spaceTime.ship.velocity = 0;
        }
    }
    else if(spaceTime.ship.thrustAngle === spaceTime.ship.angle) {
        if(spaceTime.ship.velocity < 3) {
            spaceTime.ship.velocity += .2;
        }
    }

    spaceTime.ship.moveShip();
    spaceTime.ship.flame = true;
}

function gameOver () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    $('#game').toggle();
    $('#game-window').append('<div id="game-over"><p>GAME OVER<br>Score: ' + game.score + '</p></div>');
}