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

    test("data passed to pubsub.startSaga are passed to onstart handler", function () {
        expect(2);
        var s = pubsub.startSaga(constructor, 'data');
        function constructor(saga) {
            equal(saga.pubsub.owner, pubsub);
            saga.handles = {
                onstart: function (data) { equal(data, 'data'); }
            };
        }
    });

    test("data passed to lifetime.startSaga are passed to onstart handler", function () {
        expect(2);
        var s = pubsub.createLifetime().startSaga(constructor, 'data');
        function constructor(saga) {
            equal(saga.pubsub.owner, pubsub);
            saga.handles = {
                onstart: function (data) { equal(data, 'data'); }
            };
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

    test("startChild passes data to child start function", function () {
        expect(1);
        var child = function(childSaga, data) {
            childSaga.handles = {
                onstart: function(data) {
                    equal(data, 'data');
                }
            };
        };
        var saga = new Tribe.PubSub.Saga(pubsub, definition);
        saga.startChild(child, 'data');
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

    test("join sets data and executes onjoin handler", function () {
        definition.handles = {
            onjoin: spy
        };
        var saga = new Tribe.PubSub.Saga(pubsub, definition).join('test');
        equal(saga.data, 'test');
        ok(spy.calledOnce);
    });

    function createDefinition(handlers) {
        return {
            pubsub: pubsub,
            handles: handlers
        };
    }
})();
