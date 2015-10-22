module.exports = Ship;

function Ship(context, spaceTime) {
  this.context = context
  this.ST      = spaceTime
  this.x       = 150;
  this.y       = 150;
  this.width   = 10;
  this.height  = 10

  return this;
};

Ship.prototype.draw = function () {
  this.context.fillStyle = '#f00';
  this.context.save();
  this.context.beginPath();
  this.context.translate(this.x, this.y - this.height/3);
  this.context.rotate(this.angle*Math.PI/180);
  this.context.moveTo(0,-this.height);
  this.context.lineTo(this.width / 2, 0);
  this.context.lineTo(-this.width / 2,0);
  this.context.moveTo(0,-this.height);
  this.context.closePath();
  this.context.fill();
  this.context.restore();

  return this;
};