module('Integration.PubSub', {
    setup: function () {
        Test.Integration.pubsubAsTribe();
        Test.Integration.createTestElement();
    }, teardown: Test.Integration.teardown
});

test("subscription in pane is executed", function() {
    T.createNode('.test', { path: 'PubSub/subscriber' });
    Test.Integration.context.pubsub.publish('test', 'message');
    equal($('.subscriber').text(), 'message');
});

test("subscription is removed when pane is removed from DOM", function () {
    T.createNode('.test', { path: 'PubSub/subscriber' });
    equal(Test.Integration.context.pubsub.subscribers.get({ topic: 'test' }).length, 1);
    $('.test').remove();
    equal(Test.Integration.context.pubsub.subscribers.get({ topic: 'test' }).length, 0);
});