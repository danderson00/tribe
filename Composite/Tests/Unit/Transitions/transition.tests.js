(function () {
    var pane, node;
    
    module('Unit.transition', {
        setup: function () {
            Test.Integration.createTestElement();
            TC.Transitions.test = { 'in': sinon.spy(), out: sinon.spy(), reverse: 'test2' };
            TC.Transitions.test2 = { 'in': sinon.spy(), out: sinon.spy(), reverse: 'test' };
            pane = new TC.Types.Pane({ transition: 'test', element: '.test' });
            node = new TC.Types.Node(null, pane);
        }
    });

    test("transition executes specified in transition against given element", function () {
        TC.transition('.test', 'test')['in']();
        equal(TC.Transitions.test['in'].firstCall.args[0], '.test');
    });

    test("transition executes specified out transition against given element", function () {
        TC.transition('.test', 'test').out();
        equal(TC.Transitions.test.out.firstCall.args[0], '.test');
    });

    test("transition gets target element and transition from node", function () {
        TC.transition(node)['in']();
        equal(TC.Transitions.test['in'].firstCall.args[0], '.test');
    });

    test("transition gets target element and transition from pane", function () {
        TC.transition(pane)['in']();
        equal(TC.Transitions.test['in'].firstCall.args[0], '.test');
    });

    test("specifying transition as argument overrides pane transition", function() {
        TC.Transitions.test2 = { 'in': sinon.spy(), out: sinon.spy() };
        TC.transition(pane, 'test2')['in']();
        ok(TC.Transitions.test['in'].notCalled);
        ok(TC.Transitions.test2['in'].calledOnce);
    });

    test("transitioning out removes element by default", function () {
        TC.transition('.test').out();
        equal($('.test').length, 0);
    });

    test("transitioning out hides element if specified", function () {
        TC.transition('.test').out(false);
        equal($('.test').length, 1);
    });

    test("reverse transition is executed when specified", function() {
        TC.transition('.test', 'test', true)['in']();
        equal(TC.Transitions.test2['in'].firstCall.args[0], '.test');

    });
})();
