//var gamesAreFun = require('./game.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
window.addEventListener("keydown", checkKeyPressed, false);


function Ship(x,y,width,height,canvas,context) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.context = context;
}

Ship.prototype.draw = function () {
    context.fillStyle = '#f00';
    context.beginPath();
    context.moveTo(150, 150);
    context.lineTo(150, 125);
    context.lineTo(163, 155);
    context.lineTo(160, 155);
    context.lineTo(157, 150);
    context.lineTo(140, 150);
    context.lineTo(150, 150);
    context.lineTo(150, 125);
    context.lineTo(140, 150);
    context.lineTo(137, 155);
    context.lineTo(140, 155);
    context.lineTo(143, 150);
    context.lineTo(140, 150);
    context.lineTo(150, 150);
    context.closePath();
    context.fill();

    return this;
};

Ship.prototype.move = function () {
    this.x++;
    this.y++;
    return this;
};

Ship.prototype.shoot = function () {
    context.moveTo(this.x,this.y);
    var newX = this.x -= 1;
    var newY = this.y -= 1;
    context.lineTo(newX,newY);
    context.stroke();
};

var ship = new Ship(150, 150, 20, 20, canvas, context);
ship.draw();



function checkKeyPressed(e) {
    if (e.keyCode == "32") {
        requestAnimationFrame(function gameLoop() {
            ship.shoot();
            requestAnimationFrame(gameLoop);
        });
    }
}
