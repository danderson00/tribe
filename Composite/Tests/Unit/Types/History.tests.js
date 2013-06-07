(function () {
    var history;
    var pushState;
    var replaceState;

    module('Unit.Types.History', {
        setup: function () {
            pushState = sinon.spy();
            replaceState = sinon.spy();
            history = new TC.Types.History({ pushState: pushState, replaceState: replaceState });
        },
        teardown: function () { history.dispose(); }
    });

    test("History pushes state onto stack when navigating event raised", function () {
        $(document).trigger('navigating', { options: 'test' });
        ok(pushState.calledOnce);
        equal(pushState.firstCall.args[0].options, '\"test\"');
        equal(pushState.firstCall.args[0].id, 0);
    });

    test("History transitions last node when popstate event raised", function () {
        var node = { transitionTo: sinon.spy(), pane: {} };
        $(document).trigger('navigating', { options: 'test', node: node });
        Test.raiseDocumentEvent('popstate', { state: { id: 0, options: '\"test2\"' } });
        ok(node.transitionTo.calledOnce);
        equal(node.transitionTo.firstCall.args[0], 'test2');
    });
})();
