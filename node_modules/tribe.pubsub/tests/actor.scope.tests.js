suite('tribe.pubsub.actor.scope', function () {
    var pubsubModule = require('../pubsub'),
        actorModule = require('../actor'),

        pubsub, spy1, spy2;

    setup(function () {
        pubsub = new pubsubModule({ sync: true, handleExceptions: false });
        spy1 = sinon.spy();
        spy2 = sinon.spy();
    });

    test("actor only handles messages with scoped property", function () {
        var actor1 = new actorModule(pubsub, { pubsub: pubsub, handles: { 'testTopic': spy1 } }, 1),
            actor2 = new actorModule(pubsub, { pubsub: pubsub, handles: { 'testTopic': spy2 } }, 2);

        actor1.isScopedTo('test');
        actor1.start();
        actor2.isScopedTo('test');
        actor2.start();

        pubsub.publish('testTopic', { test: 1 });
        assertCounts(1, 0);

        pubsub.publish('testTopic', { test: 2 });
        assertCounts(1, 1);

        pubsub.publish('testTopic', { test: 3 });
        assertCounts(1, 1);
    });

    test("scope can be specified in object form", function () {
        var actor = new actorModule(pubsub, { pubsub: pubsub, handles: { 'testTopic': spy1 } }, { test: 1 });

        actor.isScopedTo('test');
        actor.start();

        pubsub.publish('testTopic', { test: 1 });
        pubsub.publish('testTopic', { test: 2 });
        assertCounts(1, 0);
    });

    test("multiple key paths can be specified in scope", function () {
        var actor1 = new actorModule(pubsub, { pubsub: pubsub, handles: { 'testTopic': spy1 } }, { 'p1': 1, 'p2': 2, 'p3': 3 }),
            actor2 = new actorModule(pubsub, { pubsub: pubsub, handles: { 'testTopic': spy2 } }, { 'p1': 1, 'p4.p5':  45 });

        actor1.isScopedTo('p1', 'p2', 'p3');
        actor1.start();
        actor2.isScopedTo('p1', 'p4.p5');
        actor2.start();

        pubsub.publish('testTopic', { p1: 1, p2: 2, p3: 3, p4: { p5: 45 } });
        assertCounts(1, 1);

        pubsub.publish('testTopic', { p1: 2, p2: 2, p3: 3, p4: { p5: 45 } });
        assertCounts(1, 1);

        pubsub.publish('testTopic', { p1: 1, p2: 2, p3: 3 });
        assertCounts(2, 1);

        pubsub.publish('testTopic', { p1: 1, p2: 2, p3: 4, p4: { p5: 45 } });
        assertCounts(2, 2);
    });

    function assertCounts(one, two) {
        assert.equal(spy1.callCount, one);
        assert.equal(spy2.callCount, two);
    }
});
