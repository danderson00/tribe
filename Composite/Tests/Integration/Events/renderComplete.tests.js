(function() {
    module('Integration.Events.renderComplete');

    var events = Test.Integration.testEventsUntil('renderComplete');

    test("renderComplete is called on model when single pane has rendered", function () {
        Test.Integration.executeEvents(events, 'Events/basic');
        ok(Test.state.model.renderCompleteCalled);
    });

    test("renderComplete is called on model when all panes in tree have rendered", function () {
        Test.Integration.executeEvents(events, 'Events/initialiseParent');
        ok(!Test.state.parentRenderCompleteCalled);
        Test.state.deferred.resolve();
        ok(Test.state.parentRenderCompleteCalled);
    });
    
    asyncTest("renderComplete is called on single model when in async mode", function () {
        expect(1);
        TC.options.synchronous = false;
        Test.state.renderComplete = function () {
            equal($('.message').text(), 'test message');
            start();
        };
        Test.Integration.executeEvents(events, 'Events/async');
    });

    asyncTest("renderComplete is called on all models when in async mode", function () {
        expect(1);
        TC.options.synchronous = false;
        Test.state.renderComplete = function () {
            equal($('.message').text(), 'test message');
            start();
        };
        Test.Integration.executeEvents(events, 'Events/asyncParent');
    });
})();