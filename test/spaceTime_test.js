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

    it('initializes some aliens', function () {
        let canvas    = { width: 800, height: 400 };
        let game      = { asteroidQuantity: 5, alienQuantity: 2 };
        let spaceTime = new ST(canvas, null, game);
        let numberOfAliens = 2;

        spaceTime.initialAliens(numberOfAliens);

        assert(spaceTime.aliens.length, numberOfAliens);
    });

    it('fires lasers', function () {
        let canvas    = { width: 800, height: 400 };
        let game      = { asteroidQuantity: 5, alienQuantity: 2 };
        let spaceTime = new ST(canvas, null, game);

        spaceTime.fireLaser();

        assert(spaceTime.lasers.length, 1)
    });

    it('activates shields', function () {
        let canvas    = { width: 800, height: 400 };
        let game      = { asteroidQuantity: 5, alienQuantity: 2 };
        let spaceTime = new ST(canvas, null, game);

        spaceTime.activeShield();

        assert(spaceTime.shields.length, 1)
    });

    it('drops mines', function () {
        let canvas    = { width: 800, height: 400 };
        let game      = { asteroidQuantity: 5, alienQuantity: 2 };
        let spaceTime = new ST(canvas, null, game);

        spaceTime.layMine();
        spaceTime.layMine();
        spaceTime.layMine();

        assert(spaceTime.mines.length, 3)
    });
});