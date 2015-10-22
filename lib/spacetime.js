module.exports = ST;
var Ship       = require('./ship.js')
var Asteroid   = require('./asteroid.js')

function ST (canvas, context) {
  this.canvas    = canvas;
  this.context   = context;
  this.ship      = new Ship(context, this);
  this.asteroids = [];

  this.drawAll();
}

ST.prototype.drawAll = function () {
  this.ship.draw();
  this.drawAsteroids();
}

ST.prototype.drawAsteroids = function () {
  var context            = this.context;
  var spaceTime          = this;
  var asteroidBlueprints = [
      [140, 40, 20, 20],
      [220, 180, 12, 34],
      [20, 250, 40, 14]
    ]
  asteroidBlueprints.forEach(function (blueprint) {
    var asteroid = new Asteroid(context, spaceTime, blueprint).draw();
    spaceTime.asteroids.push(asteroid);
  })
}