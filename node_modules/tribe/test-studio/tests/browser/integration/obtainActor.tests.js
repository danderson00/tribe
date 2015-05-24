var pubsub = require('tribe.pubsub'),
    hub = require('tribe/client/hub'),
    uuid = require('node-uuid');

suite('tribe.browser.integration.obtainActor', function () {
    test("actors receieve correct number of messages and are released correctly", function () {
        var actorId = uuid.v4();

        return pubsub.obtainActor('tests/obtain', { actorId: actorId })
            .then(function (actor) {
                pubsub.publish('topic', { actorId: actorId });
                expect(actor.count).to.equal(1);
                pubsub.releaseActor(actor);
                return hub.publish({ topic: 'topic', data: { actorId: actorId } });
            })
            .then(function () {
                return pubsub.obtainActor('tests/obtain', { actorId: actorId });
            })
            .then(function (actor) {
                expect(actor.count).to.equal(2);
            });
    });

    test("actor with single property scope can be obtained with a scalar", function () {
        var actorId = uuid.v4();

        return pubsub.obtainActor('tests/obtain', actorId)
            .then(function (actor) {
                pubsub.publish('topic', { actorId: actorId });
                expect(actor.count).to.equal(1);
                pubsub.releaseActor(actor);
                return hub.publish({ topic: 'topic', data: { actorId: actorId } });
            })
            .then(function () {
                return pubsub.obtainActor('tests/obtain', actorId);
            })
            .then(function (actor) {
                expect(actor.count).to.equal(2);
            });
    });
});
