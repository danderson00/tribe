(function() {
    module('Unit.Utilities.nodes', {
        setup: function () {
            T.Events.spy = sinon.spy();
            T.options.events = ['spy'];
        }
    });

    test("createNode executes events specified in options with new node", function () {
        T.createNode('#qunit-fixture');
        ok(T.Events.spy.calledOnce);
        ok(pane());
    });

    test("appendNode appends wrapper to target element", function() {
        T.appendNode('#qunit-fixture');
        equal($('#qunit-fixture div').length, 1);
    });

    function pane() {
        return T.Events.spy.firstCall.args[0];
    }
})();
