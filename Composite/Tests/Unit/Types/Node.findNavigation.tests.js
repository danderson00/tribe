(function () {
    module('Unit.Types.Node');

    test("node creates Navigation if handlesNavigation is set on pane", function() {
        var node = new T.Types.Node(null, pane('test', true));
        ok(node.navigation);
    });

    test("findNavigation returns Navigation for root node if no pane handles navigation", function() {
        var leaf = createTree();
        equal(leaf.findNavigation().node, leaf.root);
        equal(leaf.parent.findNavigation().node, leaf.root);
        equal(leaf.root.findNavigation().node, leaf.root);
    });

    test("findNavigation returns Navigation for root node if specified", function () {
        var leaf = createTree('root');
        equal(leaf.findNavigation().node, leaf.root);
        equal(leaf.parent.findNavigation().node, leaf.root);
        equal(leaf.root.findNavigation().node, leaf.root);
    });

    test("findNavigation returns Navigation for middle node if specified", function () {
        var leaf = createTree('middle');
        equal(leaf.findNavigation().node, leaf.parent);
        equal(leaf.parent.findNavigation().node, leaf.parent);
        equal(leaf.root.findNavigation().node, leaf.parent);
    });

    test("findNavigation returns Navigation for leaf node if specified", function () {
        var leaf = createTree('leaf');
        equal(leaf.findNavigation().node, leaf);
        equal(leaf.parent.findNavigation().node, leaf);
        equal(leaf.root.findNavigation().node, leaf);
    });

    test("findNavigation returns Navigation for root node if handling node disposed", function () {
        var leaf = createTree('leaf');
        var middle = leaf.parent;
        leaf.dispose();
        equal(middle.findNavigation().node, middle.root);
        equal(leaf.parent.findNavigation().node, middle.root);
    });
    
    function pane(path, handlesNavigation) {
        return new T.Types.Pane({ path: path, handlesNavigation: handlesNavigation });
    }

    function createTree(navigationNode) {
        var root = new T.Types.Node(null, pane('root', navigationNode === 'root'));
        var middle = new T.Types.Node(root, pane('middle', navigationNode === 'middle'));
        var leaf = new T.Types.Node(middle, pane('leaf', navigationNode === 'leaf'));
        return leaf;
    }
})();