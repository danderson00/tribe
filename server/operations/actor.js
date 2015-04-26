var eventStore = require('tribe/storage').entity('messages'),
    actors = require('tribe/actors'),
    expressions = require('tribe.expressions'),
    _ = require('underscore');

// deprecated. only used by test-studio
module.exports = function (options, context) {
    //{ actor: '/path', scope: 'scope' }
    // authenticate and authorise!

    var definition = actors.definition(options.actor);

    if (!definition) {
        context.ack(null, "Requested actor '" + options.actor + "' has not been registered");
        return;
    }

    var expression = expressions.apply(definition.expression, prepareScope(options.scope));

    subscribe(definition.topics, expression);

    if (expression)
        return returnMessages(expression);
    else
        context.ack({});

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

    function prepareScope(scope) {
        // this defaults to getting scope from envelope.data
        if (scope && scope.constructor === Object)
            return _.reduce(scope, function (result, value, path) {
                result['data.' + path] = value;
                return result;
            }, {});
        return scope;
    }
}
