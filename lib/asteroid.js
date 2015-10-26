module.exports = Asteroid;

function Asteroid(x,y,width,height,context) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.context = context;
}

Asteroid.prototype.draw = function () {
  this.context.fillStyle = "#fff";
  this.context.fillRect(this.x, this.y, this.width, this.height);

  return this;
};

Asteroid.prototype.move = function (vx,vy) {
    this.x += vx;
    this.y += vy;

    return this;
};