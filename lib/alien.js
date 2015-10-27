module.exports = Alien;
var AlienLaser = require('./alienLaser.js')

function Alien(x,y,context, spaceTime) {
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
    this.context.arc(this.x, this.y + this.radius/2, this.radius/2, 0, Math.PI, true);
    this.context.closePath();
    this.context.fill();

    return this;
};

Alien.prototype.move = function () {

    this.x += this.velocity;

    return this;
};

Alien.prototype.shoot = function () {
    this.spaceTime.alienLasers.push(new AlienLaser(this, this.spaceTime.ship,this.context));

    return this;
};