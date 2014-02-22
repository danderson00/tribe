(function () {
    var pane, context;
    
    module("Unit.Events.renderComplete", {
        setup: function() {
            pane = new T.Types.Pane({ element: '#qunit-fixture', transition: 'test' });
            pane.model = { renderComplete: sinon.spy() };
            context = Test.Unit.context();
            T.Transitions.test = { 'in': sinon.spy() };
        }
    });

    test("renderComplete calls transition.in with pane element", function () {
        T.Events.renderComplete(pane, context);
        ok(T.Transitions.test['in'].calledOnce);
        equal(T.Transitions.test['in'].firstCall.args[0], pane.element);
    });

    test("renderComplete calls renderComplete on pane model", function () {
        T.Events.renderComplete(pane, context);
        ok(pane.model.renderComplete.calledOnce);
    });

    test("renderComplete resolves is.rendered on pane model", function () {
        equal(pane.is.rendered.state(), 'pending');
        T.Events.renderComplete(pane, context);
        equal(pane.is.rendered.state(), 'resolved');
    });

    test("renderComplete raises renderComplete event on document, passing pane as data", function () {
        var spy = sinon.spy();
        T.Utils.handleDocumentEvent("renderComplete", spy);
        T.Events.renderComplete(pane, context);
        ok(spy.calledOnce);
        equal(spy.firstCall.args[0].eventData, pane);
        T.Utils.detachDocumentEvent("renderComplete", spy);
    });
})();