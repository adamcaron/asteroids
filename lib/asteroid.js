module.exports = Asteroid;

function Asteroid (context, spaceTime, blueprint) {
  this.context = context;
  this.ST      = spaceTime;
  this.x       = blueprint[0];
  this.y       = blueprint[1];
  this.width   = blueprint[2];
  this.height  = blueprint[3];

  return this;
};

Asteroid.prototype.draw = function () {
  this.context.fillStyle = "#000";
  this.context.fillRect(this.x, this.y, this.width, this.height);

  return this;
};