'use strict';
const chai = require('chai');
const assert = chai.assert;
const Alien = require('../lib/alien');
const AlienLaser = require('../lib/alienLaser');
const $ = require('jquery');

describe('alien functionality', function () {
    it('testing should work', function () {
        assert(true);
    });

    it('should have properties', function () {
        let alien = new Alien(10, 20);
        assert.equal(alien.radius,25);
        assert.equal(alien.velocity,1.2);

    });

    it('should move alien', function (){
        let alien = new Alien(10, 10, 20, 10);
        alien.move();
        assert.equal(alien.x,11.2);
    });

});