module.exports = Laser;

function Laser (ship,context) {
    this.ship = ship;
    this.shipheight = this.ship.height/3;
    this.x = ship.x;
    this.y = ship.y;
    this.angle = ship.angle;
    this.laserSpeed = 10;
    this.context = context;

    return this;
}

Laser.prototype.setLaserTrajectory = function () {

    if(this.angle === 0) {
        this.y -= this.laserSpeed;
    }
    else if(this.angle === 15) {
        this.y -= this.laserSpeed * .966;
        this.x += this.laserSpeed * .259;
    }
    else if(this.angle === 30) {
        this.y -= this.laserSpeed * .866;
        this.x += this.laserSpeed * .5;
    }
    else if(this.angle === 45) {
        this.y -= this.laserSpeed * .707;
        this.x += this.laserSpeed * .707;
    }
    else if(this.angle === 60) {
        this.y -= this.laserSpeed * .5;
        this.x += this.laserSpeed * .866;
    }
    else if(this.angle === 75) {
        this.y -= this.laserSpeed * .259;
        this.x += this.laserSpeed * .966;
    }
    else if(this.angle === 90) {
        this.x += this.laserSpeed;
    }
    else if(this.angle === 105) {
        this.y += this.laserSpeed * .259;
        this.x += this.laserSpeed * .966;
    }
    else if(this.angle === 120) {
        this.y += this.laserSpeed * .5;
        this.x += this.laserSpeed * .866;
    }
    else if(this.angle === 135) {
        this.y += this.laserSpeed * .707;
        this.x += this.laserSpeed * .707;
    }
    else if(this.angle === 150) {
        this.y += this.laserSpeed * .866;
        this.x += this.laserSpeed * .5;
    }
    else if(this.angle === 165) {
        this.y += this.laserSpeed * .966;
        this.x += this.laserSpeed * .259;
    }
    else if(this.angle === 180) {
        this.y += this.laserSpeed;
    }
    else if(this.angle === 195) {
        this.y += this.laserSpeed * .966;
        this.x -= this.laserSpeed * .259;
    }
    else if(this.angle === 210) {
        this.y += this.laserSpeed * .866;
        this.x -= this.laserSpeed * .5;
    }
    else if(this.angle === 225) {
        this.y += this.laserSpeed * .707;
        this.x -= this.laserSpeed * .707;
    }
    else if(this.angle === 240) {
        this.y += this.laserSpeed * .5;
        this.x -= this.laserSpeed * .866;
    }
    else if(this.angle === 255) {
        this.y += this.laserSpeed * .259;
        this.x -= this.laserSpeed * .966;
    }
    else if(this.angle === 270) {
        this.x -= this.laserSpeed;
    }
    else if(this.angle === 285) {
        this.y -= this.laserSpeed * .259;
        this.x -= this.laserSpeed * .966;
    }
    else if(this.angle === 300) {
        this.y -= this.laserSpeed * .5;
        this.x -= this.laserSpeed * .866;
    }
    else if(this.angle === 315) {
        this.y -= this.laserSpeed * .707;
        this.x -= this.laserSpeed * .707;
    }
    else if(this.angle === 330) {
        this.y -= this.laserSpeed * .866;
        this.x -= this.laserSpeed * .5;
    }
    else if(this.angle === 345) {
        this.y -= this.laserSpeed * .966;
        this.x -= this.laserSpeed * .259;
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