(function () {
    var pubsub;

    module('core.unsubscribe', {
        setup: function () { pubsub = new Tribe.PubSub(); }
    });

    test("unsubscribe method should return token when successful", function () {
        var token = pubsub.subscribe("0");
        var result = pubsub.unsubscribe(token);
        equal(result, token);
    });

    test("unsubscribe method should return false when unsuccesful", function () {
        var result = pubsub.unsubscribe("0");
        equal(result, false);

        // now let's try unsubscribing the same method twice
        var token = pubsub.subscribe("0");
        pubsub.unsubscribe(token);
        equal(pubsub.unsubscribe(token), false);
    });

    test('passing array of tokens to unsubscribe correctly unsubscribes messages', function () {
        var spy1 = sinon.spy(), spy2 = sinon.spy();
        var tokens = pubsub.subscribe({
            'test': spy1,
            'test2': spy2
        });
        pubsub.unsubscribe(tokens);

        pubsub.publishSync('test');
        ok(!spy1.called, "First subscription successful");

        pubsub.publishSync('test2');
        ok(!spy2.called, "Second subscription successful");
    });
})();
