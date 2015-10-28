"use strict";
const chai   = require('chai');
const assert = chai.assert;
const ST     = require('../lib/spacetime');
const $      = require('jquery');

describe('space-time functionality', function () {
    it('should have properties', function () {
        let canvas = {
                        width: 800,
                        height: 500
                    };
        let game   = {
                        asteroidQuantity: 5,
                        alienQuantity: 2
                    };

        let spaceTime = new ST(canvas, null, game);

        assert.equal(spaceTime.asteroids.length, 5);
        assert.equal(spaceTime.aliens.length, 2);
        assert.equal(spaceTime.lasers.length, 0);
        assert.equal(spaceTime.alienLasers.length, 0);
        assert.equal(spaceTime.shields.length, 0);
        assert.equal(spaceTime.mines.length, 0);
    });
});
