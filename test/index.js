﻿var options = require('tribe/options'),
    log = require('tribe.logger'),
    host = require('./host'),
    framework = require('./' + options.test.framework),
    _ = require('underscore');

module.exports = _.extend(framework, {
    initialise: function (asHost) {
        log.info('Initialising test framework...');

        _.each(options.testPaths, framework.loadDirectory);

        if (asHost) host.start();

        return this;
    }
});
