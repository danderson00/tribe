﻿require('tribe/driveLetterHack');

var options = require('tribe/options'),
    pubsub = require('tribe.pubsub'),
    log = require('tribe.logger'),

    modulePath = process.argv[2],
    passedOptions = JSON.parse(process.argv[3]),
    processOptions = JSON.parse(process.argv[4]);

log.disableColor();
options.apply(passedOptions);
options.childProcess = true;

pubsub.subscribe(processOptions.topic, function (data, envelope) {
    if (envelope.origin !== 'parent')
        process.send(envelope);
});

process.on('message', function (envelope) {
    envelope.origin = 'parent';
    pubsub.publish(envelope);
});


var result = require(modulePath);
if (result && result.constructor === Function)
    result();

log.info('Process for ' + modulePath + ' started.');