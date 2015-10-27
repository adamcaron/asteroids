module.exports = Game;
const $        = require('jquery');
var SpaceTime  = require('./spacetime.js');

function Game (canvas, context) {
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.asteroidQuantity = 5;
    this.asteroidVelocity = .75;
    this.alienQuantity = 2;
    this.initializeScore();
    this.initializeLives();
    this.initializeLevel();
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
}

Game.prototype.scorePoints = function (object) {
    if(object.height) {
        this.score += object.width + object.height;
    }
    else if (object.radius) {
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

Game.prototype.levelUp = function () {
    this.asteroidQuantity += 2;
    this.asteroidVelocity += .25;
    this.alienQuantity += 1;

    // Increase the game level
    this.level = this.level + 1;
    var updatedLevel = "<div id='level'>Level: " + this.level + "</div>";
    $('#level').replaceWith(updatedLevel);

    // Draw new asteroids & aliens
    this.spaceTime.initialAsteroids(this.asteroidQuantity);
    this.spaceTime.initialAliens(this.alienQuantity);

    return this;
};