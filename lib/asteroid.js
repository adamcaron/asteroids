module.exports = Asteroid;

function Asteroid(x,y,width,height,context) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.context = context;
    this.vx = getRandomVelocity(-2,2);
    this.vy = getRandomVelocity(-2,2);
    this.hit_count = 0;
}

Asteroid.prototype.draw = function () {
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.x + this.width, this.y);
    this.context.lineTo(this.x + this.width, this.y + this.height);
    this.context.lineTo(this.x, this.y + this.height);
    this.context.lineTo(this.x, this.y);

    this.context.closePath();
    this.context.fillStyle = "#A9A9A9";
    this.context.fill();

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