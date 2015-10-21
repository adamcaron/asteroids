module.exports = Laser;

function Laser (ship,context) {
  this.x = ship.x;
  this.y = ship.y - ship.height;
  this.angle = ship.angle;
  this.laserSpeed = 5;
  this.context = context;

  return this;
}

Laser.prototype.moveLaser = function () {
  if(this.angle === 0) {
        this.y -= this.laserSpeed;
    }
    else if(this.angle === 45) {
        this.y -= this.laserSpeed;
        this.x += this.laserSpeed;
    }
    else if(this.angle === 90) {
        this.x += this.laserSpeed;
    }
    else if(this.angle === 135) {
        this.y += this.laserSpeed;
        this.x += this.laserSpeed;
    }
    else if(this.angle === 180) {
        this.y += this.laserSpeed;
    }
    else if(this.angle === 225) {
        this.y += this.laserSpeed;
        this.x -= this.laserSpeed;
    }
    else if(this.angle === 270) {
        this.x -= this.laserSpeed;
    }
    else if(this.angle === 315) {
        this.y -= this.laserSpeed;
        this.x -= this.laserSpeed;
    }
}

Laser.prototype.draw = function () {
  this.context.strokeStyle = '#f00';
  this.context.moveTo(this.x,this.y);
  this.moveLaser();
  this.context.lineTo(this.x, this.y);
  this.context.stroke();

  return this;
}