const chai = require('chai');
const assert = chai.assert;
const Asteroid = require('../lib/asteroid');
const $ = require('jquery');

describe('my test suite', function () {
    it('should work', function () {
        assert(true);
    });

    it('should add two plus two', function () {
        let four = 2 + 2;
        assert.equal(four,4);
    });

    it('should be deep equal', function (){
        let x = [1,2,3,];
        assert.deepEqual(x,[1,2,3]);
        //Deep equal checks order and content of arrays
    });
});
