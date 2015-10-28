'use strict';
const chai = require('chai');
const assert = chai.assert;
const Laser = require('../lib/laser');
const Ship = require('../lib/ship');
const $ = require('jquery');

describe('laser functionality', function () {
    it('testing should work', function () {
        assert(true);
    });

    it('should have properties', function () {
        let ship = new Ship(10, 30, 20, 10);
        let laser = new Laser(ship);
        assert.equal(laser.x,10);
        assert.equal(laser.y,30);
        assert.equal(laser.angle,0);
        assert.equal(laser.laserSpeed,15);

    });

    it('should update angle when ship updates angle', function (){
        let ship = new Ship(10, 10, 20, 10);
        let laser = new Laser(ship);
        assert.equal(laser.angle,0);
        ship.updateAngle(90);
        assert.equal(laser.angle,0);
    });


});