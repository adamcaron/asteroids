module.exports = Game;
const $       = require('jquery');

function Game () {
    this.score = 0;
    this.lives = 3;
    this.initializeScore();
    this.initializeLives();

    return this;
};

Game.prototype.initializeScore = function () {
    var currentScore = "<div class='score'>Score: " + this.score + "</div>";
    $('#score').append(currentScore);

    return this;
};

Game.prototype.initializeLives = function () {
    var currentLives = "<div class='lives'>Lifes Left: " + this.lives + "</div>";
    $('#lives').append(currentLives);

    return this;
};

Game.prototype.scorePoints = function () {
    this.score += 500;
    return this;
};

Game.prototype.die = function () {
    this.lives -= 1;
    return this;
};

Game.prototype.updateScore = function () {
    var updatedScore = "<div class='score'>Score: " + this.score + "</div>";
    $('.score').replaceWith(updatedScore);

    return this;
};

Game.prototype.updateLives = function () {
    var updatedLives = "<div class='lives'>Lifes Left: " + this.lives + "</div>";
    $('.lives').replaceWith(updatedLives);

    return this;
};