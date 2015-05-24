(function() {
    module('Integration.Events.createModel', {
        setup: function () { Test.Integration.executeEvents(Test.Integration.testEventsUntil('createModel'), 'Events/basic'); },
        teardown: Test.Integration.teardown
    });

    test("model is created and attached to pane object", function () {
        ok(Test.state.model);
        ok(Test.state.pane.model);
        equal(Test.state.model, Test.state.pane.model);
    });

})();