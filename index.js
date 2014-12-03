﻿require('tribe/driveLetterHack');

var log = require('tribe.logger'),
    Q = require('q'),
    _ = require('underscore');

// this is less than ideal. It allows code running on the server side like actors to use observables without requiring knockout, like in the browser
ko = require('knockout');

module.exports = {
    // server
    start: function (options) {
        options = require('tribe/options').apply(options);

        if (options.debug)
            require('tribe/process/inspector').start(options.inspectorPort);

        Q.all(_.map(options.builds, function (build) {
            return require('tribe/build')
                .configure(build)
                .watch()
                .execute();
        }))
        .then(function () {
            var indexes = require('tribe/actors').indexes().concat(['topic']);
            return require('tribe/storage')
                .initialise([
                    { name: 'messages', indexes: indexes },
                    //{ name: 'users', indexes: ['username'] }
                ], options.storage);
        })
        .then(function () {
            require('tribe/test').initialise(true);

            require('tribe/server')
                .configure(options.server)
                .start();
        })
        .fail(function (err) {
            log.error('Failed to start server', err);
            process.exit(1);
        });
    },

    // common
    register: require('tribe/register'),
    pubsub: require('tribe.pubsub'),
    options: require('tribe/options')
};