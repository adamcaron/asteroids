module.exports = ST;
var Ship       = require('./ship.js')
var Asteroid   = require('./asteroid.js')
var Laser      = require('./laser.js')
var Shield = require('./shield.js')
var Mine = require('./mine.js')



function ST (canvas, context) {
    this.canvas    = canvas;
    this.context   = context;
    this.ship      = new Ship(150, 150, 10, 10, context, this);
    this.asteroids = [];
    this.lasers    = [];
    this.shields    = [];
    this.mines     = [];
    this.initialAsteroids();
};

ST.prototype.drawAll = function () {
    this.detectShipCollision();
    this.detectSides();
    this.ship.draw();
    this.drawAsteroids();
    this.drawLasers();
    this.drawMines();
    this.drawShield(this.ship);
};

ST.prototype.initialAsteroids = function () {
    this.asteroids.push(new Asteroid(140, 40, 20, 20, this.context));
    this.asteroids.push(new Asteroid(220, 180, 12, 34, this.context));
    this.asteroids.push(new Asteroid(20, 250, 40, 14, this.context));
    this.asteroids.push(new Asteroid(120, 203, 5, 55, this.context));
    this.asteroids.push(new Asteroid(75, 135, 30, 14, this.context));
    this.asteroids.push(new Asteroid(220, 180, 12, 34, this.context));
    this.asteroids.push(new Asteroid(62, 62, 5, 5, this.context));
    this.asteroids.push(new Asteroid(210, 129, 5, 5, this.context));

};

ST.prototype.drawAsteroids = function () {
  this.asteroids.forEach(function (asteroid) {
      var vx = getRandomVelocity(0,.5);
      var vy = getRandomVelocity(-2,2);
      asteroid.move(vx,vy).draw();
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
            })
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

ST.prototype.detectSides = function () {
    var ST = this;
    var ship = this.ship;

    this.asteroids.forEach( function (asteroid) {
        if(asteroid.x > ST.canvas.width) {
            asteroid.x -= ST.canvas.width;
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

function getRandomVelocity(min, max) {
    return Math.random() * (max - min) + min;
}