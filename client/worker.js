﻿var pubsub = require('tribe').pubsub,
    log = require('tribe.logger');

// if we're executing inside a web worker, hook up the message bus
if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
    bridgePubsub(self);

module.exports = {
    start: function () {
        var worker = new Worker('app.js');
        bridgePubsub(worker);
    }
};

function bridgePubsub(target) {
    target.onmessage = function (e) {
        pubsub.publish(e.data.envelope);
    };

    pubsub.subscribe('*', function (data, envelope) {
        target.postMessage(envelope);
    });
}