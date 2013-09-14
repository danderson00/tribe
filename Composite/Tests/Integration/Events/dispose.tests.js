(function() {
    module('Integration.Events.dispose', { teardown: Test.Integration.teardown });

    var events = Test.Integration.testEventsUntil('dispose');

    test("dispose is called once on model when pane element is removed from DOM using jQuery", function () {
        Test.Integration.executeEvents(events, 'Events/dispose');
        ok(!Test.state.disposeCalled);
        $('.dispose').parent().remove();
        equal(Test.state.disposeCallCount, 1);
    });

    // it seems DOMNodeRemoved sometimes fires asynchronously, this should probably be async - this will probably fail on other browsers
    test("dispose is called once on model when pane element is removed from DOM using native functions", function () {
        Test.Integration.executeEvents(events, 'Events/dispose');
        ok(!Test.state.disposeCalled);
        var element = document.querySelector('.dispose').parentNode;
        element.parentNode.removeChild(element);
        equal(Test.state.disposeCallCount, 1);
    });

    test("dispose calls end on pubsub lifetime for each pane", function () {
        Test.Integration.pubsubAsMock();
        Test.Integration.executeEvents(events, 'Events/basicParent');
        $('.basicContainer').parent().remove();
        ok(Test.Integration.context.pubsub.end.calledTwice);
    });
})();