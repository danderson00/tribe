suite('browser.actors.counter', function () {
    var pubsub = require('tribe.pubsub'),
        actors = require('tribe/actors');

    test("counter starts at zero", function () {
        var actor = actors.create(pubsub, '/counter').instance;
        expect(actor.count()).to.equal(0);
    });

    test("counter increments by one on each message", function () {
        var actor = actors.create(pubsub, '/counter').start().instance;
        pubsub.publish('counter.increment');
        pubsub.publish('counter.increment');
        expect(actor.count()).to.equal(2);
    });
});