﻿var fork = require('child_process').fork,
    log = require('tribe.logger');

module.exports = {
    start: function (port) {
        try {
            var inspectorArgs = ['--web-port', port],
                forkOptions = { silent: true },
                inspector = fork(
                    require.resolve('node-inspector/bin/inspector'),
                    inspectorArgs,
                    forkOptions
                );

            inspector.on('message', handleInspectorMessage);
            //inspector.stdout.on('data', log.log);
            inspector.stderr.on('data', log.log);

            function handleInspectorMessage(message) {
                switch (message.event) {
                    case 'SERVER.LISTENING':
                        log.info('node-inspector started - visit http://localhost:' + port + '/debug?port=' + process.debugPort + ' to debug server');
                        break;
                    case 'SERVER.ERROR':
                        log.error('Cannot start node-inspector: ' + message.error.code);
                        break;
                }
            }
        } catch (ex) {
            log.info('Unable to load node-inspector - ' + ex.message);
        }
    }
};