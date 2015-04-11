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
            .then(function (result) {
                data.count++;

                if(result && result.envelopes)
                    messages = messages.concat(result.envelopes);

                return messages;
            });

        function requestScope(since) {
            var scopeResult;

            data.promise = Q.when(hub.scope({ scope: scope, since: since }))
                .then(function (result) {
                    relayAndStore();
                    scopeResult = result;
                    return store.store(result.envelopes);
                })
                .then(function () {
                    return scopeResult;
                });

            return data.promise;
        }

        function relayAndStore() {
            data.token = pubsub.subscribe('*', function (message, envelope) {
                Q.when(
                    store.store(envelope),
                    hub.publish(envelope)
                ).then(function (results) {
                    // update the local store with the envelope back from the server containing sequence number
                    results[1].clientSeq = results[0].clientSeq;
                    store.store(results[1]);
                }).fail(function (error) {
                    // as we're not returning the promise anywhere, we need to log our own errors
                    log.error('Exception occurred while storing or relaying message', error);
                });
            }, expressions.create(scope, 'data'));
        }
    },
    release: function (scope) {
        var data = getScopeData(scope);
        data.count--;
        if(!data.count) {
            pubsub.unsubscribe(token);
            data.promise = null;
            data.token = null;
        }
    }
};

function getScopeData(scope) {
  var key = JSON.stringify(sortObject(scope));;

  if(!scopes[key])
    scopes[key] = { count: 0, token: null, promise: null };

    return scopes[key];
}
