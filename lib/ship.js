module.exports = Ship;

function Ship(x,y,width,height,canvas,context,spaceTime) {
    this.spaceTime = spaceTime;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.context = context;
    this.angle = 0;

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

Ship.prototype.updateAngle = function(deg) {
    this.angle += deg;
    this.angle %= 360;
    if(this.angle < 0) {
        this.angle += 360;
    }
    return this;
};

Ship.prototype.moveShip = function (deg,distance) {
    this.updateAngle(deg);

    if(this.angle === 0) {
        this.y -= distance;
        this.laserY -= distance;
    }
    else if(this.angle === 45) {
        this.y -= distance/2;
        this.laserY -= distance/2;
        this.x += distance/2;
        this.laserX += distance/2;
    }
    else if(this.angle === 90) {
        this.x += distance;
        this.laserX += distance;
    }
    else if(this.angle === 135) {
        this.y += distance/2;
        this.laserY += distance/2;
        this.x += distance/2;
        this.laserX += distance/2;
    }
    else if(this.angle === 180) {
        this.y += distance;
        this.laserY += distance;
    }
    else if(this.angle === 225) {
        this.y += distance/2;
        this.laserY += distance/2;
        this.x -= distance/2;
        this.laserX -= distance/2;
    }
    else if(this.angle === 270) {
        this.x -= distance;
        this.laserX -= distance;
    }
    else if(this.angle === 315) {
        this.y -= distance/2;
        this.laserY -= distance/2;
        this.x -= distance/2;
        this.laserX -= distance/2;
    }
};