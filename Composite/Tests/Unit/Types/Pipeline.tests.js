(function () {
    var events;
    var pipeline;
    var eventDeferred;
    var context = {};

    module("Unit.Types.Pipeline", {
        setup: function() {
            events = testEvents();
            pipeline = new TC.Types.Pipeline(events, context);
        }
    });

    test("event handlers specified are called", function () {
        pipeline.execute(['null1']);
        ok(events.null1.calledOnce);
    });

    test("event handlers are passed target and context", function () {
        var target = {};
        pipeline.execute(['null1'], target);
        ok(events.null1.calledWithExactly(target, context));
    });

    test("events returning null are executed synchronously", function () {
        pipeline.execute(['null1', 'null2']);
        ok(events.null1.calledOnce);
        ok(events.null2.calledOnce);
    });

    test("events are executed when previous event resolves", function() {
        pipeline.execute(['deferred', 'null1']);
        ok(events.null1.notCalled);
        eventDeferred.resolve();
        ok(events.null1.calledOnce);
    });

    test("rejected events terminate pipeline execution", function() {
        pipeline.execute(['deferred', 'null1']);
        eventDeferred.reject();
        ok(events.null1.notCalled);
    });

    test("execute returns deferred that resolves on completion", function() {
        var deferred = pipeline.execute(['deferred']);
        equal(deferred.state(), 'pending');
        eventDeferred.resolve();
        equal(deferred.state(), 'resolved');
    });
    
    test("execute returns deferred that rejects on failure", function () {
        var deferred = pipeline.execute(['deferred']);
        equal(deferred.state(), 'pending');
        eventDeferred.reject();
        equal(deferred.state(), 'rejected');
    });

    function testEvents() {
        eventDeferred = $.Deferred();
        
        return {
            null1: sinon.spy(),
            null2: sinon.spy(),
            deferred: sinon.stub().returns(eventDeferred)
        };
    }
})();
