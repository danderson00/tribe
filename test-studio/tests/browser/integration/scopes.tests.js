suite('tribe.integration.scopes', function () {
    var scopes = require('tribe/client/scopes'),
        hub = require('tribe/client/hub'),
        eventStore = require('tribe/client/eventStore'),
        pubsub = require('tribe.pubsub'),
        uuid = require('node-uuid').v4,
        Q = require('q'),
        id;

    setup(function () {
        id = uuid();
    });

    test("messages are retrieved from server store and persisted locally", function () {
        return scopes.request({ test: id })
            .then(function (messages) {
                expect(messages.length).to.equal(0);
                return pubsub.publish({ topic: 'topic', data: { test: id } });
            })
            .then(function () {
                return scopes.request({ test: id })
            })
            .then(function (messages) {
                expect(messages.length).to.equal(1);
                return eventStore.retrieve({ test: id });
            })
            .then(function (messages) {
                expect(messages.length).to.equal(1);
            });
    });

    test("messages are persisted locally", function () {
        return scopes.request({ test: id })
            .then(function (messages) {
                pubsub.publish('topic', { test: id });
                return delay(100)();
            })
            .then(function () {
                return eventStore.retrieve({ test: id });
            })
            .then(function (messages) {
                expect(messages.length).to.equal(1);
            });
    });

    test("messages are retrieved from local store", function () {
        return eventStore.store({ topic: 'topic', data: { test: id } })
            .then(function () {
                return scopes.request({ test: id });
            })
            .then(function (messages) {
                expect(messages.length).to.equal(1);
            });
    });

    test("messages stored locally are combined with server messages", function () {
        return eventStore.store({ topic: 'topic', data: { test: id } })
            .then(function () {
                return hub.publish({ topic: 'topic', data: { test: id } });
            })
            .then(function () {
                return scopes.request({ test: id });
            })
            .then(function (messages) {
                expect(messages.length).to.equal(2);
            });
    });

    test("only server messages with seq later than requested are returned", function () {
        var first;
        return hub.publish({ topic: 'topic', data: { test: id } })
            .then(function (envelope) {
                first = envelope;
                return hub.publish({ topic: 'topic', data: { test: id } })
            })
            .then(function () {
                return eventStore.store(first);
            })
            .then(function () {
                return hub.scope({ scope: { test: id }, since: first.seq });
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
