var store = require('./eventStore'),
    hub = require('./hub'),
    pubsub = require('tribe.pubsub'),
    expressions = require('tribe.expressions'),
    log = require('tribe.logger'),
    sortObject = require('tribe/utilities/collections').sortObject,
    Q = require('q'),

    scopes = {};

module.exports = {
    request: function (scope) {
        var messages, data;

        return store.retrieve(scope)
            .then(function (localMessages) {
                messages = localMessages;
                data = getScopeData(scope);

                var lastLocalSeq = messages.length > 0 && messages[messages.length - 1].seq;

                // no existing session. request a scope from the server
                if (!data.count)
                    return requestScope(lastLocalSeq);

                // scope is currently being requested. await result.
                if (data.promise)
                    return data.promise;

                // otherwise we're already active, just return local messages below
            })
            .then(function (scopeEnvelopes) {
                data.count++;

                if(scopeEnvelopes)
                    messages = messages.concat(scopeEnvelopes);

                return { envelopes: messages };
            });

        function requestScope(since) {
            var scopeEnvelopes;

            data.promise = Q.when(hub.scope({ scope: scope, since: since }))
                .then(function (result) {
                    data.token = module.exports.relayAndStore(scope);
                    scopeEnvelopes = result && result.envelopes;
                    if(scopeEnvelopes)
                        return store.store(scope, scopeEnvelopes);
                })
                .then(function () {
                    return scopeEnvelopes;
                });

            return data.promise;
        }
    },
    release: function (scope) {
        var data = getScopeData(scope);
        data.count--;
        if(!data.count) {
            pubsub.unsubscribe(data.token);
            data.promise = null;
            data.token = null;
        }
    },
    relayAndStore: function (scope, topics) {
        return pubsub.subscribe(topics || '*', function (message, envelope) {
            if (envelope.origin !== 'server' && envelope.origin !== 'client') {
                Q(hub.publish(envelope))
                    .then(function (envelope) {
                        return store.store(scope, envelope);
                    })
                    .fail(function (error) {
                        // as we're not returning the promise anywhere, we need to log our own errors
                        log.error('Exception occurred while storing or relaying message', error);
                    });
            }
        }, expressions.create(scope, 'data'));
    }
};

function getScopeData(scope) {
  var key = JSON.stringify(sortObject(scope));;

  if(!scopes[key])
    scopes[key] = { count: 0, token: null, promise: null };

    return scopes[key];
}
