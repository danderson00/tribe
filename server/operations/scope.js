﻿var eventStore = require('tribe/storage').entity('messages'),
    actors = require('tribe/actors'),
    expressions = require('tribe.expressions'),
    log = require('tribe.logger'),
    _ = require('underscore');

module.exports = function (options, context) {
    // authorise!

    var expression = expressions.create(options.scope, 'data');

    subscribe('*', expression);

    if (options.since)
        expression = expression.concat({ p: 'seq', o: '>', v: options.since });

    return returnMessages(expression);

    function subscribe(topics, expression) {
        context.pubsub.subscribe(topics, function (data, envelope) {
            if (envelope.sourceId !== context.clientId && (!envelope.hasBeenBroadcastTo || !envelope.hasBeenBroadcastTo(context.clientId))) {
                context.socket.emit('message', envelope);
                envelope.addToBroadcastList && envelope.addToBroadcastList(context.clientId);
            }
        }, expression);
    }

    function returnMessages(expression) {
        return eventStore.retrieve(expression)
            .then(function (envelopes) {
                context.ack({ envelopes: envelopes });
            })
            .fail(function (err) {
                log.error('Failed to retrieve actor messages', err);
                context.ack(null, err);
            });
    }
}
