module.exports = Game;
const $       = require('jquery');

function Game () {
    this.score = 0;
    this.initializeScore();

    return this;
};

Game.prototype.initializeScore = function () {
    var currentScore = "<div class='score'>Score: " + this.score + "</div>";
    $('#score-card').append(currentScore);

    return this;
};

Game.prototype.scorePoints = function () {
    this.score += 500;
    return this;
};

Game.prototype.updateScore = function () {
    var updatedScore = "<div class='score'>Score: " + this.score + "</div>";
    $('#score-card').replaceWith(updatedScore);

    return this;
};