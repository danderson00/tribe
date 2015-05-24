suite('tribe.pubsub.channel', function() {
    var pubsubModule = require('../pubsub'),
        pubsub, channel;

    setup(function() {
        pubsub = new pubsubModule({ sync: true });
        channel = pubsub.channel('channel');
    });

    test("channel publishes messages with channelId set", function () {
        var spy = sinon.spy();
        pubsub.subscribe('*', spy);
        channel.publish('topic');
        assert.ok(spy.calledOnce);
        assert.equal(spy.firstCall.args[1].channelId, 'channel');
    });

    test("channel only subscribes to messages with correct channelId set", function() {
        var spy = sinon.spy();
        channel.subscribe('topic', spy);
        pubsub.publish({ topic: 'topic' });
        pubsub.publish({ topic: 'topic', channelId: 'other' });
        assert.equal(spy.callCount, 0);
        pubsub.publish({ topic: 'topic', channelId: 'channel' });
        assert.equal(spy.callCount, 1);
        channel.publish({ topic: 'topic' });
        assert.equal(spy.callCount, 2);
    });

    test("channel unsubscribe works as expected", function() {
        var spy = sinon.spy();
        var token = channel.subscribe('topic', spy);
        channel.publish({ topic: 'topic' });
        assert.equal(spy.callCount, 1);
        channel.unsubscribe(token);
        channel.publish({ topic: 'topic' });
        assert.equal(spy.callCount, 1);
    });
});