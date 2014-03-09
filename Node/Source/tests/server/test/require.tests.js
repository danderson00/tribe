module('tribe.test.require');

test('require returns specified mock', function () {
    var target = {};
    stub('counter', target);
    equal(require('counter'), target);
});

test('built-in modules can be mocked', function () {
    var target = {};
    stub('fs', target);
    equal(require('fs'), target);
});

test('require returns same instance within each test', function () {
    var counter = require('counter');
    equal(counter.next(), 1);
    counter = require('counter');
    equal(counter.next(), 2);
});

test('require returns new instance for each test #1', function () {
    var first = require('counter').next();
    equal(first, 1);
});

test('require returns new instance for each test #2', function () {
    var second = require('counter').next();
    equal(second, 1);
});

test('mocked dependencies are provided to nested modules', function () {
    var target = {};
    stub('./counter', target);
    equal(require('counter/nested').counter, target);
});