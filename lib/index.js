//var gamesAreFun = require('./game.js');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
window.addEventListener("keydown", checkSpacePressed, false);
window.addEventListener("keydown", checkArrowPressed, false);


function Asteroid(x,y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Asteroid.prototype.draw = function () {
    context.fillStyle = "#000";
    context.fillRect(this.x,this.y,this.width,this.height);
    return this;
};

function Ship(x,y,width,height,canvas,context) {
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
    context.fillStyle = '#f00';
    context.beginPath();
    context.moveTo(this.x, this.y - this.height);
    context.lineTo(this.x + this.width/2, this.y);
    context.lineTo(this.x - this.width/2, this.y);
    context.moveTo(this.x, this.y - this.height);
    context.closePath();
    context.fill();
    this.resetLaser();

    return this;
};

Ship.prototype.shoot = function () {
    if(this.laserY > 0 && this.laserY < canvas.height) {
        context.strokeStyle = '#ff0000';
        context.moveTo(this.laserX, this.laserY);
        this.laserY -= 5;
        context.lineTo(this.x, this.laserY);
        context.stroke();
    }
    else {
        drawAll();
    }
};

var ship = new Ship(150, 150, 10, 10, canvas, context);
var asteroids = [];
asteroids.push(new Asteroid(140, 40, 20, 20));
asteroids.push(new Asteroid(220, 180, 12, 34));
asteroids.push(new Asteroid(20, 250, 40, 14));


function drawAll () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    ship.draw();
    asteroids.forEach( function (asteroid) {
        asteroid.draw();
    });
}

drawAll();

function checkSpacePressed(e) {
    if (e.keyCode == "32") {
        asteroids.forEach( function(asteroid) {
            requestAnimationFrame(function shootLaser() {
                ship.shoot();

                if(ship.laserY <= asteroid.y + asteroid.height && ship.laserY >= asteroid.y) {
                    if(ship.laserX <= asteroid.x + asteroid.width && ship.laserX >= asteroid.x){
                        asteroids = asteroids.filter( function(a) {
                            return a !== asteroid;
                        });
                        drawAll();
                    }
                }
                else {
                    requestAnimationFrame(shootLaser);
                }
            });
        });
    }
}

function checkArrowPressed(e) {
    if (e.keyCode == "37") {
        requestAnimationFrame(function rotate() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            ship.x -= 5;
            ship.laserX -= 5;
            drawAll();
        });
    }
    else if(e.keyCode == "39") {
        requestAnimationFrame(function rotate() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            ship.x += 5;
            ship.laserX += 5;
            drawAll();
        });
    }
    else if(e.keyCode == "38") {
        requestAnimationFrame(function rotate() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            ship.y -= 5;
            ship.laserY -= 5;
            drawAll();
        });
    }
    else if(e.keyCode == "40") {
        requestAnimationFrame(function rotate() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            ship.y += 5;
            ship.laserY += 5;
            drawAll();
        });
    }
}
