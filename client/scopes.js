var store = require('./eventStore'),
    hub = require('./hub'),
    sortObject = require('tribe/utilities/collections').sortObject,

    scopeCounts = {};

module.exports = {
    request: function (scope) {
        var key = JSON.stringify(sortObject(scope)),
            messages;

        return store.retrieve(scope)
            .then(function (localMessages) {
                messages = localMessages;

                var count = scopeCounts[key],
                    lastLocalSeq = messages.length > 0 && messages[messages.length - 1].seq;

                // no existing session. request a scope from the server
                if (!count) {
                    scopeCounts[key] = hub.scope({ scope: scope, since: lastLocalSeq });
                    return scopeCounts[key];
                }

                // scope is currently being requested. await result.
                if (count.then)
                    return count;

                // otherwise we're already active, just return local messages
            })
            .then(function (result) {
                scopeCounts[key]++;
                if(result && result.envelopes)
                    messages = messages.concat(result.envelopes);

                return messages;
            });
    },
    release: function (scope) {
        scope = sortObject(scope);

    }
};

