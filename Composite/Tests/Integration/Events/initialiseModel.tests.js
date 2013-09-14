(function() {
    module('Integration.Events.initialiseModel', { teardown: Test.Integration.teardown });

    test("initialise function is called on model", function () {
        Test.Integration.executeEvents(Test.Integration.testEventsUntil('initialiseModel'), 'Events/basic');
        equal(Test.state.model.message, 'test message');
    });

    test("returning deferred from initialise makes pipeline wait", function () {
        Test.Integration.executeEvents(Test.Integration.testEventsUntil('initialiseModel'), 'Events/initialise');
        ok(TC.Events.spy.notCalled);
        Test.state.deferred.resolve();
        ok(TC.Events.spy.calledOnce);
    });

    test("rejecting deferred returned from initialise halts pipeline", function () {
        Test.Integration.executeEvents(Test.Integration.testEventsUntil('initialiseModel'), 'Events/initialise');
        Test.state.deferred.reject();
        ok(TC.Events.spy.notCalled);
    });
})();