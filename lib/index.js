var Ship = require('./ship.js');
var Asteroid = require('./asteroid.js');

// link canvas with html elemend
var canvas = document.getElementById('game');
// set context of canvas
var context = canvas.getContext('2d');
window.addEventListener("keydown", checkSpacePressed, false);
window.addEventListener("keydown", checkArrowPressed, false);

var ship = new Ship(150, 150, 10, 10, canvas, context);

var asteroids = [];
asteroids.push(new Asteroid(140, 40, 20, 20, context));
asteroids.push(new Asteroid(220, 180, 12, 34, context));
asteroids.push(new Asteroid(20, 250, 40, 14, context));


// render a map, a ship, and some asteroids
function drawAll () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    ship.draw();
    asteroids.forEach( function (asteroid) {
        asteroid.draw();
    });
}

drawAll();

function checkSpacePressed(e) {
    if (e.keyCode == "32") { //spacebar
        asteroids.forEach( function(asteroid) {
            requestAnimationFrame(function shootLaser() {
                ship.shoot();

                if(ship.laserY <= asteroid.y + asteroid.height && ship.laserY >= asteroid.y) {
                    if(ship.laserX <= asteroid.x + asteroid.width && ship.laserX >= asteroid.x){
                        asteroids = asteroids.filter( function(a) {
                            return a !== asteroid;
                        });
                        drawAll();
                    }
                }
                else {
                    requestAnimationFrame(shootLaser);
                }
            });
        });
    }
}

function checkArrowPressed(e) {
    if (e.keyCode == "37") { // left
        requestAnimationFrame(function rotate() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            ship.x -= 5;
            ship.laserX -= 5;
            drawAll();
        });
    }
    else if(e.keyCode == "39") { // right
        requestAnimationFrame(function rotate() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            ship.x += 5;
            ship.laserX += 5;
            drawAll();
        });
    }
    else if(e.keyCode == "38") { // up
        requestAnimationFrame(function rotate() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            ship.y -= 5;
            ship.laserY -= 5;
            drawAll();
        });
    }
    else if(e.keyCode == "40") { // down
        requestAnimationFrame(function rotate() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            ship.y += 5;
            ship.laserY += 5;
            drawAll();
        });
    }
}
