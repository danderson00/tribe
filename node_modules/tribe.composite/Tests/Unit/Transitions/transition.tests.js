(function () {
    var pane, node;
    
    module('Unit.transition', {
        setup: function () {
            Test.Integration.createTestElement();
            T.Transitions.test = { 'in': sinon.spy(), out: sinon.spy(), reverse: 'test2' };
            T.Transitions.test2 = { 'in': sinon.spy(), out: sinon.spy(), reverse: 'test' };
            pane = new T.Types.Pane({ transition: 'test', element: '.test' });
            node = new T.Types.Node(null, pane);
        }
    });

    test("transition executes specified in transition against given element", function () {
        T.transition('.test', 'test')['in']();
        equal(T.Transitions.test['in'].firstCall.args[0], '.test');
    });

    test("transition executes specified out transition against given element", function () {
        T.transition('.test', 'test').out();
        equal(T.Transitions.test.out.firstCall.args[0], '.test');
    });

    test("transition gets target element and transition from node", function () {
        T.transition(node)['in']();
        equal(T.Transitions.test['in'].firstCall.args[0], '.test');
    });

    test("transition gets target element and transition from pane", function () {
        T.transition(pane)['in']();
        equal(T.Transitions.test['in'].firstCall.args[0], '.test');
    });

    test("specifying transition as argument overrides pane transition", function() {
        T.Transitions.test2 = { 'in': sinon.spy(), out: sinon.spy() };
        T.transition(pane, 'test2')['in']();
        ok(T.Transitions.test['in'].notCalled);
        ok(T.Transitions.test2['in'].calledOnce);
    });

    test("transitioning out removes element by default", function () {
        T.transition('.test').out();
        equal($('.test').length, 0);
    });

    test("transitioning out hides element if specified", function () {
        T.transition('.test').out(false);
        equal($('.test').length, 1);
    });

    test("reverse transition is executed when specified", function() {
        T.transition('.test', 'test', true)['in']();
        equal(T.Transitions.test2['in'].firstCall.args[0], '.test');

    });
})();
