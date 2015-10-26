module.exports = Game;
const $        = require('jquery');
var SpaceTime  = require('./spacetime.js');

function Game (canvas, context) {
    this.score = 0;
    this.lives = 3;
    this.level = 1;
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

Game.prototype.scorePoints = function (asteroid) {
    var asteroidScore = asteroid.width + asteroid.height;
    this.score += asteroidScore;

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
    // if lives === 0, end the game.

    var updatedLives = "<div id='lives'>Lives Left: " + this.lives + "</div>";
    $('#lives').replaceWith(updatedLives);

    return this;
};

Game.prototype.updateLevel = function () {
    // increase the game level
    this.level = this.level + 1;
    var updatedLevel = "<div id='level'>Level: " + this.level + "</div>";
    $('#dashboard').append(updatedLevel);
    // draw new asteroids
    this.spaceTime.initialAsteroids();
}