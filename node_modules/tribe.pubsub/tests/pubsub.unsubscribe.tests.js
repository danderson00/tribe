suite('tribe.pubsub.unsubscribe', function () {
    var pubsubModule = require('../pubsub'),
        pubsub;

    setup(function () {
        pubsub = new pubsubModule();
    });

    test("unsubscribed methods are no longer invoked", function () {
        var spy = sinon.spy();

        var token = pubsub.subscribe('test', spy);
        pubsub.publishSync('test');
        assert.ok(spy.calledOnce);

        pubsub.unsubscribe(token);
        pubsub.publishSync('test');
        assert.ok(spy.calledOnce);
    });

    test('passing array of tokens to unsubscribe correctly unsubscribes messages', function () {
        var spy1 = sinon.spy(), spy2 = sinon.spy();
        var tokens = pubsub.subscribe({
            'test': spy1,
            'test2': spy2
        });
        pubsub.unsubscribe(tokens);

        pubsub.publishSync('test');
        assert.ok(!spy1.called, "First subscription successful");

        pubsub.publishSync('test2');
        assert.ok(!spy2.called, "Second subscription successful");
    });
});
