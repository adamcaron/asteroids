module.exports = Ship;

function Ship(x,y,width,height,canvas,context, spaceTime) {
    this.spaceTime = spaceTime;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.context = context;
    this.laserX = this.x;

    this.laserY = this.y - height;

    return this;
}

Ship.prototype.resetLaser = function () {
    this.laserX = this.x;
    this.laserY = this.y - this.height;
};

Ship.prototype.draw = function () {
    this.context.fillStyle = '#f00';
    this.context.beginPath();
    this.context.moveTo(this.x, this.y - this.height);
    this.context.lineTo(this.x + this.width/2, this.y);
    this.context.lineTo(this.x - this.width/2, this.y);
    this.context.moveTo(this.x, this.y - this.height);
    this.context.closePath();
    this.context.fill();
    this.resetLaser();

    return this;
};

Ship.prototype.shoot = function () {
    if (this.laserY > 0 && this.laserY < this.canvas.height) {
        this.context.strokeStyle = '#ff0000';
        this.context.moveTo(this.laserX, this.laserY);
        this.laserY -= 5;
        this.context.lineTo(this.x, this.laserY);
        this.context.stroke();
    } else {
        this.spaceTime.drawAll();
    }
};