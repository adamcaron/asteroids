'use strict';
const chai   = require('chai');
const assert = chai.assert;
const Ship   = require('../lib/ship');

describe('ship functionality', function () {

    it('testing should work', function () {
        assert(true);
    });

    it('should have properties', function () {
        let ship = new Ship(10, 10, 20, 10);

        assert.equal(ship.width,20);
        assert.equal(ship.height,10);
        assert.equal(ship.angle,0);
        assert.equal(ship.thrustAngle,0);
        assert.equal(ship.velocity,0);

    });

    it('should update angle', function (){
        let ship = new Ship(10, 10, 20, 10);
        ship.updateAngle(90);
        assert.equal(ship.angle,Math.PI/2);
    });

    it('should move ship', function (){
        let ship = new Ship(10, 10, 20, 10);
        ship.thrustAngle = Math.PI/2;
        ship.velocity = 1;
        ship.moveShip();
        assert.equal(ship.x,11);
    });
});

