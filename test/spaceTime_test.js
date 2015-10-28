"use strict";
const chai   = require('chai');
const assert = chai.assert;
const ST     = require('../lib/spacetime');
const $      = require('jquery');

describe('space-time functionality', function () {
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

    it('draws all the objects', function () {
        it('should delegate to all the draw methods', function () {
            let canvas    = { width: 800, height: 400 };
            let game      = { asteroidQuantity: 5, alienQuantity: 2 };
            let spaceTime = new ST(canvas, null, game);

            spaceTime.drawAll();

            assert(spaceTime.detectSides.calledOnce);
            assert(spaceTime.ship.moveShip().draw.calledOnce);
            assert(spaceTime.drawAsteroids.calledOnce);
            assert(spaceTime.drawAliens.calledOnce);
            assert(spaceTime.detectShipCollision.calledOnce);
            assert(spaceTime.drawLasers.calledOnce);
            assert(spaceTime.drawAlienLasers.calledOnce);
            assert(spaceTime.drawMines.calledOnce);
            assert(spaceTime.drawShield.calledOnce);
            assert(spaceTime.game.updateScore.calledOnce);
            assert(spaceTime.game.updateLives.calledOnce);
        });
    });
});