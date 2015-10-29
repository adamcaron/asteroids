module.exports = ST;
var Ship       = require('./ship.js');
var Asteroid   = require('./asteroid.js');
var Alien      = require('./alien.js');
var Laser      = require('./laser.js');
var Shield     = require('./shield.js');
var Mine       = require('./mine.js');

function ST (canvas, context, game) {
    this.canvas    = canvas;
    this.context   = context;
    this.game      = game;
    this.ship      = new Ship(this.canvas.width/2, this.canvas.height/2, 10, 10, context, this);
    this.asteroids = [];
    this.aliens    = [];
    this.lasers    = [];
    this.alienLasers  = [];
    this.shields   = [];
    this.mines     = [];
    this.initialAsteroids(game.asteroidQuantity);
    this.initialAliens(game.alienQuantity);
};

ST.prototype.drawAll = function () {
    this.detectSides();
    this.ship.moveShip().draw();
    this.drawAsteroids();
    this.drawAliens();
    this.detectShipCollision();
    this.drawLasers();
    this.drawAlienLasers();
    this.drawMines();
    this.drawShield(this.ship);
    this.game.updateScore();
    this.game.updateLives();
    this.game.updateShield();
};

ST.prototype.initialAsteroids = function (numberOfAsteroids) {
    for (var i = 0; i < numberOfAsteroids; i++) {
        this.asteroids.push(new Asteroid(getRandom(0,this.canvas.width),getRandom(0,this.canvas.height),getRandom(20,50),getRandom(20,50),this.context,this.game.asteroidVelocity));
    }
};

ST.prototype.initialAliens = function (numberOfAliens) {
    for (var i = 0; i < numberOfAliens; i++) {
        this.aliens.push(new Alien(getRandom(0,this.canvas.width/4),getRandom(10,this.canvas.height - 10),this.context,this));
    }
};

ST.prototype.drawAsteroids = function () {
    if (this.asteroids.length === 0) {
        this.game.levelUp();
    } else {
        this.asteroids.forEach(function (asteroid) {
            asteroid.move().draw();
        })
    }
};

ST.prototype.drawAliens = function () {
    this.aliens.forEach(function (alien) {
        if(Math.abs(alien.x - this.ship.x) < 5) {
            alien.move().draw().shoot();
        }
        else {
            alien.move().draw();
        }
        },this);
};

ST.prototype.drawLasers = function () {
    this.lasers.forEach(function (laser) {
        laser.draw(this);
        this.detectLaserCollision(laser);
    },this);
};

ST.prototype.drawAlienLasers = function () {
    this.alienLasers.forEach(function (laser) {
        laser.draw();
        this.detectAlienLaserCollision(laser);
    },this);
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
    this.game.score -= 5;
};

ST.prototype.activeShield = function () {
    this.shields.push(new Shield(this.ship, this.context));
};

ST.prototype.layMine = function () {
    this.mines.push(new Mine(this.ship, this.context));
};

ST.prototype.detectLaserCollision = function (laser) {
    this.asteroids.forEach( function (asteroid) {
        if (asteroidCollidesWith(laser, asteroid)) {
            asteroid.hit_count += 1;
            if(asteroid.hit_count === 3) {
                this.asteroids = this.asteroids.filter(function (a) {
                    return a !== asteroid;
                });
                if (asteroid.width > 30) {
                    this.asteroids.push(new Asteroid(asteroid.x, asteroid.y, asteroid.width / 2, asteroid.height / 2, this.context, this.game.asteroidVelocity));
                    this.asteroids.push(new Asteroid(asteroid.x + asteroid.width / 2, asteroid.y + asteroid.height / 2, asteroid.width / 2, asteroid.height / 2, this.context, this.game.asteroidVelocity));
                }
            }
            this.lasers = this.lasers.filter(function (l) {
                return l !== laser;
            });
            this.game.scorePoints(asteroid);
        }
    }, this);

    this.aliens.forEach( function (alien) {
        if (alienCollidesWith(laser, alien)) {
                this.aliens = this.aliens.filter(function (a) {
                    return a !== alien;
                });
            this.game.scorePoints(alien);
        }
    }, this);
};

