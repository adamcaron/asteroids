module.exports = ST;
var Ship       = require('./ship.js')
var Asteroid   = require('./asteroid.js')
var Laser      = require('./laser.js')
var Shield = require('./shield.js')
var Mine = require('./mine.js')



function ST (canvas, context, game) {
    this.canvas    = canvas;
    this.context   = context;
    this.ship      = new Ship(this.canvas.width/2, this.canvas.height/2, 10, 10, context, this);
    this.asteroids = [];
    this.lasers    = [];
    this.shields   = [];
    this.mines     = [];
    this.initialAsteroids();
    this.game      = game;
};

ST.prototype.drawAll = function () {
    this.detectShipCollision();
    this.detectSides();
    this.ship.moveShip(this.ship.angle,this.ship.velocity).draw();
    this.drawAsteroids();
    this.drawLasers();
    this.drawMines();
    this.drawShield(this.ship);
    this.game.updateScore();
    this.game.updateLives();
};

ST.prototype.initialAsteroids = function () {
    this.asteroids.push(new Asteroid(140, 40, 20, 20, this.context));
    this.asteroids.push(new Asteroid(220, 180, 15, 35, this.context));
    this.asteroids.push(new Asteroid(20, 250, 40, 14, this.context));
    this.asteroids.push(new Asteroid(120, 203, 22, 55, this.context));
    this.asteroids.push(new Asteroid(75, 135, 30, 15, this.context));
    this.asteroids.push(new Asteroid(220, 180, 12, 34, this.context));
    this.asteroids.push(new Asteroid(62, 62, 15, 35, this.context));
    this.asteroids.push(new Asteroid(210, 129, 35, 15, this.context));
};

ST.prototype.drawAsteroids = function () {
  this.asteroids.forEach(function (asteroid) {
      asteroid.move().draw();
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

ST.prototype.drawMines = function () {
    var spaceTime = this;
    if (this.mines.length > 0) {
        this.mines.forEach(function (mine) {
            mine.draw();
            spaceTime.detectLaserCollision(mine);
        })
    }
};

ST.prototype.drawShield = function (ship) {
    var spaceTime = this;
    if (this.shields.length > 0) {
        this.shields.forEach(function (shield) {
            shield.draw(ship);
            spaceTime.detectShieldCollision(shield);
        })
    }
};

ST.prototype.fireLaser = function () {
    this.lasers.push(new Laser(this.ship, this.context));
};

ST.prototype.activeShield = function () {
    this.shields.push(new Shield(this.ship, this.context));
};

ST.prototype.layMine = function () {
    this.mines.push(new Mine(this.ship, this.context));
};

ST.prototype.detectLaserCollision = function (laser) {
    var spaceTime = this;
    this.asteroids.forEach( function (asteroid) {
        if (asteroidCollidesWith(laser, asteroid)) {
            spaceTime.asteroids = spaceTime.asteroids.filter(function (a) {
                return a !== asteroid;
            });
            spaceTime.lasers = spaceTime.lasers.filter(function (l) {
                return l !== laser;
            });
            spaceTime.game.scorePoints(asteroid);
        }
    });
};


ST.prototype.detectShieldCollision = function (shield) {
    var spaceTime = this;
    this.asteroids.forEach( function (asteroid) {
        if (shieldCollidesWith(shield, asteroid)) {
            spaceTime.asteroids = spaceTime.asteroids.filter(function (a) {
                return a !== asteroid;
            });
            spaceTime.shields = spaceTime.shields.filter(function (s) {
                return s !== shield;
            });
            spaceTime.game.scorePoints(asteroid);
        }
    });
};

ST.prototype.detectShipCollision = function () {
    var ship = this.ship;
    var spaceTime = this;

    this.asteroids.forEach( function (asteroid) {
        if (asteroidCollidesWith(ship, asteroid)) {
            spaceTime.asteroids = spaceTime.asteroids.filter(function (a) {
                return a !== asteroid;
            });
            ship.x = spaceTime.canvas.width/2;
            ship.y = spaceTime.canvas.height/2;
            ship.velocity = 0;
            spaceTime.game.die();
        }
    });
};

ST.prototype.detectSides = function () {
    var spaceTime = this;
    var ship = this.ship;

    this.asteroids.forEach( function (asteroid) {
        if(asteroid.x > spaceTime.canvas.width) {
            asteroid.x -= spaceTime.canvas.width;
        }
        else if(asteroid.x < 0) {
            asteroid.x += spaceTime.canvas.width;
        }
        else if(asteroid.y > spaceTime.canvas.height) {
            asteroid.y -= spaceTime.canvas.height;
        }
        else if(asteroid.y < 0) {
            asteroid.y += spaceTime.canvas.height;
        }
    });

    if(ship.x + ship.width > this.canvas.width) {
        ship.x -= this.canvas.width;
    }
    else if(ship.x - ship.width < 0) {
        ship.x += this.canvas.width;
    }
    else if(ship.y > this.canvas.height) {
        ship.y -= this.canvas.height;
    }
    else if(ship.y < 0) {
        ship.y += this.canvas.height;
    }
};

function asteroidCollidesWith (object, asteroid) {
    if(object.y <= asteroid.y + asteroid.height && object.y >= asteroid.y) {
        if(object.x <= asteroid.x + asteroid.width && object.x >= asteroid.x){
            return true
        }
    }
}

function shieldCollidesWith (object, asteroid) {
    var distX = Math.abs(object.x - (asteroid.x + asteroid.width/2));
    var distY = Math.abs(object.y - (asteroid.y + asteroid.height/2));

    if (distX > (asteroid.width/2 + object.radius)) { return false; }
    if (distY > (asteroid.height/2 + object.radius)) { return false; }

    if (distX <= (asteroid.width/2)) { return true; }
    if (distY <= (asteroid.height/2)) { return true; }
}