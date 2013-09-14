(function () {
    var root;

    module('Integration.Tree', {
        setup: function() {
             Test.Integration.executeDefaultEvents('Tree/1');
             root = Test.state.pane.node.root;
        }, teardown: Test.Integration.teardown
    });

    test("tree renders", function () {
        equal($('.111').length, 1);
    });

    test("node is created and attached to pane", function () {
        ok(Test.state.pane.node);
        equal(Test.state.pane.path, '/Tree/1');
    });

    test("node is part of full node tree", function () {
        equal(root.children.length, 1);
        equal(root.children[0].children.length, 2);
        equal(root.children[0].children[1].pane.path, '/Tree/112');
    });

    test("node is removed from tree when pane element is remove from DOM", function () {
        equal(root.children[0].children.length, 2);
        $('.111').parent().remove();
        equal(root.children[0].children.length, 1);
    });

    test("pane changes when node is transitioned", function () {
        TC.transition(TC.nodeFor('.11')).to('12');
        equal(root.children[0].pane.path, '/Tree/12');
    });

    test("child nodes are removed when transitioned", function () {
        TC.transition(TC.nodeFor('.11')).to('12');
        equal(root.children[0].children.length, 0);
    });

    test("node is not replaced when transitioned", function() {
        var node = root.children[0];
        TC.transition(TC.nodeFor('.11')).to('12');
        equal(root.children[0], node);
    });

    test("node is replaced when element is transitioned", function() {
        var node = root.children[0];
        TC.transition($('.11').parent()).to('/Tree/12');
        equal(root.children.length, 1);
        notEqual(root.children[0], node);
        equal(root.children[0].pane.path, '/Tree/12');
    });
})();
