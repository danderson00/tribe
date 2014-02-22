module('Integration.Navigate', {
    setup: Test.Integration.createTestElement,
    teardown: Test.Integration.teardown
});

test("navigating child pane transitions node marked with handlesNavigation", function () {
    T.createNode('.test', { path: 'Navigate/layout' });
    T.nodeFor('.child1').navigate('content2');
    equal($('.child2').length, 1);
    equal($('.content1').length, 0);
});

test("navigating root pane transitions node marked with handlesNavigation", function () {
    T.createNode('.test', { path: 'Navigate/layout' });
    T.nodeFor('.layout').navigate('content2');
    equal($('.layout').length, 1);
    equal($('.child2').length, 1);
    equal($('.content1').length, 0);
});

test("navigating back returns to previous pane", function() {
    T.createNode('.test', { path: 'Navigate/layout' });
    var node = T.nodeFor('.layout');
    node.navigate('content2');
    equal($('.content1').length, 0);
    node.navigateBack();
    equal($('.content1').length, 1);
});