﻿var options = require('tribe/options'),
    tests = require('tribe/test'),
    Q = require('q'),
    _ = require('underscore');

options.test.mocha.reporter = 'dot';
Q.all(_.map(options.testPaths, tests.loadDirectory)).then(function () {
    tests.run();
});