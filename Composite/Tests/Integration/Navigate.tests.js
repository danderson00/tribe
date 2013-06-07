module('Integration.Navigate', {
    setup: Test.Integration.createTestElement
});

test("navigating child pane transitions node marked with handlesNavigation", function () {
    TC.createNode('.test', { path: 'Navigate/layout' });
    TC.Utils.nodeFor('.child1').navigate('content2');
    equal($('.child2').length, 1);
    equal($('.content1').length, 0);
});

test("navigating root pane transitions node marked with handlesNavigation", function () {
    TC.createNode('.test', { path: 'Navigate/layout' });
    TC.Utils.nodeFor('.layout').navigate('content2');
    equal($('.layout').length, 1);
    equal($('.child2').length, 1);
    equal($('.content1').length, 0);
});

test("document navigating event is raised once", function () {
    expect(2);
    $(document).on('navigating', function(e, data) {
        equal(data.options.path, '/Navigate/content2');
        equal(data.options.data, 'test');
    });
    TC.createNode('.test', { path: 'Navigate/layout' });
    TC.Utils.nodeFor('.content1').navigate({ path: 'content2', data: 'test' });
    $(document).off('navigating');
});