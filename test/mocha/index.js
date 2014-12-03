﻿var Mocha = require('mocha'),
    overrides = require('./overrides'),
    construct = require('./construct'),
    convert = require('./convert'),
    loader = require('./loader'),
    runner = require('./runner'),
    options = require('tribe/options'),
    log = require('tribe.logger'),

    mocha = new Mocha(options.test.mocha);

module.exports = {
    run: function (tests) {
        log.debug('Running tests...');
        return runner.run(tests ? construct.suite(mocha, tests) : mocha.suite, options.test.mocha.reporter);
    },
    loadFile: function (path, debugPath) {
        return loader.loadFile(mocha, path, debugPath);
    },
    loadDirectory: function (path) {
        return loader.loadDirectory(mocha, path);
    },
    removeFile: function (path) {
        return loader.removeFile(mocha, path);
    },
    tests: function () {
        return convert.suite(mocha.suite);
    },
    mocha: mocha
};

