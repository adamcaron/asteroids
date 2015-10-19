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
    context.fillRect(this.x, this.y, this.width, this.height);
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
