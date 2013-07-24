(function () {
    module('Unit.Types.Node');

    function pane(path, handlesNavigation) {
        return new TC.Types.Pane({ path: path, handlesNavigation: handlesNavigation });
    }

    test("setPane makes path absolute and sets pane path from pane if no parent", function() {
        var node = new TC.Types.Node(null, pane('test'));
        equal(node.pane.path, '/test');
    });

    test("setPane sets pane path from parent and relative pane path", function () {
        var parent = new TC.Types.Node(null, pane('/path/parent'));
        var node = new TC.Types.Node(parent, pane('child'));
        equal(node.pane.path, '/path/child');
    });

    test("setPane sets pane path from pane if path is absolute", function () {
        var parent = new TC.Types.Node(null, pane('/path/parent'));
        var node = new TC.Types.Node(parent, pane('/root'));
        equal(node.pane.path, '/root');
    });

    test("setPane unsets node on existing pane", function () {
        var existingPane = pane('test');
        var node = new TC.Types.Node(null, existingPane);
        node.setPane(new TC.Types.Pane(pane('test2')));
        equal(existingPane.node, null);
    });

    test("setPane sets node.navigation when pane.handlesNavigation", function() {
        var node = new TC.Types.Node();
        node.setPane(pane('', 'test'));
        ok(node.navigation.constructor, TC.Types.Navigation);
    });

    test("node root is set correctly", function() {
        var one = new TC.Types.Node(null, pane('one'));
        var two = new TC.Types.Node(one, pane('two'));
        var three = new TC.Types.Node(two, pane('three'));

        equal(one.root, one);
        equal(two.root, one);
        equal(three.root, one);
    });

    test("dispose removes node from parent collection", function() {
        var parent = new TC.Types.Node(null, pane('parent'));
        var child = new TC.Types.Node(parent, pane('child'));
        equal(parent.children.length, 1);
        child.dispose();
        equal(parent.children.length, 0);
    });

    test("navigate inherits path from existing pane", function () {
        var node = new TC.Types.Node(null, pane('/path/node1'));
        node.transitionTo = sinon.spy();
        node.navigate('node2');
        ok(node.transitionTo.calledOnce);
        equal(node.transitionTo.firstCall.args[0].path, '/path/node2');
    });

    test("nodeForPath returns current node if skipPath is not specified", function() {
        var node1 = new TC.Types.Node(null, pane('/path1/node1'));
        var node2 = new TC.Types.Node(node1, pane('/path2/node2'));
        equal(node2.nodeForPath(), node2);
    });

    test("nodeForPath returns parent if skipPath is specified", function() {
        var node1 = new TC.Types.Node(null, pane('/path1/node1'));
        var node2 = new TC.Types.Node(node1, pane('/path2/node2'));
        node2.skipPath = true;
        equal(node2.nodeForPath(), node1);
    });

    test("nodeForPath recurses, skipping nodes as specified", function () {
        var node1 = new TC.Types.Node(null, pane('/path1/node1'));
        var node2 = new TC.Types.Node(node1, pane('/path2/node2'));
        var node3 = new TC.Types.Node(node2, pane('/path2/node2'));
        node2.skipPath = true;
        node3.skipPath = true;
        equal(node3.nodeForPath(), node1);
    });
})();