﻿var eventStore = require('tribe/storage').entity('messages'),
    actors = require('tribe/actors');

module.exports = function (options, context) {
    //{ topics: 'topic' || ['topic1','topic2'], expression: expression }
    // authenticate and authorise!
    subscribe(options.topics, options.expression);
    context.ack({});

    function subscribe(topics, expression) {
        context.pubsub.subscribe(topics, function (data, envelope) {
            if (envelope.sourceId !== context.clientId)
                context.socket.emit('message', envelope);
        }, expression);
    }
}