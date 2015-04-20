suite('tribe.browser.integration.scopes', function () {
    var scopes = require('tribe/client/scopes'),
        hub = require('tribe/client/hub'),
        eventStore = require('tribe/client/eventStore'),
        pubsub = require('tribe.pubsub'),
        uuid = require('node-uuid').v4,
        Q = require('q'),

        scope;

    setup(function () {
        scope = { test: uuid() };
    });

    test("messages are retrieved from server store and persisted locally", function () {
        return eventStore.clear()
            .then(function () {
                return scopes.request(scope);
            })
            .then(function (messages) {
                expect(messages.length).to.equal(0);
                pubsub.publish({ topic: 'topic', data: scope });
                return delay(100)();
            })
            .then(function () {
                return scopes.request(scope);
            })
            .then(function (messages) {
                expect(messages.length).to.equal(1);
                return eventStore.retrieve(scope);
            })
            .then(function (messages) {
                expect(messages.length).to.equal(1);
            });
    });

    test("messages are persisted locally", function () {
        return eventStore.clear()
            .then(function () {
                return scopes.request(scope);
            })
            .then(function (messages) {
                pubsub.publish('topic', scope);
                return delay(100)();
            })
            .then(function () {
                return eventStore.retrieve(scope);
            })
            .then(function (messages) {
                expect(messages.length).to.equal(1);
            });
    });

    test("messages are retrieved from local store", function () {
        return eventStore.clear()
            .then(function () {
                return eventStore.store(scope, { topic: 'topic', data: scope });
            })
            .then(function () {
                return scopes.request(scope);
            })
            .then(function (messages) {
                expect(messages.length).to.equal(1);
            });
    });

    test("messages stored locally are combined with server messages", function () {
        return eventStore.clear()
            .then(function () {
                return eventStore.store(scope, { topic: 'topic', data: scope });
            })
            .then(function () {
                return hub.publish({ topic: 'topic', data: scope });
            })
            .then(function () {
                return scopes.request(scope);
            })
            .then(function (messages) {
                expect(messages.length).to.equal(2);
            });
    });

    test("only server messages with seq later than requested are returned", function () {
        var first;
        return eventStore.clear()
            .then(function () {
                return hub.publish({ topic: 'topic', data: scope })
            })
            .then(function (envelope) {
                first = envelope;
                return hub.publish({ topic: 'topic', data: scope })
            })
            .then(function () {
                return eventStore.store(scope, first);
            })
            .then(function () {
                return hub.scope({ scope: scope, since: first.seq });
            })
            .then(function (result) {
                expect(result.envelopes.length).to.equal(1);
                expect(result.envelopes[0].seq).to.be.greaterThan(first.seq);
            });
    });

    // test("new scope is not requested for subsets of existing scopes", function () {
    //     assert(false, 'test not implemented');
    // });
    //
    // test("existing scope is replaced if superset is requested", function () {
    //     assert(false, 'test not implemented');
    // });

    function delay(ms) {
        return function () {
            var promise = Q.defer();
            setTimeout(promise.resolve, ms);
            return promise.promise;
        }
    }
});
