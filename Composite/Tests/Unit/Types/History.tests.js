//(function () {
//    var history;
//    var pushState;
//    var replaceState;

//    module('Unit.Types.History', {
//        setup: function () {
//            pushState = sinon.spy();
//            replaceState = sinon.spy();
//            history = new TC.Types.History({ pushState: pushState, replaceState: replaceState });
//        },
//        teardown: function () { history.dispose(); }
//    });

//    test("registering a node creates a stack and loads initial state", function () {
//        var node = nodeStub('test');
//        history.registerNode(node);
//        equal(stackOptions(node, 0).path, 'test');
//    });

//    test("navigating a node pushes state on to relevant stack", function() {
//        var node = nodeStub('test');
//        history.registerNode(node);
//        $(document).trigger('navigating', { node: node, options: { path: 'test2' } });
//        equal(stackOptions(node, 1).path, 'test2');
//    });

//    function nodeStub(path) {
//        return {
//            id: 1,
//            pane: { path: path },
//            transitionTo: sinon.spy()
//        };
//    }
    
//    function stackOptions(node, index) {
//        return JSON.parse(history.stacks[node.id][index].options);
//    }
//})();
