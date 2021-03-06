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
    this.color = "#006400";
    this.flame = false;
    this.dead = false;

    return this;
};

Ship.prototype.draw = function () {
    this.context.fillStyle = this.color;
    this.context.save();
    this.context.beginPath();
    this.context.translate(this.x, this.y);
    this.context.rotate(this.angle);
    this.context.moveTo(0, -this.height);
    this.context.lineTo(this.width / 2, 0);
    this.context.lineTo(-this.width / 2, 0);
    this.context.moveTo(0, -this.height);
    this.context.moveTo(0, -this.height - 2);
    this.context.lineTo(this.width / 2, -this.height + 5);
    this.context.lineTo(-this.width / 2, -this.height + 5);
    this.context.moveTo(0, -this.height - 5);
    this.context.closePath();
    this.context.fill();
    this.context.restore();

    if(this.flame) {
        this.context.fillStyle = '#f00';
        this.context.save();
        this.context.beginPath();
        this.context.translate(this.x, this.y);
        this.context.rotate(this.angle);
        this.context.moveTo(0, this.height / 2);
        this.context.lineTo(this.width / 2, 0);
        this.context.lineTo(-this.width / 2, 0);
        this.context.moveTo(0, -this.height);
        this.context.closePath();
        this.context.fill();
        this.context.restore();
    }

    if(this.dead) {
        this.context.fillStyle = "#f00";
        this.context.beginPath();
        this.context.arc(this.x, this.y, 25, 0, Math.PI*2, true);
        this.context.closePath();
        this.context.fill();
    }

    return this;
};

Ship.prototype.updateAngle = function(deg) {

    this.angle += deg*(Math.PI/180);
    this.angle %= 2*Math.PI;
    return this;
};

Ship.prototype.moveShip = function () {

    this.x += this.velocity*Math.sin(this.thrustAngle);
    this.y += this.velocity*-Math.cos(this.thrustAngle);

    return this;
};

Ship.prototype.thrust = function () {
    var spaceTime = this.spaceTime;

    if(spaceTime.ship.velocity <= 0) {
        spaceTime.ship.thrustAngle = spaceTime.ship.angle;
        spaceTime.ship.velocity += .2;
    }
    else if(spaceTime.ship.thrustAngle !== spaceTime.ship.angle) {
        if(spaceTime.ship.velocity > 0) {
        spaceTime.ship.velocity -= .3;
        }
        else {
            spaceTime.ship.velocity = 0;
        }
    }
    else if(spaceTime.ship.thrustAngle === spaceTime.ship.angle) {
        if(spaceTime.ship.velocity < 2) {
            spaceTime.ship.velocity += .2;
        }
    }

    spaceTime.ship.moveShip();
    spaceTime.ship.flame = true;
}