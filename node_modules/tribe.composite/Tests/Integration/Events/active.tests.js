(function() {
    module('Integration.Events.active', {
        setup: function () { T.Events.spy = sinon.spy(); },
        teardown: Test.Integration.teardown
    });

    var events = Test.Integration.testEventsUntil('active');

    test("event ends when pane element is removed from DOM", function () {
        Test.Integration.executeEvents(events, 'Events/basic');
        ok(T.Events.spy.notCalled);
        $('.basic').parent().remove();
        ok(T.Events.spy.called);
        equal(T.Events.spy.firstCall.args[0].path, '/Events/basic');
    });

    test("child events end when parent pane element is removed from DOM", function () {
        Test.Integration.executeEvents(events, 'Events/basicParent');
        ok(T.Events.spy.notCalled);
        $('.basicContainer').parent().remove();
        ok(T.Events.spy.calledTwice);
        equal(T.Events.spy.firstCall.args[0].path, '/Events/basicParent');
        equal(T.Events.spy.secondCall.args[0].path, '/Events/basic');
    });
})();