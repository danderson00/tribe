module('Integration.Navigate', {
    setup: Test.Integration.createTestElement
});

test("navigating child pane transitions node marked with handlesNavigation", function () {
    TC.createNode('.test', { path: 'Navigate/layout' });
    TC.nodeFor('.child1').navigate('content2');
    equal($('.child2').length, 1);
    equal($('.content1').length, 0);
});

test("navigating root pane transitions node marked with handlesNavigation", function () {
    TC.createNode('.test', { path: 'Navigate/layout' });
    TC.nodeFor('.layout').navigate('content2');
    equal($('.layout').length, 1);
    equal($('.child2').length, 1);
    equal($('.content1').length, 0);
});

test("navigating back returns to previous pane", function() {
    TC.createNode('.test', { path: 'Navigate/layout' });
    var node = TC.nodeFor('.layout');
    node.navigate('content2');
    equal($('.content1').length, 0);
    node.navigateBack();
    equal($('.content1').length, 1);
});