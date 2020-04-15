/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var canvas = document.getElementById('game');
	var context = canvas.getContext('2d');
	var Game = __webpack_require__(1);

	var game = new Game(canvas, context);
	renderWelcomeScreen();

	function listen() {
	    requestAnimationFrame(function gameLoop() {
	        if (game.lives > 0) {
	            listenForInput();
	            context.clearRect(0, 0, canvas.width, canvas.height);
	            game.spaceTime.drawAll();

	            requestAnimationFrame(gameLoop);
	        } else {
	            game.gameOver();
	        }
	    });
	};

	window.addEventListener("keydown", checkKeyDown, false);
	window.addEventListener("keyup", checkKeyUp, false);

	var keys = {
	    "37": false, // left
	    "39": false, // right
	    "40": false // down
	};

	function listenForInput() {
	    if (keys["37"]) {
	        // left
	        game.spaceTime.ship.updateAngle(-4);
	    } else if (keys["39"]) {
	        // right
	        game.spaceTime.ship.updateAngle(4);
	    } else if (keys["40"]) {
	        // down
	        if (game.shield > 0) {
	            game.spaceTime.activeShield();
	        }
	    }
	    game.spaceTime.ship.moveShip();
	};

	function checkKeyDown(e) {

	    if (e.keyCode == "32") {
	        // spacebar
	        game.spaceTime.fireLaser();
	    } else if (e.keyCode == "68") {
	        // d
	        if (game.spaceTime.mines.length < 5) {
	            game.spaceTime.layMine();
	        }
	    } else if (e.keyCode == "37") {
	        // left
	        keys["37"] = true;
	    } else if (e.keyCode == "39") {
	        // right
	        keys["39"] = true;
	    } else if (e.keyCode == "38") {
	        // up
	        game.spaceTime.ship.thrust();
	    } else if (e.keyCode == "40") {
	        // down
	        keys["40"] = true;
	        if (game.shield > 0) {
	            game.shield -= 1;
	        }
	    } else if (e.keyCode == '13' && game.playing == false) {
	        startGame();
	    }
	}

	function checkKeyUp(e) {
	    if (e.keyCode == "68") {
	        // d
	        keys["68"] = false;
	    } else if (e.keyCode == "37") {
	        // left
	        keys["37"] = false;
	    } else if (e.keyCode == "39") {
	        // right
	        keys["39"] = false;
	    } else if (e.keyCode == "38") {
	        // up
	        keys["58"] = false;
	    } else if (e.keyCode == "40") {
	        //down
	        keys["40"] = false;
	        game.spaceTime.shields = [];
	    }

	    game.spaceTime.ship.flame = false;
	}

	function renderWelcomeScreen() {
	    $('#game').toggle();
	    $('#game-window').append('<div id="start-screen"><h2>Welcome to Asteroids!</h2><br><p>For best experience, please maximize browser width</p><br><br><h4>Press Enter to start</h4></div>');
	};

	function startGame() {
	    var firstGame = game.lives > 0;
	    if (firstGame) {
	        $('#start-screen').remove();
	    } else {
	        // Game already played
	        resetGame();
	    }

	    game.playing = true;
	    $('#game').toggle();
	    listen();
	};

	function resetGame() {
	    $('#level').remove();
	    $('#lives').remove();
	    $('#score').remove();
	    $('#shield').remove();
	    $('#game-over').remove();
	    game = new Game(canvas, context);
	};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = Game;
	var SpaceTime = __webpack_require__(2);

	function Game(canvas, context) {
	    this.canvas = canvas;
	    this.context = context;
	    this.score = 0;
	    this.lives = 3;
	    this.level = 1;
	    this.playing = false;
	    this.shield = 100;
	    this.asteroidQuantity = 5;
	    this.asteroidVelocity = .75;
	    this.alienQuantity = 2;
	    this.initializeScore();
	    this.initializeLives();
	    this.initializeLevel();
	    this.initializeShield();
	    this.spaceTime = new SpaceTime(canvas, context, this);

	    return this;
	};

	Game.prototype.initializeScore = function () {
	    var currentScore = "<div id='score'>Score: " + this.score + "</div>";
	    $('#dashboard').append(currentScore);

	    return this;
	};

	Game.prototype.initializeLives = function () {
	    var currentLives = "<div id='lives'>Lives Left: " + this.lives + "</div>";
	    $('#dashboard').append(currentLives);

	    return this;
	};

	Game.prototype.initializeLevel = function () {
	    var currentLevel = "<div id='level'>Level: " + this.level + "</div>";
	    $('#dashboard').append(currentLevel);
	};

	Game.prototype.initializeShield = function () {
	    var currentShield = "<div id='shield'>Shield Remaining: " + this.shield + "</div>";
	    $('#dashboard').append(currentShield);
	};

	Game.prototype.scorePoints = function (object) {
	    if (object.constructor.name == 'Asteroid') {
	        this.score += 200 - (object.width + object.height);
	    } else if (object.constructor.name == 'Alien') {
	        this.score += 500;
	    }

	    return this;
	};

	Game.prototype.die = function () {
	    this.lives -= 1;

	    return this;
	};

	Game.prototype.updateScore = function () {
	    var updatedScore = "<div id='score'>Score: " + this.score + "</div>";
	    $('#score').replaceWith(updatedScore);

	    return this;
	};

	Game.prototype.updateLives = function () {
	    var updatedLives = "<div id='lives'>Lives Left: " + this.lives + "</div>";
	    $('#lives').replaceWith(updatedLives);

	    return this;
	};

	Game.prototype.updateShield = function () {
	    if (this.shield > 50) {
	        var updatedShield = "<div id='shield' style='color:white;'>Shield remaining: " + this.shield + "</div>";
	    } else if (this.shield > 25) {
	        var updatedShield = "<div id='shield' style='color:orange;'>Shield remaining: " + this.shield + "</div>";
	    } else {
	        var updatedShield = "<div id='shield' style='color:red;'>Shield remaining: " + this.shield + "</div>";
	    }
	    $('#shield').replaceWith(updatedShield);

	    return this;
	};

	Game.prototype.levelUp = function () {
	    this.asteroidQuantity += 2;
	    this.asteroidVelocity += .25;
	    this.alienQuantity += 1;
	    this.shield = 100;
	    this.spaceTime.ship.x = this.spaceTime.canvas.width / 2;
	    this.spaceTime.ship.y = this.spaceTime.canvas.height / 2;

	    // Increase the game level
	    this.level = this.level + 1;
	    var updatedLevel = "<div id='level'>Level: " + this.level + "</div>";
	    $('#level').replaceWith(updatedLevel);

	    // Draw new asteroids & aliens
	    this.spaceTime.initialAsteroids(this.asteroidQuantity);
	    this.spaceTime.initialAliens(this.alienQuantity);

	    return this;
	};

	Game.prototype.gameOver = function () {
	    this.playing = false;
	    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	    $('#game').toggle();
	    $('#game-window').append('<div id="game-over"><p>GAME OVER<br>Score: ' + this.score + '<br>Level: ' + this.level + '<br><br>Press Enter to restart</p></div>');
	    //var newScore = "<div>Player: " + this.score + "</div>";
	    //$('#high-scores').append(newScore);
	};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = SpaceTime;
	var Ship = __webpack_require__(3);
	var Asteroid = __webpack_require__(4);
	var Alien = __webpack_require__(5);
	var Laser = __webpack_require__(7);
	var Shield = __webpack_require__(8);
	var Mine = __webpack_require__(9);

	function SpaceTime(canvas, context, game) {
	    this.canvas = canvas;
	    this.context = context;
	    this.game = game;
	    this.ship = new Ship(this.canvas.width / 2, this.canvas.height / 2, 10, 10, context, this);
	    this.asteroids = [];
	    this.aliens = [];
	    this.lasers = [];
	    this.alienLasers = [];
	    this.shields = [];
	    this.mines = [];
	    this.initialAsteroids(game.asteroidQuantity);
	    this.initialAliens(game.alienQuantity);
	};

	SpaceTime.prototype.drawAll = function () {
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

	SpaceTime.prototype.initialAsteroids = function (numberOfAsteroids) {
	    for (var i = 0; i < numberOfAsteroids; i++) {
	        this.asteroids.push(new Asteroid(getRandom(0, this.canvas.width), getRandom(0, this.canvas.height), getRandom(20, 50), getRandom(20, 50), this.context, this.game.asteroidVelocity));
	    }
	};

	SpaceTime.prototype.initialAliens = function (numberOfAliens) {
	    for (var i = 0; i < numberOfAliens; i++) {
	        this.aliens.push(new Alien(getRandom(0, this.canvas.width / 4), getRandom(10, this.canvas.height - 10), this.context, this));
	    }
	};

	SpaceTime.prototype.drawAsteroids = function () {
	    if (this.asteroids.length === 0) {
	        this.game.levelUp();
	    } else {
	        this.asteroids.forEach(function (asteroid) {
	            asteroid.move().draw();
	        });
	    }
	};

	SpaceTime.prototype.drawAliens = function () {
	    this.aliens.forEach(function (alien) {
	        if (Math.abs(alien.x - this.ship.x) < 5) {
	            alien.move().draw().shoot();
	        } else {
	            alien.move().draw();
	        }
	    }, this);
	};

	SpaceTime.prototype.drawLasers = function () {
	    this.lasers.forEach(function (laser) {
	        laser.draw(this);
	        this.detectLaserCollision(laser);
	    }, this);
	};

	SpaceTime.prototype.drawAlienLasers = function () {
	    this.alienLasers.forEach(function (laser) {
	        laser.draw();
	        this.detectAlienLaserCollision(laser);
	    }, this);
	};

	SpaceTime.prototype.drawMines = function () {
	    var spaceTime = this;
	    if (this.mines.length > 0) {
	        this.mines.forEach(function (mine) {
	            mine.draw();
	            spaceTime.detectLaserCollision(mine);
	        });
	    }
	};

	SpaceTime.prototype.drawShield = function (ship) {
	    var spaceTime = this;
	    if (this.shields.length > 0) {
	        this.shields.forEach(function (shield) {
	            shield.draw(ship);
	            spaceTime.detectShieldCollision(shield);
	        });
	    }
	};

	SpaceTime.prototype.fireLaser = function () {
	    this.lasers.push(new Laser(this.ship, this.context));
	    this.game.score -= 5;
	};

	SpaceTime.prototype.activeShield = function () {
	    this.shields.push(new Shield(this.ship, this.context));
	};

	SpaceTime.prototype.layMine = function () {
	    this.mines.push(new Mine(this.ship, this.context));
	};

	SpaceTime.prototype.detectLaserCollision = function (laser) {
	    this.asteroids.forEach(function (asteroid) {
	        if (asteroidCollidesWith(laser, asteroid)) {
	            asteroid.hit_count += 1;
	            if (asteroid.hit_count === 3) {
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

	    this.aliens.forEach(function (alien) {
	        if (alienCollidesWith(laser, alien)) {
	            this.aliens = this.aliens.filter(function (a) {
	                return a !== alien;
	            });
	            this.game.scorePoints(alien);
	        }
	    }, this);
	};

	SpaceTime.prototype.detectAlienLaserCollision = function (laser) {
	    var spaceTime = this;
	    var ship = this.ship;
	    if (asteroidCollidesWith(laser, ship)) {
	        spaceTime.alienLasers = [];
	        ship.dead = true;
	        spaceTime.game.die();
	        setTimeout(function () {
	            ship.dead = false;
	            ship.x = spaceTime.canvas.width / 2;
	            ship.y = spaceTime.canvas.height / 2;
	            ship.velocity = 0;
	        }, 300);
	    }
	};

	SpaceTime.prototype.detectShieldCollision = function (shield) {
	    this.asteroids.forEach(function (asteroid) {
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

	SpaceTime.prototype.detectShipCollision = function () {
	    var ship = this.ship;
	    var spaceTime = this;

	    this.asteroids.forEach(function (asteroid) {
	        if (asteroidCollidesWith(ship, asteroid)) {
	            spaceTime.asteroids = spaceTime.asteroids.filter(function (a) {
	                return a !== asteroid;
	            });
	            spaceTime.ship.dead = true;
	            spaceTime.game.die();
	            setTimeout(function () {
	                spaceTime.ship.dead = false;
	                ship.x = spaceTime.canvas.width / 2;
	                ship.y = spaceTime.canvas.height / 2;
	                ship.velocity = 0;
	            }, 300);
	        }
	    });
	};

	SpaceTime.prototype.detectSides = function () {
	    this.asteroids.forEach(function (asteroid) {
	        if (asteroid.x > this.canvas.width) {
	            asteroid.x -= this.canvas.width;
	        } else if (asteroid.x < 0) {
	            asteroid.x += this.canvas.width;
	        } else if (asteroid.y > this.canvas.height) {
	            asteroid.y -= this.canvas.height;
	        } else if (asteroid.y < 0) {
	            asteroid.y += this.canvas.height;
	        }
	    }, this);

	    var ship = this.ship;

	    this.aliens.forEach(function (alien) {
	        if (alien.x > this.canvas.width) {
	            alien.x -= this.canvas.width;
	        } else if (alien.x < 0) {
	            alien.x += this.canvas.width;
	        } else if (alien.y > this.canvas.height) {
	            alien.y -= this.canvas.height;
	        } else if (alien.y < 0) {
	            alien.y += this.canvas.height;
	        }
	    }, this);

	    this.lasers.forEach(function (laser) {
	        if (laser.x > this.canvas.width) {
	            this.lasers = this.lasers.filter(function (l) {
	                return l !== laser;
	            });
	        } else if (laser.x < 0) {
	            this.lasers = this.lasers.filter(function (l) {
	                return l !== laser;
	            });
	        } else if (laser.y > this.canvas.height) {
	            this.lasers = this.lasers.filter(function (l) {
	                return l !== laser;
	            });
	        } else if (laser.y < 0) {
	            this.lasers = this.lasers.filter(function (l) {
	                return l !== laser;
	            });
	        }
	    }, this);

	    this.alienLasers.forEach(function (laser) {
	        if (laser.x > this.canvas.width) {
	            this.alienLasers = this.alienLasers.filter(function (l) {
	                return l !== laser;
	            });
	        } else if (laser.x < 0) {
	            this.alienLasers = this.alienLasers.filter(function (l) {
	                return l !== laser;
	            });
	        } else if (laser.y > this.canvas.height) {
	            this.alienLasers = this.alienLasers.filter(function (l) {
	                return l !== laser;
	            });
	        } else if (laser.y < 0) {
	            this.alienLasers = this.alienLasers.filter(function (l) {
	                return l !== laser;
	            });
	        }
	    }, this);

	    if (ship.x + ship.width > this.canvas.width) {
	        ship.x -= this.canvas.width;
	    } else if (ship.x - ship.width < 0) {
	        ship.x += this.canvas.width;
	    } else if (ship.y > this.canvas.height) {
	        ship.y -= this.canvas.height;
	    } else if (ship.y < 0) {
	        ship.y += this.canvas.height;
	    }
	};

	function asteroidCollidesWith(object, asteroid) {
	    if (object.y <= asteroid.y + asteroid.height && object.y >= asteroid.y) {
	        if (object.x <= asteroid.x + asteroid.width && object.x >= asteroid.x) {
	            return true;
	        }
	    }
	}

	function alienCollidesWith(object, alien) {
	    if (object.y <= alien.y + alien.radius && object.y >= alien.y) {
	        if (object.x <= alien.x + alien.radius && object.x >= alien.x) {
	            return true;
	        }
	    }
	}

	function shieldCollidesWith(object, asteroid) {
	    var distX = Math.abs(object.x - (asteroid.x + asteroid.width / 2));
	    var distY = Math.abs(object.y - (asteroid.y + asteroid.height / 2));

	    if (distX > asteroid.width / 2 + object.radius) {
	        return false;
	    }
	    if (distY > asteroid.height / 2 + object.radius) {
	        return false;
	    }

	    if (distX <= asteroid.width / 2) {
	        return true;
	    }
	    if (distY <= asteroid.height / 2) {
	        return true;
	    }
	}

	function getRandom(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = Ship;

	function Ship(x, y, width, height, context, spaceTime) {
	    this.spaceTime = spaceTime;
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.context = context;
	    this.angle = 0;
	    this.thrustAngle = 0;
	    this.velocity = 0;
	    this.color = "#006400";
	    this.flame = false;
	    this.dead = false;

	    return this;
	};

	Ship.prototype.draw = function () {
	    this.context.fillStyle = this.color;
	    this.context.save();
	    this.context.beginPath();
	    this.context.translate(this.x, this.y);
	    this.context.rotate(this.angle);
	    this.context.moveTo(0, -this.height);
	    this.context.lineTo(this.width / 2, 0);
	    this.context.lineTo(-this.width / 2, 0);
	    this.context.moveTo(0, -this.height);
	    this.context.moveTo(0, -this.height - 2);
	    this.context.lineTo(this.width / 2, -this.height + 5);
	    this.context.lineTo(-this.width / 2, -this.height + 5);
	    this.context.moveTo(0, -this.height - 5);
	    this.context.closePath();
	    this.context.fill();
	    this.context.restore();

	    if (this.flame) {
	        this.context.fillStyle = '#f00';
	        this.context.save();
	        this.context.beginPath();
	        this.context.translate(this.x, this.y);
	        this.context.rotate(this.angle);
	        this.context.moveTo(0, this.height / 2);
	        this.context.lineTo(this.width / 2, 0);
	        this.context.lineTo(-this.width / 2, 0);
	        this.context.moveTo(0, -this.height);
	        this.context.closePath();
	        this.context.fill();
	        this.context.restore();
	    }

	    if (this.dead) {
	        this.context.fillStyle = "#f00";
	        this.context.beginPath();
	        this.context.arc(this.x, this.y, 25, 0, Math.PI * 2, true);
	        this.context.closePath();
	        this.context.fill();
	    }

	    return this;
	};

	Ship.prototype.updateAngle = function (deg) {

	    this.angle += deg * (Math.PI / 180);
	    this.angle %= 2 * Math.PI;
	    return this;
	};

	Ship.prototype.moveShip = function () {

	    this.x += this.velocity * Math.sin(this.thrustAngle);
	    this.y += this.velocity * -Math.cos(this.thrustAngle);

	    return this;
	};

	Ship.prototype.thrust = function () {
	    var spaceTime = this.spaceTime;

	    if (spaceTime.ship.velocity <= 0) {
	        spaceTime.ship.thrustAngle = spaceTime.ship.angle;
	        spaceTime.ship.velocity += .2;
	    } else if (spaceTime.ship.thrustAngle !== spaceTime.ship.angle) {
	        if (spaceTime.ship.velocity > 0) {
	            spaceTime.ship.velocity -= .3;
	        } else {
	            spaceTime.ship.velocity = 0;
	        }
	    } else if (spaceTime.ship.thrustAngle === spaceTime.ship.angle) {
	        if (spaceTime.ship.velocity < 2) {
	            spaceTime.ship.velocity += .2;
	        }
	    }

	    spaceTime.ship.moveShip();
	    spaceTime.ship.flame = true;
	};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = Asteroid;

	function Asteroid(x, y, width, height, context, maxVel) {
	    this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.context = context;
	    this.maxVel = maxVel;
	    this.vx = getRandomVelocity(-this.maxVel, this.maxVel);
	    this.vy = getRandomVelocity(-this.maxVel, this.maxVel);
	    this.hit_count = 0;
	    this.color = {
	        strong: "#C9C9C9",
	        damaged: "#A9A9A9",
	        critical: "#595959"
	    };
	};

	Asteroid.prototype.draw = function () {
	    this.context.beginPath();
	    this.context.moveTo(this.x, this.y + 5);
	    this.context.lineTo(this.x + this.width * .6, this.y);
	    this.context.lineTo(this.x + this.width, this.y + this.height * .6);
	    this.context.lineTo(this.x + this.width * .9, this.y + this.height);
	    this.context.lineTo(this.x + this.width * .5, this.y + this.height * .9);
	    this.context.lineTo(this.x + this.width * .3, this.y + this.height + 2);
	    this.context.lineTo(this.x + this.width * .2, this.y + this.height * .8);
	    this.context.lineTo(this.x - 2, this.y + this.height * .8);
	    this.context.lineTo(this.x + 3, this.y + this.height * .4);
	    this.context.lineTo(this.x, this.y + 5);
	    this.context.closePath();
	    this.context.shadowBlur = 5;
	    this.context.shadowOffsetX = 2;
	    this.context.shadowColor = "#2b2b2b";
	    this.context.fillStyle = this.asteroidColor();
	    this.context.fill();

	    return this;
	};

	Asteroid.prototype.asteroidColor = function () {
	    // different color based on damage taken
	    if (this.hit_count === 0) {
	        return this.color.strong;
	    } else if (this.hit_count === 1) {
	        return this.color.damaged;
	    } else if (this.hit_count === 2) {
	        return this.color.critical;
	    }
	};

	Asteroid.prototype.move = function () {
	    this.x += this.vx;
	    this.y += this.vy;

	    return this;
	};

	function getRandomVelocity(min, max) {
	    return Math.random() * (max - min) + min;
	}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = Alien;
	var AlienLaser = __webpack_require__(6);

	function Alien(x, y, context, spaceTime) {
	    this.x = x;
	    this.y = y;
	    this.context = context;
	    this.spaceTime = spaceTime;
	    this.radius = 25;
	    this.velocity = 1.2;
	    this.color = "#FFFF00";

	    return this;
	};

	Alien.prototype.draw = function () {
	    this.context.fillStyle = this.color;
	    this.context.beginPath();
	    this.context.moveTo(this.x, this.y);
	    this.context.arc(this.x, this.y, this.radius, 0, Math.PI, true);
	    this.context.closePath();
	    this.context.beginPath();
	    this.context.moveTo(this.x, this.y + 3);
	    this.context.arc(this.x, this.y + this.radius / 2, this.radius / 2, 0, Math.PI, true);
	    this.context.closePath();
	    this.context.fill();

	    return this;
	};

	Alien.prototype.move = function () {

	    this.x += this.velocity;

	    return this;
	};

	Alien.prototype.shoot = function () {
	    this.spaceTime.alienLasers.push(new AlienLaser(this, this.spaceTime.ship, this.context));

	    return this;
	};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = AlienLaser;

	function AlienLaser(alien, ship, context) {
	    this.x = alien.x;
	    this.y = alien.y;
	    this.alien = alien;
	    this.ship = ship;
	    this.laserSpeed = 7;
	    this.context = context;

	    return this;
	}

	AlienLaser.prototype.setLaserTrajectory = function () {
	    if (this.alien.y - this.ship.y > 0) {
	        this.y -= this.laserSpeed;
	    } else {
	        this.y += this.laserSpeed;
	    }

	    return this;
	};

	AlienLaser.prototype.draw = function () {
	    this.context.fillStyle = "#00FF00";
	    this.context.beginPath();
	    this.context.arc(this.x, this.y, 1, 0, Math.PI * .5, true);
	    this.context.closePath();
	    this.context.fill();

	    this.setLaserTrajectory();

	    return this;
	};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = Laser;

	function Laser(ship, context) {
	    this.ship = ship;
	    this.x = ship.x;
	    this.y = ship.y;
	    this.radius = 2;
	    this.angle = ship.angle;
	    this.laserSpeed = 15;
	    this.context = context;

	    return this;
	}

	Laser.prototype.setLaserTrajectory = function (spaceTime) {

	    this.x += this.laserSpeed * Math.sin(this.angle);
	    this.y += this.laserSpeed * -Math.cos(this.angle);

	    return this;
	};

	Laser.prototype.draw = function (spaceTime) {
	    this.context.fillStyle = "#f00";
	    this.context.beginPath();
	    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
	    this.context.closePath();
	    this.context.fill();

	    this.setLaserTrajectory();

	    return this;
	};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = Shield;

	function Shield(ship, context) {
	    this.x = ship.x;
	    this.y = ship.y;
	    this.radius = 15;
	    this.context = context;
	    return this;
	}

	Shield.prototype.draw = function (ship) {
	    this.context.strokeStyle = '#00FF00';
	    this.context.beginPath();
	    this.context.arc(ship.x, ship.y, this.radius, 0, 2 * Math.PI);
	    this.context.stroke();

	    return this;
	};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = Mine;

	function Mine(ship, context) {
	    this.x = ship.x;
	    this.y = ship.y;
	    this.radius = 5;
	    this.context = context;
	    return this;
	}

	Mine.prototype.draw = function () {
	    this.context.strokeStyle = '#e55d2f';
	    this.context.beginPath();
	    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
	    this.context.stroke();
	    return this;
	};

/***/ })
/******/ ]);