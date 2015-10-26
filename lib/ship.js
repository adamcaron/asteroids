module.exports = Ship;

function Ship(x,y,width,height,context, spaceTime) {
    this.spaceTime = spaceTime;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.context = context;
    this.angle = 0;
    this.velocity = 0;
    this.color = "#f00"

    return this;
};

Ship.prototype.draw = function () {
    this.context.fillStyle = this.color;
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

Ship.prototype.moveShip = function () {
    var velocity = this.velocity;

    if(this.angle === 0) {
        this.y -= velocity;
    }
    else if(this.angle === 45) {
        this.y -= velocity;
        this.x += velocity;
    }
    else if(this.angle === 90) {
        this.x += velocity;
    }
    else if(this.angle === 135) {
        this.y += velocity;
        this.x += velocity;
    }
    else if(this.angle === 180) {
        this.y += velocity;
    }
    else if(this.angle === 225) {
        this.y += velocity;
        this.x -= velocity;
    }
    else if(this.angle === 270) {
        this.x -= velocity;
    }
    else if(this.angle === 315) {
        this.y -= velocity;
        this.x -= velocity;
    }

    return this;
};