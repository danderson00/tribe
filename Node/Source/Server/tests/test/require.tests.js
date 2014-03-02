module('tribe.test.require');

test('require returns specified mock', function () {
    var target = {};
    require.mock('tribe/tests/modules/counter', target);
    equal(require('tribe/tests/modules/counter'), target);
});

test('built-in modules can be mocked', function () {
    var target = {};
    require.mock('fs', target);
    equal(require('fs'), target);
});

test('require returns same instance within each test', function () {
    var counter = require('tribe/tests/modules/counter');
    equal(counter.next(), 1);
    counter = require('tribe/tests/modules/counter');
    equal(counter.next(), 2);
});

test('require returns new instance for each test #1', function () {
    var first = require('tribe/tests/modules/counter').next();
    equal(first, 1);
});

test('require returns new instance for each test #2', function () {
    var second = require('tribe/tests/modules/counter').next();
    equal(second, 1);
});

test('mocked dependencies are provided to nested modules', function () {
    var target = {};
    require.mock('tribe/tests/modules/counter', target);
    equal(require('tribe/tests/modules/nested').counter, target);
});