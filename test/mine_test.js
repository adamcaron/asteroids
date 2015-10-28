'use strict';
const chai = require('chai');
const assert = chai.assert;
const Mine = require('../lib/mine');
const Ship = require('../lib/ship');
const $ = require('jquery');

describe('mine functionality', function () {
    it('testing should work', function () {
        assert(true);
    });

    it('should have properties', function () {
        let ship = new Ship(10, 30, 20, 10);
        let mine = new Mine(ship);
        assert.equal(mine.x,10);
        assert.equal(mine.y,30);
        assert.equal(mine.radius,5);

    });

});