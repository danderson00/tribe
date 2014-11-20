suite('tribe.pubsub.subscribe', function () {
    var pubsubModule = require('../pubsub'),
        pubsub;

    setup(function () {
        pubsub = new pubsubModule();
    });

    test("subscribe method should return different tokens", function () {
        var token1 = pubsub.subscribe("0", function () { });
        var token2 = pubsub.subscribe("1", function () { });
        assert.notEqual(token1, token2);
    });

    test('passing map of handlers to subscribe returns correct number of string tokens', function () {
        var tokens = pubsub.subscribe({
            'test': function () { },
            'test2': function () { }
        });
        assert.equal(tokens.length, 2, 'Return type has correct length');
        assert.ok(tokens[0].constructor === String);
        assert.ok(tokens[1].constructor === String);
    });

    test('passing map of handlers to subscribe correctly subscribes messages', function () {
        var spy1 = sinon.spy(), spy2 = sinon.spy();
        pubsub.subscribe({
            'test': spy1,
            'test2': spy2
        });

        pubsub.publishSync('test');
        assert.ok(spy1.called, "First subscription successful");

        pubsub.publishSync('test2');
        assert.ok(spy2.called, "Second subscription successful");
    });

    test('passing array of handlers to subscribe returns correct number of string tokens', function () {
        var tokens = pubsub.subscribe(['test', 'test2'], function () { });
        assert.equal(tokens.length, 2, 'Return type has correct length');
        assert.ok(tokens[0].constructor === String);
        assert.ok(tokens[1].constructor === String);
    });

    test('passing array of handlers to subscribe correctly subscribes messages', function () {
        var spy = sinon.spy();
        pubsub.subscribe(['test', 'test2'], spy);

        pubsub.publishSync('test');
        pubsub.publishSync('test2');
        assert.ok(spy.calledTwice, "Both subscriptions triggered");
    });

    test('subscribe.to with expression filter only executes handlers when property matches', function () {
        var spy = sinon.spy();
        pubsub.subscribe.to('test').when('data.property').equals('test').execute(spy);

        pubsub.publishSync('test', { property: 'test' });
        assert.equal(spy.callCount, 1);
        pubsub.publishSync('test', { property: 'test2' });
        assert.equal(spy.callCount, 1);
    });

    test('subscribe supports multiple expressions', function () {
        var spy1 = sinon.spy(), spy2 = sinon.spy(), spy3 = sinon.spy(), spy4 = sinon.spy();
        pubsub.subscribe('test', spy1);
        pubsub.subscribe('test', spy2, { p: 'data.p1', v: 1 });
        pubsub.subscribe('test', spy3, [{ p: 'data.p1', v: 1 }, { p: 'data.p2', v: 1 }]);
        pubsub.subscribe('test', spy4, [{ p: 'data.p1', v: 1 }, { p: 'data.p2', v: 2 }]);

        pubsub.publishSync('test', { p1: 1 });
        pubsub.publishSync('test', { p1: 1, p2: 1 });
        pubsub.publishSync('test', { p1: 1, p2: 2 });
        assert.equal(spy1.callCount, 3);
        assert.equal(spy2.callCount, 3);
        assert.equal(spy3.callCount, 1);
        assert.equal(spy4.callCount, 1);

    });
});
