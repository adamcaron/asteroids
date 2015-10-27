module.exports = Shield;

function Shield (ship,context) {
    this.x = ship.x;
    this.y = ship.y;
    this.radius = 15;
    this.context = context;
    return this;
}

Shield.prototype.draw = function (ship) {
    this.context.strokeStyle = '#00FF00';
    this.context.beginPath();
    this.context.arc(ship.x,ship.y,this.radius,0,2*Math.PI);
    this.context.stroke();

    return this;
};

