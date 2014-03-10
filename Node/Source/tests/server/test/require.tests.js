﻿
describe('tribe.test.require', function () {
    it('require returns specified stub', function () {
        var target = {};
        stub('counter', target);
        expect(require('counter')).to.equal(target);
    });

    it('built-in modules can be mocked', function () {
        var target = {};
        stub('fs', target);
        expect(require('fs')).to.equal(target);
    });

    it('require returns same instance within each test', function () {
        var counter = require('counter');
        expect(counter.next()).to.equal(1);
        counter = require('counter');
        expect(counter.next()).to.equal(2);
    });

    it('require returns new instance for each test #1', function () {
        var first = require('counter').next();
        expect(first).to.equal(1);
    });

    it('require returns new instance for each test #2', function () {
        var second = require('counter').next();
        expect(second).to.equal(1);
    });

    it('mocked dependencies are provided to nested modules', function () {
        var target = {};
        stub('./counter', target);
        expect(require('counter/nested').counter).to.equal(target);
    });
});