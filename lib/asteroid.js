module.exports = Asteroid;

function Asteroid(x,y,width,height,context) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.context = context;
}

Asteroid.prototype.draw = function () {
  this.context.fillStyle = "#000";
  this.context.fillRect(this.x, this.y, this.width, this.height);

  return this;
};