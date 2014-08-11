(function () {
    var spy;
    var definition;
    var pubsub;

    module('Actor', {
        setup: function () {
            pubsub = new Tribe.PubSub({ sync: true });
            definition = createDefinition();
            spy = sinon.spy();
        }
    });

    test("data passed to pubsub.startActor are passed to onstart handler", function () {
        expect(2);
        var s = pubsub.startActor(constructor, 'data');
        function constructor(actor) {
            equal(actor.pubsub.owner, pubsub);
            actor.handles = {
                onstart: function (data) { equal(data, 'data'); }
            };
        }
    });

    test("data passed to lifetime.startActor are passed to onstart handler", function () {
        expect(2);
        var s = pubsub.createLifetime().startActor(constructor, 'data');
        function constructor(actor) {
            equal(actor.pubsub.owner, pubsub);
            actor.handles = {
                onstart: function (data) { equal(data, 'data'); }
            };
        }
    });

    test("handler is executed with correct arguments when topic is published", function () {
        definition.handles = { 'testTopic': spy };
        var actor = new Tribe.PubSub.Actor(pubsub, definition).start();
        pubsub.publish('testTopic', 'data');

        ok(spy.calledOnce);
        equal(spy.firstCall.args[0], 'data');
        equal(spy.firstCall.args[1].data, 'data');
        equal(spy.firstCall.args[2], actor);
    });

    test("onstart handler is executed when actor is started", function () {
        definition.handles = { onstart: spy };
        var actor = new Tribe.PubSub.Actor(pubsub, definition);
        ok(spy.notCalled);
        actor.start();
        ok(spy.calledOnce);
    });

    test("onstart is called with argument passed to start", function () {
        definition.handles = { onstart: spy };
        var actor = new Tribe.PubSub.Actor(pubsub, definition).start('arg');
        ok(spy.calledOnce);
        equal(spy.firstCall.args[0], 'arg');
        equal(spy.firstCall.args[1], actor);
    });

    test("onend handler is executed when actor is ended", function () {
        definition.handles = { onend: spy };
        var actor = new Tribe.PubSub.Actor(pubsub, definition).start();
        ok(spy.notCalled);
        actor.end();
        ok(spy.calledOnce);
    });

    test("onend handler is called wtih argument passed to end", function () {
        definition.handles = { onend: spy };
        var actor = new Tribe.PubSub.Actor(pubsub, definition).start();
        actor.end('arg');
        equal(spy.firstCall.args[0], 'arg');
        equal(spy.firstCall.args[1], actor);
    });

    test("onstart and onend handlers are not executed when topics are published", function () {
        definition.handles = { onstart: spy, onend: spy };
        var actor = new Tribe.PubSub.Actor(pubsub, definition).start();
        pubsub.publish('onstart');
        pubsub.publish('onend');
        ok(spy.calledOnce);
    });

    test("startChild starts child and adds to children", function () {
        var child = createDefinition({ onstart: spy });
        var actor = new Tribe.PubSub.Actor(pubsub, definition);
        actor.startChild(child);
        ok(spy.calledOnce);
        equal(actor.children.length, 1);
    });

    test("startChild passes data to child start function", function () {
        expect(1);
        var child = function(childActor, data) {
            childActor.handles = {
                onstart: function(data) {
                    equal(data, 'data');
                }
            };
        };
        var actor = new Tribe.PubSub.Actor(pubsub, definition);
        actor.startChild(child, 'data');
    });

    test("end calls end on any children with data passed", function () {
        var child = createDefinition({ onend: spy });
        var actor = new Tribe.PubSub.Actor(pubsub, definition);
        actor.startChild(child);
        actor.end('arg');
        ok(spy.calledOnce);
        equal(spy.firstCall.args[0], 'arg');
    });

    test("Actor ends when null handler is executed", function () {
        definition.handles = { 'endTopic': null, onend: spy };
        var actor = new Tribe.PubSub.Actor(pubsub, definition).start();
        pubsub.publish('endTopic');
        ok(definition.handles.onend.calledOnce);
    });

    test("Child actor is started when child handler is executed", function () {
        definition.handles = {
            'startChild': {
                'childTopic': spy
            }
        };
        var actor = new Tribe.PubSub.Actor(pubsub, definition).start();
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
        var actor = new Tribe.PubSub.Actor(pubsub, definition).start();
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
        var actor = new Tribe.PubSub.Actor(pubsub, definition).start();
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
        var actor = new Tribe.PubSub.Actor(pubsub, definition).join('test');
        equal(actor.data, 'test');
        ok(spy.calledOnce);
    });

    test("pre and post message handlers are executed for each handled message", function () {
        definition.handles = { 'testTopic1': spy, 'testTopic2': spy };
        var actor = new Tribe.PubSub.Actor(pubsub, definition).start();
        actor.preMessage = sinon.spy();
        actor.postMessage = sinon.spy();
        pubsub.publish('testTopic1', 'data');
        pubsub.publish('testTopic2', 'data');
        pubsub.publish('testTopic3', 'data');

        ok(actor.preMessage.calledTwice);
        ok(actor.postMessage.calledTwice);
    });

    test("pre and post message handlers are executed when defined in constructor", function () {
        var pre = sinon.spy(),
            post = sinon.spy(),
            s = pubsub.startActor(constructor, 'data');

        pubsub.publish('testTopic1', 'data');
        pubsub.publish('testTopic2', 'data');
        pubsub.publish('testTopic3', 'data');

        ok(pre.calledTwice);
        ok(post.calledTwice);

        function constructor(actor) {
            actor.handles = { 'testTopic1': spy, 'testTopic2': spy };
            actor.preMessage = pre;
            actor.postMessage = post;
        }
    });

    function createDefinition(handlers) {
        return {
            pubsub: pubsub,
            handles: handlers
        };
    }
})();
