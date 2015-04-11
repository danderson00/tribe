suite('tribe.client.scopes', function () {
    var eventStore, scopes, hub;

    setup(function () {
        require.refreshAll();
        eventStore = require('tribe/client/eventStore');
        eventStore.type = 'memory';
        hub = require.stub('./hub', {
            publish: sinon.spy(),
            scope: sinon.spy()
        });
        scopes = require('tribe/client/scopes');
    });

    teardown(function () {
        eventStore.close();
    });

    test("request returns messages stored locally", function () {
        return eventStore.store({ data: { id: 1 }})
            .then(function () {
                return scopes.request({ id: 1 });
            })
            .then(function (messages) {
                expect(messages.length).to.equal(1);
            });
    });

    // test("request retrieves messages from server on first request", function () {
    //
    // });
    //
    // test("request does not retrieve messages from server on second request", function () {
    //
    // });
    //
    // test("request publishes subsequent messages to server", function () {
    //
    // });
    //
    // test("messages are not published to server after release", function () {
    //
    // });
    //
    // test("messages are only published to server once after multiple requests", function () {
    //
    // });
});
