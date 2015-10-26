module.exports = Asteroid;

function Asteroid(x,y,width,height,context) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.context = context;
    this.vx = getRandomVelocity(0,.5);
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