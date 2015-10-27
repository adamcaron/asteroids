module.exports = AlienLaser;

function AlienLaser (alien,context) {
    this.alien = alien;
    this.x = alien.x;
    this.y = alien.y;
    this.angle = alien.angle;
    this.laserSpeed = 5;
    this.context = context;

    return this;
}

AlienLaser.prototype.setLaserTrajectory = function () {

    this.y += this.laserSpeed;

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