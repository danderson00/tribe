(function () {
    var spy;
    var definition;
    var pubsub;

    module('Saga', {
        setup: function () {
            pubsub = new Tribe.PubSub({ sync: true });
            definition = createDefinition();
            spy = sinon.spy();
        }
    });

    test("constructor arguments are passed to definition constructor", function () {
        expect(3);
        var s = new Tribe.PubSub.Saga(pubsub, constructor, 'arg1', 'arg2');
        function constructor(saga, arg1, arg2) {
            equal(saga.pubsub.owner, pubsub);
            equal(arg1, 'arg1');
            equal(arg2, 'arg2');
        }
    });

    test("arguments passed to pubsub.startSaga are passed to definition constructor", function () {
        expect(3);
        var s = pubsub.startSaga(constructor, 'arg1', 'arg2');
        function constructor(saga, arg1, arg2) {
            equal(saga.pubsub.owner, pubsub);
            equal(arg1, 'arg1');
            equal(arg2, 'arg2');
        }
    });

    test("arguments passed to lifetime.startSaga are passed to definition constructor", function () {
        expect(3);
        var s = pubsub.createLifetime().startSaga(constructor, 'arg1', 'arg2');
        function constructor(saga, arg1, arg2) {
            equal(saga.pubsub.owner, pubsub);
            equal(arg1, 'arg1');
            equal(arg2, 'arg2');
        }
    });

    test("handler is executed with correct arguments when topic is published", function () {
        definition.handles = { 'testTopic': spy };
        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();
        pubsub.publish('testTopic', 'data');

        ok(spy.calledOnce);
        equal(spy.firstCall.args[0], 'data');
        equal(spy.firstCall.args[1].data, 'data');
        equal(spy.firstCall.args[2], saga);
    });

    test("onstart handler is executed when saga is started", function () {
        definition.handles = { onstart: spy };
        var saga = new Tribe.PubSub.Saga(pubsub, definition);
        ok(spy.notCalled);
        saga.start();
        ok(spy.calledOnce);
    });

    test("onstart is called with argument passed to start", function () {
        definition.handles = { onstart: spy };
        var saga = new Tribe.PubSub.Saga(pubsub, definition).start('arg');
        ok(spy.calledOnce);
        equal(spy.firstCall.args[0], 'arg');
        equal(spy.firstCall.args[1], saga);
    });

    test("onend handler is executed when saga is ended", function () {
        definition.handles = { onend: spy };
        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();
        ok(spy.notCalled);
        saga.end();
        ok(spy.calledOnce);
    });

    test("onend handler is called wtih argument passed to end", function () {
        definition.handles = { onend: spy };
        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();
        saga.end('arg');
        equal(spy.firstCall.args[0], 'arg');
        equal(spy.firstCall.args[1], saga);
    });

    test("onstart and onend handlers are not executed when topics are published", function () {
        definition.handles = { onstart: spy, onend: spy };
        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();
        pubsub.publish('onstart');
        pubsub.publish('onend');
        ok(spy.calledOnce);
    });

    test("startChild starts child and adds to children", function () {
        var child = createDefinition({ onstart: spy });
        var saga = new Tribe.PubSub.Saga(pubsub, definition);
        saga.startChild(child);
        ok(spy.calledOnce);
        equal(saga.children.length, 1);
    });

    test("startChild calls onstart with data passed", function () {
        var child = createDefinition({ onstart: spy });
        var saga = new Tribe.PubSub.Saga(pubsub, definition);
        saga.startChild(child, 'arg');
        ok(spy.firstCall.args[0], 'arg');
    });

    test("end calls end on any children with data passed", function () {
        var child = createDefinition({ onend: spy });
        var saga = new Tribe.PubSub.Saga(pubsub, definition);
        saga.startChild(child);
        saga.end('arg');
        ok(spy.calledOnce);
        equal(spy.firstCall.args[0], 'arg');
    });

    test("Saga ends when null handler is executed", function () {
        definition.handles = { 'endTopic': null, onend: spy };
        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();
        pubsub.publish('endTopic');
        ok(definition.handles.onend.calledOnce);
    });

    test("Child saga is started when child handler is executed", function () {
        definition.handles = {
            'startChild': {
                'childTopic': spy
            }
        };
        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();
        pubsub.publish('childTopic');
        ok(spy.notCalled);
        pubsub.publish('startChild');
        pubsub.publish('childTopic');
        ok(spy.calledOnce);
    });

    test("Children are ended when parent message is received", function () {
        definition.handles = {
            'startChild': {
                'childTopic': spy
            },
            'parentTopic': function () { }
        };
        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();
        pubsub.publish('startChild');
        pubsub.publish('childTopic');
        pubsub.publish('parentTopic');
        pubsub.publish('childTopic');
        ok(spy.calledOnce);
    });

    test("Children are not ended when parent message is received if endsChildrenExplicitly is set", function () {
        definition.handles = {
            'startChild': {
                'childTopic': spy
            },
            'parentTopic': function () { }
        };
        definition.endsChildrenExplicitly = true;
        var saga = new Tribe.PubSub.Saga(pubsub, definition).start();
        pubsub.publish('startChild');
        pubsub.publish('childTopic');
        pubsub.publish('parentTopic');
        pubsub.publish('childTopic');
        ok(spy.calledTwice);
    });

    function createDefinition(handlers) {
        return {
            pubsub: pubsub,
            handles: handlers
        };
    }
})();
