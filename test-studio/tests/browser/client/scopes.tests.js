suite('tribe.client.scopes', function () {
    var scopes = require('tribe/client/scopes'),
        hub = require('tribe/client/hub'),
        eventStore = require('tribe/client/eventStore'),
        pubsub = require('tribe.pubsub'),
        uuid = require('node-uuid').v4,
        Q = require('q');

    test("messages are retrieved from server store and persisted locally", function () {
        var id = uuid();

        return scopes.request({ test: id })
            .then(function (messages) {
                expect(messages.length).to.equal(0);
                return hub.publish({ topic: 'topic', data: { test: id } });
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
        var id = uuid();

        return scopes.request({ test: id })
            .then(function (messages) {
                pubsub.publish('topic', { test: id });
                return delay(100);
            })
            .then(function () {
                return eventStore.retrieve({ test: id });
            })
            .then(function (messages) {
                expect(messages.length).to.equal(1);
            });
    });

    test("messages are retrieved from local store", function () {
        var id = uuid();

        return eventStore.store({ topic: 'topic', data: { test: id } })
            .then(function () {
                //return scopes.request({ test: id });
                return eventStore.retrieve({ test: id });
            })
            .then(function (messages) {
                expect(messages.length).to.equal(1);
            });
    });

    function delay(ms) {
        return function () {
            var promise = Q.defer();
            setTimeout(promise.resolve, ms);
            return promise.promise;
        }
    }
});
