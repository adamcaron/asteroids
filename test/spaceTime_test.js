"use strict";
const chai   = require('chai');
const assert = chai.assert;
const ST     = require('../lib/spacetime');
const $      = require('jquery');

describe('spaceTime functionality', function () {
    it('should have properties', function () {
        let canvas = { width: 800, height: 400 };
        let game   = { asteroidQuantity: 5, alienQuantity: 2 };

        let spaceTime = new ST(canvas, null, game);

        assert.equal(spaceTime.asteroids.length, 5);
        assert.equal(spaceTime.aliens.length, 2);
        assert.equal(spaceTime.lasers.length, 0);
        assert.equal(spaceTime.alienLasers.length, 0);
        assert.equal(spaceTime.shields.length, 0);
        assert.equal(spaceTime.mines.length, 0);
    });

    it('initializes a bunch of asteroids', function () {
        let canvas    = { width: 800, height: 400 };
        let game      = { asteroidQuantity: 5, alienQuantity: 2 };
        let spaceTime = new ST(canvas, null, game);
        let numberOfAsteroids = 15;

        spaceTime.initialAsteroids(numberOfAsteroids);

        assert(spaceTime.asteroids.length, numberOfAsteroids);
    });
});