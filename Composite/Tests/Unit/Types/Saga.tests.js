(function () {
    var pane;
    var pubsub;
    var spy;
    
    module('Unit.Types.Saga', {
        setup: function() {
            pubsub = new Tribe.PubSub({ sync: true });
            pane = { pubsub: pubsub };
            spy = sinon.spy();
        }
    });

    test("handler is executed with correct arguments when topic is published", function () {
        var saga = new TC.Types.Saga(pane, { 'testTopic': spy }).start();
        pubsub.publish('testTopic', 'data');

        ok(spy.calledOnce);
        equal(spy.firstCall.args[0], saga);
        equal(spy.firstCall.args[1], 'data');
        equal(spy.firstCall.args[2].data, 'data');
    });

    test("onstart handler is executed when saga is started", function() {
        var saga = new TC.Types.Saga(pane, { onstart: spy }, 'test');
        ok(spy.notCalled);
        saga.start();
        ok(spy.calledOnce);
        equal(spy.firstCall.args[0], saga);
        equal(spy.firstCall.args[1], 'test');
    });

    test("onend handler is executed when saga is started", function () {
        var saga = new TC.Types.Saga(pane, { onend: spy }).start();
        ok(spy.notCalled);
        saga.end();
        ok(spy.calledOnce);
        equal(spy.firstCall.args[0], saga);
    });

    test("onstart and onend handlers are not executed when topics is published", function () {
        var saga = new TC.Types.Saga(pane, { onstart: spy, onend: spy }).start();
        pubsub.publish('onstart');
        pubsub.publish('onend');
        ok(spy.calledOnce);
    });

    test("startChild starts child and adds to children", function () {
        var child = { onstart: sinon.spy() };
        var saga = new TC.Types.Saga(pane);
        saga.startChild(child);
        ok(child.onstart.calledOnce);
        equal(saga.children.length, 1);
    });
    
    test("end calls end on any children", function () {
        var child = { onend: sinon.spy() };
        var saga = new TC.Types.Saga(pane);
        saga.startChild(child);
        saga.end();
        ok(child.onend.calledOnce);
    });

})();
