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
    asteroid.draw();
  })
};

ST.prototype.drawLasers = function () {
    var spaceTime = this;
    if (this.lasers.length > 0) {
        this.lasers.forEach(function (laser) {
            laser.draw();

            spaceTime.detectLaserColision(laser);
        })
    }
};

ST.prototype.fireLaser = function () {
    this.lasers.push(new Laser(this.ship, this.context));
};

ST.prototype.detectLaserColision = function (laser) {
    var spaceTime = this;
    var laser     = laser;
    this.asteroids.forEach( function (asteroid) {
        if (laserHitsAsteroid(laser, asteroid)) {
            spaceTime.asteroids = spaceTime.asteroids.filter(function (a) {
                return a !== asteroid;
            });
            spaceTime.lasers = spaceTime.lasers.filter(function (l) {
                return l !== laser;
            })
        }
    });
}

function laserHitsAsteroid (laser, asteroid) {
    if(laser.y <= asteroid.y + asteroid.height && laser.y >= asteroid.y) {
        if(laser.x <= asteroid.x + asteroid.width && laser.x >= asteroid.x){
            return true
        }
    }
}