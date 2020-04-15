'use strict';
const chai = require('chai');
const assert = chai.assert;
const Shield = require('../lib/shield');
const Ship = require('../lib/ship');

describe('shield functionality', function () {
    it('testing should work', function () {
        assert(true);
    });

    it('should have properties', function () {
        let ship = new Ship(10, 30, 20, 10);
        let shield = new Shield(ship);
        assert.equal(shield.x,10);
        assert.equal(shield.y,30);
        assert.equal(shield.radius,15);

    });

});