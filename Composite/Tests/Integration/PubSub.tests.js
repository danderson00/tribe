module('Integration.PubSub', {
    setup: function () {
        Test.Integration.pubsubAsTribe();
        Test.Integration.createTestElement();
    } 
});

test("subscription in pane is executed", function() {
    TC.createNode('.test', { path: 'PubSub/subscriber' });
    Test.Integration.context.pubsub.publish('test', 'message');
    equal($('.subscriber').text(), 'message');
});

test("subscription is removed when pane is removed from DOM", function () {
    TC.createNode('.test', { path: 'PubSub/subscriber' });
    equal(Test.Integration.context.pubsub.subscribers.get('test').length, 1);
    $('.test').remove();
    equal(Test.Integration.context.pubsub.subscribers.get('test').length, 0);
});