ST.prototype.detectAlienLaserCollision = function (laser) {
    var spaceTime = this;
    var ship = this.ship;
        if (asteroidCollidesWith(laser, ship)) {
            spaceTime.alienLasers = [];
            ship.dead = true;
            spaceTime.game.die();
            setTimeout(function() {
                ship.dead = false;
                ship.x = spaceTime.canvas.width/2;
                ship.y = spaceTime.canvas.height/2;
                ship.velocity = 0;
            }, 300);
        }
};


ST.prototype.detectShieldCollision = function (shield) {
    this.asteroids.forEach( function (asteroid) {
        if (shieldCollidesWith(shield, asteroid)) {
            this.asteroids = this.asteroids.filter(function (a) {
                return a !== asteroid;
            });
            this.shields = this.shields.filter(function (s) {
                return s !== shield;
            });
            this.game.scorePoints(asteroid);
        }
    }, this);
};

ST.prototype.detectShipCollision = function () {
    var ship = this.ship;
    var spaceTime = this;

    this.asteroids.forEach( function (asteroid) {
        if (asteroidCollidesWith(ship, asteroid)) {
            spaceTime.asteroids = spaceTime.asteroids.filter(function (a) {
                return a !== asteroid;
            });
            spaceTime.ship.dead = true;
            spaceTime.game.die();
            setTimeout(function() {
                spaceTime.ship.dead = false;
                ship.x = spaceTime.canvas.width/2;
                ship.y = spaceTime.canvas.height/2;
                ship.velocity = 0;
            }, 300);
        }
    });
};

ST.prototype.detectSides = function () {
    this.asteroids.forEach( function (asteroid) {
        if(asteroid.x > this.canvas.width) {
            asteroid.x -= this.canvas.width;
        }
        else if(asteroid.x < 0) {
            asteroid.x += this.canvas.width;
        }
        else if(asteroid.y > this.canvas.height) {
            asteroid.y -= this.canvas.height;
        }
        else if(asteroid.y < 0) {
            asteroid.y += this.canvas.height;
        }
    }, this);

    var ship = this.ship;

    this.aliens.forEach( function (alien) {
        if(alien.x > this.canvas.width) {
            alien.x -= this.canvas.width;
        }
        else if(alien.x < 0) {
            alien.x += this.canvas.width;
        }
        else if(alien.y > this.canvas.height) {
            alien.y -= this.canvas.height;
        }
        else if(alien.y < 0) {
            alien.y += this.canvas.height;
        }
    }, this);

    this.lasers.forEach( function (laser) {
        if(laser.x > this.canvas.width) {
            this.lasers = this.lasers.filter(function (l) {
                return l !== laser;
            });
        }
        else if(laser.x < 0) {
            this.lasers = this.lasers.filter(function (l) {
                return l !== laser;
            });
        }
        else if(laser.y > this.canvas.height) {
            this.lasers = this.lasers.filter(function (l) {
                return l !== laser;
            });
        }
        else if(laser.y < 0) {
            this.lasers = this.lasers.filter(function (l) {
                return l !== laser;
            });
        }
    }, this);

    this.alienLasers.forEach( function (laser) {
        if(laser.x > this.canvas.width) {
            this.alienLasers = this.alienLasers.filter(function (l) {
                return l !== laser;
            });
        }
        else if(laser.x < 0) {
            this.alienLasers = this.alienLasers.filter(function (l) {
                return l !== laser;
            });
        }
        else if(laser.y > this.canvas.height) {
            this.alienLasers = this.alienLasers.filter(function (l) {
                return l !== laser;
            });
        }
        else if(laser.y < 0) {
            this.alienLasers = this.alienLasers.filter(function (l) {
                return l !== laser;
            });
        }
    }, this);

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

function alienCollidesWith (object, alien) {
    if(object.y <= alien.y + alien.radius && object.y >= alien.y) {
        if(object.x <= alien.x + alien.radius && object.x >= alien.x){
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

function getRandom(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}