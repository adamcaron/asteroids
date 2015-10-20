var Ship = require('./ship.js');
var Asteroid = require('./asteroid.js');

window.addEventListener("keydown", checkKeyPressed, false);

var canvas  = document.getElementById('game');
var context = canvas.getContext('2d');
var spaceTime = new SpaceTime(canvas, context);

function SpaceTime (canvas, context) {
    this.ship      = new Ship(150, 150, 10, 10, canvas, context, this);
    this.asteroids  = [];

    return this;
}

SpaceTime.prototype.initialAsteroids = function () {
    this.asteroids.push(new Asteroid(140, 40, 20, 20, context));
    this.asteroids.push(new Asteroid(220, 180, 12, 34, context));
    this.asteroids.push(new Asteroid(20, 250, 40, 14, context));
}

SpaceTime.prototype.drawAll = function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.ship.draw();
    this.asteroids.forEach( function (asteroid) {
        asteroid.draw();
    });
}
spaceTime.initialAsteroids();
spaceTime.drawAll();

SpaceTime.prototype.fireLaser = function () {
    var ship = this.ship;

    this.asteroids.forEach( function(asteroid) {
        requestAnimationFrame(function shootLaser() {
            ship.shoot();
            if(ship.laserY <= asteroid.y + asteroid.height && ship.laserY >= asteroid.y) {
                if(ship.laserX <= asteroid.x + asteroid.width && ship.laserX >= asteroid.x){
                    spaceTime.asteroids = spaceTime.asteroids.filter( function(a) {
                        return a !== asteroid;
                    });
                    spaceTime.drawAll();
                }
            }
            else {
                requestAnimationFrame(shootLaser);
            }
        });
    });
}

SpaceTime.prototype.moveShipLeft = function () {
    var ship = this.ship;
    requestAnimationFrame(function rotate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        ship.x -= 5;
        ship.laserX -= 5;
        spaceTime.drawAll();
    });
}

SpaceTime.prototype.moveShipRight = function () {
    var ship = this.ship;
    requestAnimationFrame(function rotate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        ship.x += 5;
        ship.laserX += 5;
        spaceTime.drawAll();
    });
}

SpaceTime.prototype.moveShipUp = function () {
    var ship = this.ship;
    requestAnimationFrame(function rotate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        ship.y -= 5;
        ship.laserY -= 5;
        spaceTime.drawAll();
    });
}

SpaceTime.prototype.moveShipDown = function () {
    var ship = this.ship;
    requestAnimationFrame(function rotate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        ship.y += 5;
        ship.laserY += 5;
        spaceTime.drawAll();
    });
}

function checkKeyPressed (e) {
    if (e.keyCode == "32") { //spacebar
        spaceTime.fireLaser();
    }
    else if (e.keyCode == "37") { // left
        spaceTime.moveShipLeft();
    }
    else if(e.keyCode == "39") { // right
        spaceTime.moveShipRight();
    }
    else if(e.keyCode == "38") { // up
        spaceTime.moveShipUp();
    }
    else if(e.keyCode == "40") { // down
        spaceTime.moveShipDown();
    }
}

