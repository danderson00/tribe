﻿var Module = require('module'),
    cp = require('child_process'),
    options = require('tribe/options'),
    utils = require('tribe/utilities'),
    pubsub = require('tribe.pubsub').createLifetime(),
    log = require('tribe.logger'),
    _ = require('underscore');

module.exports = {
    start: function (processOptions) {
        processOptions = processOptions || {};
        processOptions.topic = processOptions.topic || '*';

        // resolve the target path using the calling module to preserve module paths
        var resolvedPath = Module._resolveFilename(processOptions.path, module.parent),
            restart = processOptions.restart,
            args = [],
            child;

        if (processOptions.debugPort) args.push('--debug=' + processOptions.debugPort);
        args.push(require.resolve('./bootstrapper'));
        args.push(resolvedPath);
        args.push(JSON.stringify(options));
        args.push(JSON.stringify(processOptions));

        pubsub.subscribe(processOptions.topic, publishMessageToChild);

        startProcess();

        return {
            end: endProcess,
            restart: restartProcess
        };

        function restartProcess() {
            if (child)
                child.kill();
            if (!child || !restart)
                startProcess();
        }

        function startProcess() {
            var processPath = process.execPath;

            child = cp.spawn(processPath, args, { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] });
            child.on('message', publishMessageFromChild);
            child.on('exit', handleExit);
            child.stdout.on('data', logMessages);
            child.stderr.on('data', logMessages);

            function logMessages(data) {
                _.each(data.toString().split('\n'), function (message) {
                    if (message)
                        log.log(message, '(' + processOptions.path + ':' + child.pid + ')');
                });
            }
        }

        function endProcess() {
            restart = false;
            if(child) child.kill();
        }

        function publishMessageFromChild(envelope) {
            pubsub.publish(envelope);
        }

        function publishMessageToChild(data, envelope) {
            if (child && child.connected)
                child.send(envelope);
        }

        function handleExit(code) {
            log.info('Process for ' + processOptions.path + ' exited with code ' + code + '.');
            if (restart) startProcess();
        } 
    }
};
