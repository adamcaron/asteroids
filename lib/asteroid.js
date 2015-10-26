module.exports = Asteroid;

function Asteroid(context,canvas) {
    this.x = getRandom(0,canvas.width);
    this.y = getRandom(0,canvas.height);
    this.width = getRandom(20,45);
    this.height = getRandom(20,55);
    this.context = context;
    //this.vx = 0;
    //this.vy = 0;
    this.vx = getRandomVelocity(-2,2);
    this.vy = getRandomVelocity(-2,2);

}

Asteroid.prototype.draw = function () {
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.x + this.width/3, this.y + this.height/4);
    this.context.lineTo(this.x + 2*this.width/3, this.y - this.height/5);
    this.context.lineTo(this.x + 3*this.width/4, this.y + this.height/2);
    this.context.lineTo(this.x + this.width, this.y + this.height);
    this.context.lineTo(this.x + this.width/2, this.y + this.height/2);
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