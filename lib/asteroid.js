module.exports = Asteroid;

function Asteroid(x,y,width,height,context,maxVel) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.context = context;
    this.maxVel = maxVel
    this.vx = getRandomVelocity(-this.maxVel,this.maxVel);
    this.vy = getRandomVelocity(-this.maxVel,this.maxVel);
    this.hit_count = 0;
    this.color = {
      strong: "#C9C9C9",
      damaged: "#A9A9A9",
      critical: "#595959"
    }
};

Asteroid.prototype.draw = function () {
    this.context.beginPath();
    this.context.moveTo(this.x, this.y + 5);
    this.context.lineTo(this.x + this.width *.6, this.y);
    this.context.lineTo(this.x + this.width, this.y + this.height *.6);
    this.context.lineTo(this.x + this.width *.9, this.y + this.height);
    this.context.lineTo(this.x + this.width *.5, this.y + this.height *.9);
    this.context.lineTo(this.x + this.width *.3, this.y + this.height + 2);
    this.context.lineTo(this.x + this.width *.2, this.y + this.height *.8);
    this.context.lineTo(this.x - 2, this.y + this.height *.8);
    this.context.lineTo(this.x + 3, this.y + this.height *.4);
    this.context.lineTo(this.x, this.y + 5);
    this.context.closePath();
    this.context.shadowBlur=5;
    this.context.shadowOffsetX=2;
    this.context.shadowColor="#2b2b2b";
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
