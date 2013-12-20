(function() {
    var pubsub;
    var channel;

    module('Channel', {
        setup: function() {
            pubsub = new Tribe.PubSub({ sync: true });
            channel = pubsub.channel('channel');
        }
    });

    test("Channel publishes messages with channelId set", function () {
        var spy = sinon.spy();
        pubsub.subscribe('*', spy);
        channel.publish('topic');
        ok(spy.calledOnce);
        equal(spy.firstCall.args[1].channelId, 'channel');
    });

    test("Channel only subscribes to messages with correct channelId set", function() {
        var spy = sinon.spy();
        channel.subscribe('topic', spy);
        pubsub.publish({ topic: 'topic' });
        pubsub.publish({ topic: 'topic', channelId: 'other' });
        equal(spy.callCount, 0);
        pubsub.publish({ topic: 'topic', channelId: 'channel' });
        equal(spy.callCount, 1);
        channel.publish({ topic: 'topic' });
        equal(spy.callCount, 2);
    });

    test("Channel unsubscribe works as expected", function() {
        var spy = sinon.spy();
        var token = channel.subscribe('topic', spy);
        channel.publish({ topic: 'topic' });
        equal(spy.callCount, 1);
        channel.unsubscribe(token);
        channel.publish({ topic: 'topic' });
        equal(spy.callCount, 1);
    });

    //test("", function () {
    //});

    //test("", function () {
    //});

    //test("", function () {
    //});
})();