var canvas    = document.getElementById('game');
var context   = canvas.getContext('2d');
var Game      = require('./game.js');

var game      = new Game(canvas, context);
renderWelcomeScreen();

function listen () {
    requestAnimationFrame(function gameLoop () {
        if (game.lives > 0) {
            listenForInput();
            context.clearRect(0, 0, canvas.width, canvas.height);
            game.spaceTime.drawAll();

            requestAnimationFrame(gameLoop);
        }
        else {
            game.gameOver();
        }
    });
};

window.addEventListener("keydown", checkKeyDown, false);
window.addEventListener("keyup", checkKeyUp, false);

var keys = {
    "37": false, // left
    "39": false, // right
    "40": false  // down
}

function listenForInput () {
    if (keys["37"]) { // left
        game.spaceTime.ship.updateAngle(-4);
    }
    else if(keys["39"]) { // right
        game.spaceTime.ship.updateAngle(4);
    }
    else if(keys["40"]) { // down
        if(game.shield > 0) {
            game.spaceTime.activeShield();
        }
    }
    game.spaceTime.ship.moveShip();
};


function checkKeyDown (e) {

    if (e.keyCode == "32") { // spacebar
        game.spaceTime.fireLaser();
    }
    else if(e.keyCode == "68") { // d
        if(game.spaceTime.mines.length < 5) {
            game.spaceTime.layMine();
        }
    }
    else if (e.keyCode == "37") { // left
        keys["37"] = true;
    }
    else if(e.keyCode == "39") { // right
        keys["39"] = true;
    }
    else if(e.keyCode == "38") { // up
        game.spaceTime.ship.thrust();
    }
    else if(e.keyCode == "40") { // down
        keys["40"] = true;
        if(game.shield > 0) {
            game.shield -=  1;
        }
    }
    else if(e.keyCode == '13' && game.playing == false) {
        startGame();
    }
}

function checkKeyUp (e) {
    if(e.keyCode == "68") { // d
        keys["68"] = false;
    }
    else if (e.keyCode == "37") { // left
        keys["37"] = false;
    }
    else if(e.keyCode == "39") { // right
        keys["39"] = false;
    }
    else if(e.keyCode == "38") { // up
        keys["58"] = false;
    }
    else if(e.keyCode == "40") { //down
        keys["40"] = false;
        game.spaceTime.shields = [];
    }

    game.spaceTime.ship.flame = false;
}

function renderWelcomeScreen () {
    $('#game').toggle();
    $('#game-window').append('<div id="start-screen"><h2>Welcome to Asteroids!</h2><br><p>For best experience, please maximize browser width</p><br><br><h4>Press Enter to start</h4></div>');
};

function startGame () {
    var firstGame = game.lives > 0;
    if (firstGame) {
        $('#start-screen').remove();
    } else { // Game already played
        resetGame();
    }

    game.playing = true;
    $('#game').toggle();
    listen();
};

function resetGame () {
    $('#level').remove();
    $('#lives').remove();
    $('#score').remove();
    $('#shield').remove();
    $('#game-over').remove();
    game = new Game(canvas, context);
};