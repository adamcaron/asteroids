'use strict';
const chai     = require('chai');
const assert   = chai.assert;
const Asteroid = require('../lib/asteroid');

describe('asteroid functionality', function () {
    it('testing should work', function () {
        assert(true);
    });

    it('should have properties', function () {
        let asteroid = new Asteroid(10, 10, 40, 30);

        assert.equal(asteroid.width,40);
        assert.equal(asteroid.height,30);
        assert.equal(asteroid.hit_count,0);
    });

    it('should move asteroid', function (){
        let asteroid = new Asteroid(10, 10, 40, 30);

        asteroid.vx = 2;
        asteroid.vy = 2;
        asteroid.move();
        assert.equal(asteroid.x,12);
        assert.equal(asteroid.y,12);
    });

});