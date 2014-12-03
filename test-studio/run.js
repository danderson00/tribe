var options = require('tribe/options'),
    tests = require('tribe/test'),
    path = require('path'),
    Q = require('q'),
    _ = require('underscore');

ko = require('tribe/node_modules/knockout/build/output/knockout-latest.debug');

options.test.mocha.reporter = options.test.mocha.reporter || 'dot';

Q.all(_.map([
    path.resolve(__dirname, '../tests/server/'),
    path.resolve(__dirname, 'tests')
], tests.loadDirectory))

.then(function () {
    tests.run();
});