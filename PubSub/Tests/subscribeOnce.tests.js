﻿(function () {
    var pubsub;

    module('subscribeOnce', {
        setup: function () { pubsub = new Tribe.PubSub(); }
    });

    // add some subscribers around the subscribeOnce to ensure it is unsubscribed correctly.
    test('subscribeOnce publishes message to single subscriber only once', function () {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();
        var spy3 = sinon.spy();

        pubsub.subscribe('test', spy1);
        pubsub.subscribeOnce('test', spy2);
        pubsub.subscribe('test', spy3);
        pubsub.publishSync('test');
        pubsub.publishSync('test');
        ok(spy1.calledTwice);
        ok(spy2.calledOnce);
        ok(spy3.calledTwice);
    });

    test("subscribeOnce publishes message to map of subscribers only once", function () {
        var spy = sinon.spy();
        pubsub.subscribeOnce({ 'test1': spy, 'test2': spy });
        pubsub.publishSync('test1');
        pubsub.publishSync('test1');
        pubsub.publishSync('test2');
        ok(spy.calledOnce);
    });

    test("subscribeOnce publishes message to array of subscribers only once", function () {
        var spy = sinon.spy();
        pubsub.subscribeOnce([ 'test1', 'test2'], spy);
        pubsub.publishSync('test1');
        pubsub.publishSync('test1');
        pubsub.publishSync('test2');
        ok(spy.calledOnce);
    });

    test("subscribeOnce functions correctly in a lifetime", function () {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();
        var spy3 = sinon.spy();

        pubsub.subscribe('test', spy1);
        var lifetime = pubsub.createLifetime();
        lifetime.subscribeOnce('test', spy2);
        lifetime.subscribe('test', spy3);
        
        pubsub.publishSync('test');
        pubsub.publishSync('test');
        lifetime.end();
        pubsub.publishSync('test');
        
        ok(spy1.calledThrice);
        ok(spy2.calledOnce);
        ok(spy3.calledTwice);
    });
})();
