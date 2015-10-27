module.exports = Laser;

function Laser (ship,context) {
    this.ship = ship;
    this.x = ship.x;
    this.y = ship.y;
    this.angle = ship.angle;
    this.laserSpeed = 15;
    this.context = context;

    return this;
}

Laser.prototype.setLaserTrajectory = function () {

    this.x += this.laserSpeed*Math.sin(this.angle);
    this.y += this.laserSpeed*-Math.cos(this.angle);

    return this;
};

Laser.prototype.draw = function () {
    this.context.fillStyle = "#f00";
    this.context.beginPath();
    this.context.arc(this.x, this.y, 2.5, 0, Math.PI*2, true);
    this.context.closePath();
    this.context.fill();

    this.setLaserTrajectory();

    return this;
};