(function () {
    var pubsub;

    module('core.subscribe', {
        setup: function () { pubsub = new Tribe.PubSub(); }
    });

    test("subscribe method should return different tokens", function () {
        var token1 = pubsub.subscribe("0", function () { });
        var token2 = pubsub.subscribe("1", function () { });
        notEqual(token1, token2);
    });

    test('passing map of handlers to subscribe returns correct number of string tokens', function () {
        var tokens = pubsub.subscribe({
            'test': function () { },
            'test2': function () { }
        });
        equal(tokens.length, 2, 'Return type has correct length');
        ok(tokens[0].constructor === String);
        ok(tokens[1].constructor === String);
    });

    test('passing map of handlers to subscribe correctly subscribes messages', function () {
        var spy1 = sinon.spy(), spy2 = sinon.spy();
        pubsub.subscribe({
            'test': spy1,
            'test2': spy2
        });

        pubsub.publishSync('test');
        ok(spy1.called, "First subscription successful");

        pubsub.publishSync('test2');
        ok(spy2.called, "Second subscription successful");
    });

    test('passing array of handlers to subscribe returns correct number of string tokens', function () {
        var tokens = pubsub.subscribe(['test', 'test2'], function () { });
        equal(tokens.length, 2, 'Return type has correct length');
        ok(tokens[0].constructor === String);
        ok(tokens[1].constructor === String);
    });

    test('passing array of handlers to subscribe correctly subscribes messages', function () {
        var spy = sinon.spy();
        pubsub.subscribe(['test', 'test2'], spy);

        pubsub.publishSync('test');
        pubsub.publishSync('test2');
        ok(spy.calledTwice, "Both subscriptions triggered");
    });
})();
