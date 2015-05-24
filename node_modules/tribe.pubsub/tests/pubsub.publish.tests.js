suite('tribe.pubsub.publish', function () {
    var pubsubModule = require('../pubsub'),
        pubsub;

    setup(function () {
        pubsub = new pubsubModule();
    });

    test("publish should call all subscribers for a message exactly once", function () {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();

        pubsub.subscribe("0", spy1);
        pubsub.subscribe("0", spy2);

        pubsub.publishSync("0", "test");

        assert.ok(spy1.calledOnce);
        assert.ok(spy2.calledOnce);
    });

    test("publish should only call subscribers of the published message", function () {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();

        pubsub.subscribe("0", spy1);
        pubsub.subscribe("1", spy2);

        pubsub.publishSync("0", "test");

        assert.ok(spy1.called);
        assert.equal(spy2.callCount, 0);
    });

    test("publish should call subscribers with data as first argument", function () {
        var spy = sinon.spy();

        pubsub.subscribe("0", spy);
        pubsub.publishSync("0", "1");

        assert.ok(spy.calledWith("1"));
    });

    test("publish should publish asynchronously", function () {
        var setTimeout = stubSetTimeout();
        if (setTimeout) {
            var spy = sinon.spy();

            pubsub.subscribe("0", spy);
            pubsub.publish("0", "1");
            assert.ok(setTimeout.calledOnce);

            setTimeout.restore();
        } else assert.ok(true, "Unable to spy on window.setTimeout.");
    });

    test("publishSync should publish synchronously", function () {
        var setTimeout = stubSetTimeout();
        if (setTimeout) {
            var spy = sinon.spy();

            pubsub.subscribe("0", spy);
            pubsub.publishSync("0", "1");
            assert.ok(setTimeout.notCalled);

            setTimeout.restore();
        } else assert.ok(true, "Unable to spy on window.setTimeout.");
    });

    test("publish accepts evelope as first parameter", function () {
        var spy = sinon.spy();

        pubsub.subscribe('testMessage', spy);
        pubsub.publish({ topic: 'testMessage', data: 'test', sync: true });

        assert.ok(spy.calledWith('test'));
    });
    
    function stubSetTimeout() {
        try {
            return sinon.stub(window, 'setTimeout');
        } catch (ex) { }
    }
});
