'use strict';
const chai = require('chai');
const assert = chai.assert;
const AlienLaser = require('../lib/alienLaser');
const Alien = require('../lib/alien');
const Ship = require('../lib/ship');
const $ = require('jquery');

describe('alien laser functionality', function () {
    it('testing should work', function () {
        assert(true);
    });

    it('should have properties', function () {
        let alien = new Alien(10, 20);
        let laser = new AlienLaser(alien);
        assert.equal(laser.x,10);
        assert.equal(laser.y,20);
        assert.equal(laser.laserSpeed,7);

    });

    it('should shoot up if ship is above alien', function (){
        let alien = new Alien(10, 50);
        let ship = new Ship(10, 10, 20, 10);
        let laser = new AlienLaser(alien,ship);
        laser.setLaserTrajectory();
        assert.equal(laser.y,43);
    });

    it('should shoot down if ship is below alien', function (){
        let alien = new Alien(10, 10);
        let ship = new Ship(10, 50, 20, 10);
        let laser = new AlienLaser(alien,ship);
        laser.setLaserTrajectory();
        assert.equal(laser.y,17);
    });



});