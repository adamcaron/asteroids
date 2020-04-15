"use strict";
const chai   = require('chai');
const assert = chai.assert;
const SpaceTime     = require('../lib/spacetime');

describe('SpaceTime functionality', function () {

    describe('Initial state of the universe', function () {

        it('has properties', function () {
            let canvas = { width: 800, height: 400 };
            let game   = { asteroidQuantity: 5, alienQuantity: 2 };

            let spaceTime = new SpaceTime(canvas, null, game);

            assert.equal(spaceTime.asteroids.length, 5);
            assert.equal(spaceTime.aliens.length, 2);
            assert.equal(spaceTime.lasers.length, 0);
            assert.equal(spaceTime.alienLasers.length, 0);
            assert.equal(spaceTime.shields.length, 0);
            assert.equal(spaceTime.mines.length, 0);
        });


        it('initializes a bunch of asteroids', function () {
            let canvas    = { width: 800, height: 400 };
            let game      = { asteroidQuantity: null, alienQuantity: null };
            let spaceTime = new SpaceTime(canvas, null, game);
            let numberOfAsteroids = 15;

            spaceTime.initialAsteroids(numberOfAsteroids);

            assert.equal(spaceTime.asteroids.length, numberOfAsteroids);
        });

        it('initializes some aliens', function () {
            let canvas    = { width: 800, height: 400 };
            let game      = { asteroidQuantity: null, alienQuantity: null };
            let spaceTime = new SpaceTime(canvas, null, game);
            let numberOfAliens = 2;

            spaceTime.initialAliens(numberOfAliens);

            assert.equal(spaceTime.aliens.length, numberOfAliens);
        });
    });

    describe('weapons & such', function () {

        it('fires lasers', function () {
            let canvas    = { width: 800, height: 400 };
            let game      = { asteroidQuantity: 5, alienQuantity: 2 };
            let spaceTime = new SpaceTime(canvas, null, game);

            spaceTime.fireLaser();
            spaceTime.fireLaser();
            spaceTime.fireLaser();

            assert.equal(spaceTime.lasers.length, 3)
        });

        it('activates shields', function () {
            let canvas    = { width: 800, height: 400 };
            let game      = { asteroidQuantity: 5, alienQuantity: 2 };
            let spaceTime = new SpaceTime(canvas, null, game);

            spaceTime.activeShield();

            assert.equal(spaceTime.shields.length, 1)
        });

        it('drops mines', function () {
            let canvas    = { width: 800, height: 400 };
            let game      = { asteroidQuantity: 5, alienQuantity: 2 };
            let spaceTime = new SpaceTime(canvas, null, game);

            spaceTime.layMine();
            spaceTime.layMine();
            spaceTime.layMine();

            assert.equal(spaceTime.mines.length, 3)
        });
    });
});