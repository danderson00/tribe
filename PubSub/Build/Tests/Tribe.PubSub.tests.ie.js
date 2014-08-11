
// Actor.tests.js

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



// Channel.tests.js

(function() {
    var pubsub;
    var channel;

    module('Channel', {
        setup: function() {
            pubsub = new Tribe.PubSub({ sync: true });
            channel = pubsub.channel('channel');
        }
    });

    test("Channel publishes messages with channelId set", function () {
        var spy = sinon.spy();
        pubsub.subscribe('*', spy);
        channel.publish('topic');
        ok(spy.calledOnce);
        equal(spy.firstCall.args[1].channelId, 'channel');
    });

    test("Channel only subscribes to messages with correct channelId set", function() {
        var spy = sinon.spy();
        channel.subscribe('topic', spy);
        pubsub.publish({ topic: 'topic' });
        pubsub.publish({ topic: 'topic', channelId: 'other' });
        equal(spy.callCount, 0);
        pubsub.publish({ topic: 'topic', channelId: 'channel' });
        equal(spy.callCount, 1);
        channel.publish({ topic: 'topic' });
        equal(spy.callCount, 2);
    });

    test("Channel unsubscribe works as expected", function() {
        var spy = sinon.spy();
        var token = channel.subscribe('topic', spy);
        channel.publish({ topic: 'topic' });
        equal(spy.callCount, 1);
        channel.unsubscribe(token);
        channel.publish({ topic: 'topic' });
        equal(spy.callCount, 1);
    });

    //test("", function () {
    //});

    //test("", function () {
    //});

    //test("", function () {
    //});
})();


// exceptions.tests.js

(function () {
    var pubsub;

    module('exceptions', {
        setup: function () { pubsub = new Tribe.PubSub(); }
    });

    test("when handleExceptions is true, publishSync should call all subscribers, even if there are exceptions", function () {
        var spy = sinon.spy();

        pubsub.subscribe("0", errorFunction);
        pubsub.subscribe("0", spy);

        pubsub.publishSync("0");

        ok(spy.called);
    });

    test("when handleExceptions is true, exceptionHandler is called when exception occurs in subscriber", function () {
        var oldHandler = Tribe.PubSub.options.exceptionHandler;
        Tribe.PubSub.options.exceptionHandler = sinon.spy();

        pubsub.subscribe("0", errorFunction);
        pubsub.publishSync("0");

        ok(Tribe.PubSub.options.exceptionHandler.called);
        Tribe.PubSub.options.exceptionHandler = oldHandler;
    });

    test("when handleExceptions is false, exceptions thrown in subscribers will be unhandled", function() {
        Tribe.PubSub.options.handleExceptions = false;

        raises(function() {
            pubsub.subscribe("0", errorFunction);
            pubsub.publishSync("0");
        });

        Tribe.PubSub.options.handleExceptions = true;
    });
    
    function errorFunction() {
        throw ('some error');
    }
})();



// Lifetime.tests.js

