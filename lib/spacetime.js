module.exports = ST;
var Ship       = require('./ship.js')
var Asteroid   = require('./asteroid.js')
var Laser      = require('./laser.js')

function ST (canvas, context) {
    this.canvas    = canvas;
    this.context   = context;
    this.ship      = new Ship(150, 150, 10, 10, context, this);
    this.asteroids = [];
    this.lasers    = [];
    this.initialAsteroids();
};

ST.prototype.drawAll = function () {
    this.detectShipCollision();
    this.ship.draw();
    this.drawAsteroids();
    this.drawLasers();
};

ST.prototype.initialAsteroids = function () {
    this.asteroids.push(new Asteroid(140, 40, 20, 20, this.context));
    this.asteroids.push(new Asteroid(220, 180, 12, 34, this.context));
    this.asteroids.push(new Asteroid(20, 250, 40, 14, this.context));
};

ST.prototype.drawAsteroids = function () {
  this.asteroids.forEach(function (asteroid) {
    asteroid.move(.06,.11).draw();
  })
};

ST.prototype.drawLasers = function () {
    var spaceTime = this;
    if (this.lasers.length > 0) {
        this.lasers.forEach(function (laser) {
            laser.draw();
            spaceTime.detectLaserCollision(laser);
        })
    }
};

ST.prototype.fireLaser = function () {
    this.lasers.push(new Laser(this.ship, this.context));
};

ST.prototype.detectLaserCollision = function (laser) {
    var spaceTime = this;
    var laser     = laser;
    this.asteroids.forEach( function (asteroid) {
        if (asteroidCollidesWith(laser, asteroid)) {
            spaceTime.asteroids = spaceTime.asteroids.filter(function (a) {
                return a !== asteroid;
            });
            spaceTime.lasers = spaceTime.lasers.filter(function (l) {
                return l !== laser;
            })
        }
    });
};

ST.prototype.detectShipCollision = function () {
    var ship = this.ship;

    this.asteroids.forEach( function (asteroid) {
        if (asteroidCollidesWith(ship, asteroid)) {
            ship.x = 150;
            ship.y = 150;
        }
    });
};

function asteroidCollidesWith (object, asteroid) {
    if(object.y <= asteroid.y + asteroid.height && object.y >= asteroid.y) {
        if(object.x <= asteroid.x + asteroid.width && object.x >= asteroid.x){
            return true
        }
    }
}