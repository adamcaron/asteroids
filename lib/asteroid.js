module.exports = Asteroid;

function Asteroid(context,canvas) {
    this.x = getRandom(0,canvas.width);
    this.y = getRandom(0,canvas.height);
    this.width = getRandom(20,45);
    this.height = getRandom(20,55);
    this.context = context;
    this.vx = getRandomVelocity(-2,2);
    this.vy = getRandomVelocity(-2,2);

}

Asteroid.prototype.draw = function () {
    this.context.fillStyle = "#A9A9A9";
    this.context.fillRect(this.x, this.y, this.width, this.height);

    return this;
};

Asteroid.prototype.move = function () {
    this.x += this.vx;
    this.y += this.vy;

    return this;
};

function getRandomVelocity(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandom(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}