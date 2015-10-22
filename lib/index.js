var Ship = require('./ship.js');
var Asteroid = require('./asteroid.js');
var Laser = require('./laser.js');

window.addEventListener("keydown", checkKeyPressed, false);

var canvas  = document.getElementById('game');
var context = canvas.getContext('2d');
var spaceTime = new SpaceTime(canvas, context);

function SpaceTime (canvas, context) {
    this.ship       = new Ship(150, 150, 10, 10, canvas, context, this);
    this.asteroids  = [];
    this.laser      = null;

    return this;
}

SpaceTime.prototype.initialAsteroids = function () {
    this.asteroids.push(new Asteroid(140, 40, 20, 20, context));
    this.asteroids.push(new Asteroid(220, 180, 12, 34, context));
    this.asteroids.push(new Asteroid(20, 250, 40, 14, context));
};

SpaceTime.prototype.drawAll = function () {
    this.ship.draw();
    this.asteroids.forEach( function (asteroid) {
        asteroid.draw();
    });
};

spaceTime.initialAsteroids();
spaceTime.drawAll(0);

SpaceTime.prototype.fireLaser = function () {
    this.laser = new Laser(this.ship, context);
    // this.lasers.push(laser);

    this.laser.draw();
    this.asteroids.forEach( function(asteroid) {
        requestAnimationFrame(function shootLaser() {
            var laser = spaceTime.laser;
            laser.moveLaser();
            if(laser.y <= asteroid.y + asteroid.height && laser.y >= asteroid.y) {
                if(laser.x <= asteroid.x + asteroid.width && laser.x >= asteroid.x){
                    spaceTime.asteroids = spaceTime.asteroids.filter( function(a) {
                        return a !== asteroid;
                    });
                    // spaceTime.lasers.pop
                    spaceTime.drawAll();
                }
            }
            else {
                requestAnimationFrame(shootLaser);
            }
        });
    });
};


function checkKeyPressed (e) {
    if (e.keyCode == "32") { //spacebar
        spaceTime.fireLaser();
    }
    else if (e.keyCode == "37") { // left
        spaceTime.ship.moveShip(-45,0);
        spaceTime.drawAll();
    }
    else if(e.keyCode == "39") { // right
        spaceTime.ship.moveShip(45,0);
        spaceTime.drawAll();
    }
    else if(e.keyCode == "38") { // up
        spaceTime.ship.moveShip(0,5);
        spaceTime.drawAll();
    }
    else if(e.keyCode == "40") { // down
        spaceTime.ship.moveShip(0,-5);
        spaceTime.drawAll();
    }
}



