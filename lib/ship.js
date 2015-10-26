module.exports = Ship;

function Ship(x,y,width,height,context, spaceTime) {
    this.spaceTime = spaceTime;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.context = context;
    this.angle = 0;
    this.thrustAngle = 0;
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

    if(this.thrustAngle === 0) {
        this.y -= velocity;
    }
    else if(this.thrustAngle === 15) {
        this.y -= velocity * .966;
        this.x += velocity * .259;
    }
    else if(this.thrustAngle === 30) {
        this.y -= velocity * .866;
        this.x += velocity * .5;
    }
    else if(this.thrustAngle === 45) {
        this.y -= velocity * .707;
        this.x += velocity * .707;
    }
    else if(this.thrustAngle === 60) {
        this.y -= velocity * .5;
        this.x += velocity * .866;
    }
    else if(this.thrustAngle === 75) {
        this.y -= velocity * .259;
        this.x += velocity * .966;
    }
    else if(this.thrustAngle === 90) {
        this.x += velocity;
    }
    else if(this.thrustAngle === 105) {
        this.y += velocity * .259;
        this.x += velocity * .966;
    }
    else if(this.thrustAngle === 120) {
        this.y += velocity * .5;
        this.x += velocity * .866;
    }
    else if(this.thrustAngle === 135) {
        this.y += velocity * .707;
        this.x += velocity * .707;
    }
    else if(this.thrustAngle === 150) {
        this.y += velocity * .866;
        this.x += velocity * .5;
    }
    else if(this.thrustAngle === 165) {
        this.y += velocity * .966;
        this.x += velocity * .259;
    }
    else if(this.thrustAngle === 180) {
        this.y += velocity;
    }
    else if(this.thrustAngle === 195) {
        this.y += velocity * .966;
        this.x -= velocity * .259;
    }
    else if(this.thrustAngle === 210) {
        this.y += velocity * .866;
        this.x -= velocity * .5;
    }
    else if(this.thrustAngle === 225) {
        this.y += velocity * .707;
        this.x -= velocity * .707;
    }
    else if(this.thrustAngle === 240) {
        this.y += velocity * .5;
        this.x -= velocity * .866;
    }
    else if(this.thrustAngle === 255) {
        this.y += velocity * .259;
        this.x -= velocity * .966;
    }
    else if(this.thrustAngle === 270) {
        this.x -= velocity;
    }
    else if(this.thrustAngle === 285) {
        this.y -= velocity * .259;
        this.x -= velocity * .966;
    }
    else if(this.thrustAngle === 300) {
        this.y -= velocity * .5;
        this.x -= velocity * .866;
    }
    else if(this.thrustAngle === 315) {
        this.y -= velocity * .707;
        this.x -= velocity * .707;
    }
    else if(this.thrustAngle === 330) {
        this.y -= velocity * .866;
        this.x -= velocity * .5;
    }
    else if(this.thrustAngle === 345) {
        this.y -= velocity * .966;
        this.x -= velocity * .259;
    }

    return this;
};