module.exports = AlienLaser;

function AlienLaser (alien,ship,context) {
    this.x = alien.x;
    this.y = alien.y;
    this.alien = alien;
    this.ship = ship;
    this.laserSpeed = 7;
    this.context = context;

    return this;
}

AlienLaser.prototype.setLaserTrajectory = function () {
    if((this.alien.y - this.ship.y) > 0 ) {
        this.y -= this.laserSpeed;
    }
    else {
        this.y += this.laserSpeed;
    }

    return this;
};

AlienLaser.prototype.draw = function () {
    this.context.fillStyle = "#00FF00";
    this.context.beginPath();
    this.context.arc(this.x, this.y, 1, 0, Math.PI *.5, true);
    this.context.closePath();
    this.context.fill();

    this.setLaserTrajectory();

    return this;
};