﻿var options = require('tribe/options'),
    process = require('tribe/process'),
    watcher = require('tribe/utilities/watcher'),
    pubsub = require('tribe.pubsub'),
    _ = require('underscore'),
    runner;

module.exports = {
    start: function () {
        // need to delay this as it won't be initialised yet. A bit nasty.
        var test = require('tribe/test');

        // test channel should be an option
        runner = process.start({
            path: 'tribe/test/process',
            topic: 'test.*',
            debugPort: options.test.debugPort,
            restart: true
        });

        var restart = _.throttle(runner.restart, options.test.restartThrottle, { leading: false }),
            watchers = [];

        _.each(options.testPaths, function (path) {
            watchers.push(watcher.watch(path, {
                createOrUpdate: function (changePath) {
                    test.loadFile(changePath, changePath.replace(path, ''));
                    restart();
                },
                'delete': function (deletePath) {
                    test.removeFile(deletePath);
                    restart();
                }
            }));
        });

        watchers.push(watcher.watch(options.test.sourcePath || options.basePath, {
            createOrUpdate: function (changePath) {
                restart();
            }
        }));

        // suspend our watchers while tests are being run. this allows tests 
        // to create and manipulate files without triggering a restart
        pubsub.subscribe('test.run', function () {
            if(options.test.suspendWatchers)
                _.invoke(watchers, 'suspend');
        });

        pubsub.subscribe('test.runEnded', function () {
            if (options.test.suspendWatchers)
                _.invoke(watchers, 'resume');
        });

        pubsub.subscribe('test.restartProcess', function () {
            restart();
        });

        pubsub.subscribe('build.complete', function () {
            pubsub.publish({ topic: 'test.reloadAgent', channelId: '__test' });
        });
    }
};