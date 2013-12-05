(function() {
    var hub;
    var pubsub;
    var publisher;

    module('Publisher', {
        setup: function () {
            mockSignalR();
            pubsub = mockPubSub();
            publisher = new Tribe.SignalR.Publisher($.connection.hubImplementation);
        }
    });

    test("message is not published if not connected", function() {
        $.connection.hubImplementation.connection.state = 0;
        publisher.publishToServer('', {});
        ok($.connection.hubImplementation.server.publish.notCalled);
    });
    
    test("queued messages are published when reconnected", function () {
        $.connection.hubImplementation.connection.state = 0;
        publisher.publishToServer('', {});
        publisher.publishToServer('', {});
        ok($.connection.hubImplementation.server.publish.notCalled);
        executeStateChanged(1);
        ok($.connection.hubImplementation.server.publish.calledTwice);
    });

    test("publishToServer ignores server messages", function () {
        publisher.publishToServer('', { server: true });
        ok($.connection.hubImplementation.server.publish.notCalled);
    });


    function executeStateChanged(newState) {
        $.connection.hubImplementation.connection.state = newState;
        var handler = $.connection.hubImplementation.connection.stateChanged.firstCall.args[0];
        return handler({ newState: newState });
    }
})();