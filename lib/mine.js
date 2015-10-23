module.exports = Mine;

function Mine (ship,context) {
    this.x = ship.x;
    this.y = ship.y;
    this.radius = 5;
    this.context = context;
    return this;
}


Mine.prototype.draw = function () {
    this.context.strokeStyle = '#e55d2f';
    this.context.beginPath();
    this.context.arc(this.x,this.y,this.radius,0,2*Math.PI);
    this.context.stroke();
    return this;
};

