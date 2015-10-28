'use strict';
const chai = require('chai');
const assert = chai.assert;
const Game = require('../lib/game');
const Alien = require('../lib/alien');
const Asteroid = require('../lib/asteroid');
const $ = require('jquery');

describe('game functionality', function () {
    it('testing should work', function () {
        assert(true);
    });

    it('should have properties', function () {
        let canvas = { width: 800, height: 400 };
        let game = new Game(canvas,null);

        assert.equal(game.score,0);
        assert.equal(game.lives,3);
        assert.equal(game.level,1);
        assert.equal(game.asteroidQuantity,5);
        assert.equal(game.alienQuantity,2);
        assert.equal(game.asteroidVelocity,.75);
        assert.equal(game.spaceTime.canvas,canvas);
    });

    it('should update score when something is hit', function (){
        let canvas = { width: 800, height: 400 };
        let game = new Game(canvas,null);
        let alien = new Alien(10, 20);
        assert.equal(game.score,0);
        game.scorePoints(alien);
        assert.equal(game.score,500);
    });

    it('should update lives when ship dies', function (){
        let canvas = { width: 800, height: 400 };
        let game = new Game(canvas,null);
        assert.equal(game.score,0);
        assert.equal(game.lives,3);
        game.die();
        assert.equal(game.lives,2);
    });

    it('should increase asteroids and aliens when level goes up', function (){
        let canvas = { width: 800, height: 400 };
        let game = new Game(canvas,null);

        assert.equal(game.score,0);
        assert.equal(game.lives,3);
        assert.equal(game.level,1);
        assert.equal(game.asteroidQuantity,5);
        assert.equal(game.alienQuantity,2);
        assert.equal(game.asteroidVelocity,.75);
        assert.equal(game.spaceTime.canvas,canvas);

        game.levelUp();

        assert.equal(game.asteroidQuantity,7);
        assert.equal(game.alienQuantity,3);
        assert.equal(game.asteroidVelocity,1);
        assert.equal(game.spaceTime.asteroids.length,12);
        assert.equal(game.spaceTime.aliens.length,5);


    });


});