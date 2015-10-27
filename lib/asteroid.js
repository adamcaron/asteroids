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
    this.color = {
      strong: "#C9C9C9",
      damaged: "#A9A9A9",
      critical: "#595959"
    }
};

Asteroid.prototype.draw = function () {
    this.context.beginPath();
    this.context.moveTo(this.x, this.y);
    this.context.lineTo(this.x + this.width, this.y);
    this.context.lineTo(this.x + this.width, this.y + this.height);
    this.context.lineTo(this.x, this.y + this.height);
    this.context.lineTo(this.x, this.y);

    this.context.closePath();
    this.context.fillStyle = this.asteroidColor();
    this.context.fill();

    return this;
};

Asteroid.prototype.asteroidColor = function () {
    // different color based on damage taken
    if (this.hit_count === 0) {
        return this.color.strong;
    }
    else if (this.hit_count === 1) {
        return this.color.damaged;
    }
    else if (this.hit_count === 2) {
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

function getRandom(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}