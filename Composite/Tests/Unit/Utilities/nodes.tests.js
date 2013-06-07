(function() {
    module('Unit.Utilities.nodes', {
        setup: function () {
            TC.Events.spy = sinon.spy();
            TC.options.events = ['spy'];
        }
    });

    test("createNode executes events specified in options with new node", function () {
        TC.createNode('#qunit-fixture');
        ok(TC.Events.spy.calledOnce);
        ok(pane());
    });

    test("appendNode appends wrapper to target element", function() {
        TC.appendNode('#qunit-fixture');
        equal($('#qunit-fixture div').length, 1);
    });

    function pane() {
        return TC.Events.spy.firstCall.args[0];
    }
})();
