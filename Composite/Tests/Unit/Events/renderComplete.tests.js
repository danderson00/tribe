(function () {
    var pane, context;
    
    module("Unit.Events.renderComplete", {
        setup: function() {
            pane = new TC.Types.Pane({ element: '#qunit-fixture', transition: 'test' });
            pane.model = { renderComplete: sinon.spy() };
            context = Test.Unit.context();
            TC.Transitions.test = { 'in': sinon.spy() };
        }
    });

    test("renderComplete calls transition.in with pane element", function () {
        TC.Events.renderComplete(pane, context);
        ok(TC.Transitions.test['in'].calledOnce);
        equal(TC.Transitions.test['in'].firstCall.args[0], pane.element);
    });

    test("renderComplete calls renderComplete on pane model", function () {
        TC.Events.renderComplete(pane, context);
        ok(pane.model.renderComplete.calledOnce);
    });

    test("renderComplete resolves is.rendered on pane model", function () {
        equal(pane.is.rendered.state(), 'pending');
        TC.Events.renderComplete(pane, context);
        equal(pane.is.rendered.state(), 'resolved');
    });

    test("renderComplete raises renderComplete event on document, passing pane as data", function () {
        var spy = sinon.spy();
        TC.Utils.handleDocumentEvent("renderComplete", spy);
        TC.Events.renderComplete(pane, context);
        ok(spy.calledOnce);
        equal(spy.firstCall.args[0].eventData, pane);
        TC.Utils.detachDocumentEvent("renderComplete", spy);
    });
})();