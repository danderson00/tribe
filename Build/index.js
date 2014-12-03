﻿var activities = require('tribe/build/activities'),
    blocks = require('tribe/build/blocks'),
    templates = require('tribe/build/templates'),
    utils = require('tribe/utilities'),
    tribeOptions = require('tribe/options'),
    log = require('tribe.logger'),
    pubsub = require('tribe.pubsub'),
    path = require('path'),
    Q = require('q'),
    _ = require('underscore');

module.exports = {
/*  buildOptions: {
        tasks: [{ activity: 'activity_name', options: { } }, ...],
        phases: ['build', 'phases', ...],
        path: 'target/path'
    } */
    configure: function (buildOptions) {
        var tasks = [],
            options = {},
            configured;

        activities.loadBuiltin();
        tasks = _.map(buildOptions.tasks, activities.createTask);
        return configured = {
            addTask: function (activity, options) {
                tasks.push(activities.createTask({ activity: activity, options: options }));
            },

            execute: function (context) {
                log.debug('Building "' + buildOptions.name + '" from ' + buildOptions.path);

                context = context || {};

                return _.reduce(buildOptions.phases || [], function (previousPhase, phase) {
                    return Q.when(previousPhase).then(function () {
                        return _.reduce(tasks, function (previousTask, task) {
                            return Q.when(previousTask).then(function () {
                                return task[phase] && task[phase](context, {
                                    name: buildOptions.name,
                                    path: buildOptions.path,
                                    phases: buildOptions.phases || [],
                                    appPath: utils.paths.appPath(buildOptions.path)
                                });
                            });
                        }, null);
                    });
                }, null)

                .then(function () {
                    log.debug('Build of "' + buildOptions.name + '" from ' + buildOptions.path + ' complete.');
                    pubsub.publish('build.complete');
                })

                .fail(function (error) {
                    log.error('An error occurred while building:', error);
                });
            },

            // this will be replaced with a pubsub.subscribe once the config API and watcher component are in place
            watch: function () {
                var rebuild = _.throttle(function () {
                    configured.execute();
                }, tribeOptions.rebuildThrottle, { leading: false });

                function watch(watchPath) {
                    utils.watcher.watch(path.resolve(watchPath), rebuild);
                }

                _.each(tribeOptions.testPaths, watch);
                _.each(tribeOptions.browserTestPaths, watch);
                watch(buildOptions.path);
                // probably not necessary
                watch(tribeOptions.modulePath);
                // we also need to add sourcePath as passed from the command line

                return configured;
            },

            tasks: tasks
        };
    },

    activities: activities,
    blocks: blocks,
    templates: templates
};
