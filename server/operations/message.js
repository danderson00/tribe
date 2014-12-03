﻿var log = require('tribe.logger'),
    messageThrottle = require('../messageThrottle'),
    messages = require('tribe/storage').entity('messages');

module.exports = function (envelope, context) {
    envelope.sourceId = context.clientId;
    messageThrottle.annotateEnvelope(envelope);
    return messages
        .store(envelope)
        .then(function (messageId) {
            context.ack(messageId);
            context.pubsub.publish(envelope);
        })
        .fail(function (err) {
            log.error('Failed to store message', err);
            context.ack(null, err);
        });
};