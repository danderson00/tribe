var pubsub = require('tribe.pubsub'),
    hub = require('tribe/client/hub'),
    uuid = require('node-uuid');

suite('tribe.browser.integration.scopes', function () {
    // test("actors receieve correct number of messages", function () {
    //     var actorId = uuid.v4();
    //
    //     return pubsub.obtainActor('tests/obtain', { actorId: actorId })
    //         .then(function (actor) {
    //             pubsub.publish('topic', { actorId: actorId });
    //             expect(actor.count).to.equal(1);
    //             return hub.publish({ topic: 'topic', data: { actorId: actorId } });
    //         })
    //         .then(function () {
    //
    //         });
    // })
});