(function () {
    var pubsub;

    module('Lifetime', {
        setup: function () { pubsub = new Tribe.PubSub(); }
    });

    test("lifetime subscribers are called as normal", function() {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();

        pubsub.subscribe("0", spy1);
        var lifetime = pubsub.createLifetime();
        lifetime.subscribe("0", spy2);
        pubsub.publishSync("0");

        ok(spy1.called);
        ok(spy2.called);
    });
    
    test("lifetime subscribers are not called after end", function () {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();

        pubsub.subscribe("0", spy1);
        var lifetime = pubsub.createLifetime();
        lifetime.subscribe("0", spy2);
        lifetime.end();
        pubsub.publishSync("0");

        ok(spy1.called);
        ok(spy2.notCalled);
    });

    test("lifetime handles hash of subscribers", function () {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();

        var lifetime = pubsub.createLifetime();
        lifetime.subscribe({ "0": spy1, "1": spy2 });
        lifetime.end();
        pubsub.publishSync("0");
        pubsub.publishSync("1");

        ok(spy1.notCalled);
        ok(spy2.notCalled);
    });

    test("messages published through lifetime are published to other subscribers", function() {
        var spy = sinon.spy();

        pubsub.subscribe("0", spy);
        var lifetime = pubsub.createLifetime();
        lifetime.publishSync("0");

        ok(spy.calledOnce);
    });

    test("nested lifetime subscribers are removed by parent", function() {
        var spy = sinon.spy();

        var lifetime1 = pubsub.createLifetime();
        var lifetime2 = lifetime1.createLifetime();
        lifetime2.subscribe("0", spy);
        lifetime1.end();
        pubsub.publishSync("0");

        ok(spy.notCalled);
    });

    test("parent lifetime subscribers are not removed by nested lifetimes", function() {
        var spy = sinon.spy();

        var lifetime1 = pubsub.createLifetime();
        var lifetime2 = lifetime1.createLifetime();
        lifetime1.subscribe("0", spy);
        lifetime2.end();
        pubsub.publishSync("0");

        ok(spy.calledOnce);
    });

    test("publishing through nested lifetimes triggers subscribers on owner", function() {
        var spy = sinon.spy();

        pubsub.subscribe("0", spy);
        var lifetime1 = pubsub.createLifetime();
        var lifetime2 = lifetime1.createLifetime();
        lifetime2.publishSync("0");

        ok(spy.calledOnce);
    });

    test("lifetime.owner returns containing PubSub object", function() {
        var lifetime1 = pubsub.createLifetime();
        var lifetime2 = lifetime1.createLifetime();
        equal(lifetime1.owner, pubsub);
        equal(lifetime2.owner, pubsub);
    });
})();



// PubSub.publish.tests.js

(function () {
    var pubsub;

    module('core.publish', {
        setup: function () { pubsub = new Tribe.PubSub(); }
    });

    test("publish should call all subscribers for a message exactly once", function () {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();

        pubsub.subscribe("0", spy1);
        pubsub.subscribe("0", spy2);

        pubsub.publishSync("0", "test");

        ok(spy1.calledOnce);
        ok(spy2.calledOnce);
    });

    test("publish should only call subscribers of the published message", function () {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();

        pubsub.subscribe("0", spy1);
        pubsub.subscribe("1", spy2);

        pubsub.publishSync("0", "test");

        ok(spy1.called);
        equal(spy2.callCount, 0);
    });

    test("publish should call subscribers with data as first argument", function () {
        var spy = sinon.spy();

        pubsub.subscribe("0", spy);
        pubsub.publishSync("0", "1");

        ok(spy.calledWith("1"));
    });

    test("publish should publish asynchronously", function () {
        var setTimeout = stubSetTimeout();
        if (setTimeout) {
            var spy = sinon.spy();

            pubsub.subscribe("0", spy);
            pubsub.publish("0", "1");
            ok(setTimeout.calledOnce);

            setTimeout.restore();
        } else ok(true, "Unable to spy on window.setTimeout.");
    });

    test("publishSync should publish synchronously", function () {
        var setTimeout = stubSetTimeout();
        if (setTimeout) {
            var spy = sinon.spy();

            pubsub.subscribe("0", spy);
            pubsub.publishSync("0", "1");
            ok(setTimeout.notCalled);

            setTimeout.restore();
        } else ok(true, "Unable to spy on window.setTimeout.");
    });

    test("publish accepts evelope as first parameter", function () {
        var spy = sinon.spy();

        pubsub.subscribe('testMessage', spy);
        pubsub.publish({ topic: 'testMessage', data: 'test', sync: true });

        ok(spy.calledWith('test'));
    });
    
    function stubSetTimeout() {
        try {
            return sinon.stub(window, 'setTimeout');
        } catch (ex) { }
    }
})();



// PubSub.subscribe.tests.js

