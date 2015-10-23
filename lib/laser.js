module.exports = Laser;

function Laser (ship,context) {
    this.ship = ship;
    this.shipheight = this.ship.height/3;
    this.x = ship.x;
    this.y = ship.y;
    this.angle = ship.angle;
    this.laserSpeed = 10;
    this.laserLength = 1;
    this.context = context;

    return this;
}

Laser.prototype.setLaserTrajectory = function () {
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

    return this;
};

Laser.prototype.draw = function () {
    this.context.fillStyle = "#f00";
    this.context.beginPath();
    this.context.arc(this.x, this.y-this.shipheight, 1.5, 0, Math.PI*2, true);
    this.context.closePath();
    this.context.fill();

    this.setLaserTrajectory();

    return this;
};