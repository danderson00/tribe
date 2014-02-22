module('Integration.Paths', {
    setup: Test.Integration.createTestElement,
    teardown: Test.Integration.teardown
});

test("panes created with skipPath true inherit pane path from their parent", function() {
    T.createNode('.test', { path: 'Paths/Subfolder/parent' });
    equal($('.parent').length, 1);
    equal($('.parent').children().length, 1);
    equal($('.parent .child').length, 1);
});