(function () {
    var pubsub;

    module('core.subscribe', {
        setup: function () { pubsub = new Tribe.PubSub(); }
    });

    test("subscribe method should return different tokens", function () {
        var token1 = pubsub.subscribe("0", function () { });
        var token2 = pubsub.subscribe("1", function () { });
        notEqual(token1, token2);
    });

    test('passing map of handlers to subscribe returns correct number of string tokens', function () {
        var tokens = pubsub.subscribe({
            'test': function () { },
            'test2': function () { }
        });
        equal(tokens.length, 2, 'Return type has correct length');
        ok(tokens[0].constructor === String);
        ok(tokens[1].constructor === String);
    });

    test('passing map of handlers to subscribe correctly subscribes messages', function () {
        var spy1 = sinon.spy(), spy2 = sinon.spy();
        pubsub.subscribe({
            'test': spy1,
            'test2': spy2
        });

        pubsub.publishSync('test');
        ok(spy1.called, "First subscription successful");

        pubsub.publishSync('test2');
        ok(spy2.called, "Second subscription successful");
    });

    test('passing array of handlers to subscribe returns correct number of string tokens', function () {
        var tokens = pubsub.subscribe(['test', 'test2'], function () { });
        equal(tokens.length, 2, 'Return type has correct length');
        ok(tokens[0].constructor === String);
        ok(tokens[1].constructor === String);
    });

    test('passing array of handlers to subscribe correctly subscribes messages', function () {
        var spy = sinon.spy();
        pubsub.subscribe(['test', 'test2'], spy);

        pubsub.publishSync('test');
        pubsub.publishSync('test2');
        ok(spy.calledTwice, "Both subscriptions triggered");
    });
})();



// PubSub.unsubscribe.tests.js

(function () {
    var pubsub;

    module('core.unsubscribe', {
        setup: function () { pubsub = new Tribe.PubSub(); }
    });

    test("unsubscribe method should return token when successful", function () {
        var token = pubsub.subscribe("0");
        var result = pubsub.unsubscribe(token);
        equal(result, token);
    });

    test("unsubscribe method should return false when unsuccesful", function () {
        var result = pubsub.unsubscribe("0");
        equal(result, false);

        // now let's try unsubscribing the same method twice
        var token = pubsub.subscribe("0");
        pubsub.unsubscribe(token);
        equal(pubsub.unsubscribe(token), false);
    });

    test('passing array of tokens to unsubscribe correctly unsubscribes messages', function () {
        var spy1 = sinon.spy(), spy2 = sinon.spy();
        var tokens = pubsub.subscribe({
            'test': spy1,
            'test2': spy2
        });
        pubsub.unsubscribe(tokens);

        pubsub.publishSync('test');
        ok(!spy1.called, "First subscription successful");

        pubsub.publishSync('test2');
        ok(!spy2.called, "Second subscription successful");
    });
})();



// subscribeOnce.tests.js

(function () {
    var pubsub;

    module('subscribeOnce', {
        setup: function () { pubsub = new Tribe.PubSub(); }
    });

    // add some subscribers around the subscribeOnce to ensure it is unsubscribed correctly.
    test('subscribeOnce publishes message to single subscriber only once', function () {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();
        var spy3 = sinon.spy();

        pubsub.subscribe('test', spy1);
        pubsub.subscribeOnce('test', spy2);
        pubsub.subscribe('test', spy3);
        pubsub.publishSync('test');
        pubsub.publishSync('test');
        ok(spy1.calledTwice);
        ok(spy2.calledOnce);
        ok(spy3.calledTwice);
    });

    test("subscribeOnce publishes message to map of subscribers only once", function () {
        var spy = sinon.spy();
        pubsub.subscribeOnce({ 'test1': spy, 'test2': spy });
        pubsub.publishSync('test1');
        pubsub.publishSync('test1');
        pubsub.publishSync('test2');
        ok(spy.calledOnce);
    });

    test("subscribeOnce publishes message to array of subscribers only once", function () {
        var spy = sinon.spy();
        pubsub.subscribeOnce([ 'test1', 'test2'], spy);
        pubsub.publishSync('test1');
        pubsub.publishSync('test1');
        pubsub.publishSync('test2');
        ok(spy.calledOnce);
    });

    test("subscribeOnce functions correctly in a lifetime", function () {
        var spy1 = sinon.spy();
        var spy2 = sinon.spy();
        var spy3 = sinon.spy();

        pubsub.subscribe('test', spy1);
        var lifetime = pubsub.createLifetime();
        lifetime.subscribeOnce('test', spy2);
        lifetime.subscribe('test', spy3);
        
        pubsub.publishSync('test');
        pubsub.publishSync('test');
        lifetime.end();
        pubsub.publishSync('test');
        
        ok(spy1.calledThrice);
        ok(spy2.calledOnce);
        ok(spy3.calledTwice);
    });
})();



// SubscriberList.tests.js

