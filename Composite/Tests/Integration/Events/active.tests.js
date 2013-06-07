(function() {
    module('Integration.Events.active', {
        setup: function() { TC.Events.spy = sinon.spy(); }
    });

    var events = Test.Integration.testEventsUntil('active');

    test("event ends when pane element is removed from DOM", function () {
        Test.Integration.executeEvents(events, 'Events/basic');
        ok(TC.Events.spy.notCalled);
        $('.basic').parent().remove();
        ok(TC.Events.spy.called);
        equal(TC.Events.spy.firstCall.args[0].path, '/Events/basic');
    });

    test("child events end when parent pane element is removed from DOM", function () {
        Test.Integration.executeEvents(events, 'Events/basicParent');
        ok(TC.Events.spy.notCalled);
        $('.basicContainer').parent().remove();
        ok(TC.Events.spy.calledTwice);
        equal(TC.Events.spy.firstCall.args[0].path, '/Events/basicParent');
        equal(TC.Events.spy.secondCall.args[0].path, '/Events/basic');
    });
})();