(function() {
    var list;

    module("SubscriberList", {
        setup: function () { list = new Tribe.PubSub.SubscriberList(); }
    });

    test("add returns consecutive tokens", function () {
        equal(list.add(), "0");
        equal(list.add(), "1");
    });

    test("remove returns token if removed", function() {
        var token = list.add("0");
        equal(list.remove(token), token);
    });

    test("remove returns false if not removed", function () {
        list.add("0");
        equal(list.remove("1"), false);
    });

    test("get returns subscribers to specific topic", function() {
        list.add("0", "0");
        list.add("0", "1");
        list.add("2", "2");

        var subscribers = list.get("0");
        equal(subscribers.length, 2);
        equal(subscribers[0].handler, "0");
        equal(subscribers[1].handler, "1");
    });

    test("get includes global wildcard", function () {
        list.add("0", "0");
        list.add("*", "1");
        list.add("1", "2");

        var subscribers = list.get("0");
        equal(subscribers.length, 2);
        equal(subscribers[0].handler, "0");
        equal(subscribers[1].handler, "1");
    });

    test("global wildcard matches all topics", function() {
        list.add("*", "1");
        equal(list.get("0").length, 1);
        equal(list.get("00").length, 1);
        equal(list.get("0.0").length, 1);
        equal(list.get("0.0.0").length, 1);
    });

    test("get includes child wildcard", function () {
        list.add("0.0", "0");
        list.add("0.*", "1");
        list.add("0.1", "2");

        var subscribers = list.get("0.0");
        equal(subscribers.length, 2);
        equal(subscribers[0].handler, "0");
        equal(subscribers[1].handler, "1");
    });

    test("get includes embedded wildcard", function () {
        list.add("0.0.0", "0");
        list.add("0.*.0", "1");
        list.add("0.1.0", "2");

        var subscribers = list.get("0.0.0");
        equal(subscribers.length, 2);
        equal(subscribers[0].handler, "0");
        equal(subscribers[1].handler, "1");
    });

    test("publish matches topics correctly", function () {
        list.add("test", {});
        list.add("testtest", {});
        list.add("1test", {});
        list.add("test1", {});
        list.add("1test1", {});

        equal(list.get("test").length, 1);
        equal(list.get("testtest").length, 1);
        equal(list.get("1test").length, 1);
        equal(list.get("test1").length, 1);
        equal(list.get("1test1").length, 1);
    });
})();



// utils.tests.js

(function () {
    module("utils");

    var utils = Tribe.PubSub.utils;
    // these tests taken from the underscore library. Licensing at http://underscorejs.org.

    test("each", function () {
        utils.each([1, 2, 3], function (num, i) {
            equal(num, i + 1, 'each iterators provide value and iteration count');
        });

        var answers = [];
        utils.each([1, 2, 3], function (num) { answers.push(num * this.multiplier); }, { multiplier: 5 });
        equal(answers.join(', '), '5, 10, 15', 'context object property accessed');

        answers = [];
        var obj = { one: 1, two: 2, three: 3 };
        obj.constructor.prototype.four = 4;
        utils.each(obj, function (value, key) { answers.push(key); });
        equal(answers.join(", "), 'one, two, three', 'iterating over objects works, and ignores the object prototype.');
        delete obj.constructor.prototype.four;

        answers = 0;
        utils.each(null, function () { ++answers; });
        equal(answers, 0, 'handles a null properly');
    });

    test('map', function () {
        var doubled = utils.map([1, 2, 3], function (num) { return num * 2; });
        equal(doubled.join(', '), '2, 4, 6', 'doubled numbers');

        var tripled = utils.map([1, 2, 3], function (num) { return num * this.multiplier; }, { multiplier: 3 });
        equal(tripled.join(', '), '3, 6, 9', 'tripled numbers with context');

        var ifnull = utils.map(null, function () { });
        ok(utils.isArray(ifnull) && ifnull.length === 0, 'handles a null properly');
    });

    test('copyProperties', function () {
        var source = { p1: '1', p2: '2', p3: '3' },
            target = { p1: '2' },
            properties = ['p1', 'p2', 'p4'];

        utils.copyProperties(source, target, properties);
        equal(target.p1, '1');
        equal(target.p2, '2');
        equal(target.p3, undefined);
        equal(target.p4, undefined);
    });
})();

