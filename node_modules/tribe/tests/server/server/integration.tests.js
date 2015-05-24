suite('tribe.server.integration', function () {
    test("actors", function () {
        var actors = require('tribe/actors'),
            pubsub = require('tribe.pubsub').createLifetime(),
            storage = require('tribe/storage'),

            message = sinon.spy(), emit = sinon.spy(), ack = sinon.spy(),
            context = { pubsub: pubsub, socket: { emit: emit }, ack: ack, clientId: 'id' };

        pubsub.owner.sync = true;

        actors.register('operations.actor', function (actor) {
            actor.isDistributed();
            actor.handles = {
                'message': message,
            };
            actor.isScopedTo('p1', 'p2');
        });

        return storage.initialise([{ name: 'messages', indexes: actors.indexes().concat(['topic']) }], { type: 'sqlite3', filename: ':memory:' })
            .then(function () {
                var actorOperation = require('tribe/server/operations/actor'),
                    messageOperation = require('tribe/server/operations/message');

                return messageOperation({ topic: 'message', data: { p1: 1, p2: 2 } }, context)
                    .then(function () {
                        expect(ack.callCount).to.equal(1);
                        return actorOperation({ actor: 'operations.actor', scope: { p1: 1, p2: 2 } }, context);
                    })
                    .then(function () {
                        expect(ack.callCount).to.equal(2);
                        expect(ack.secondCall.args[0].envelopes.length).to.equal(1);

                        pubsub.publish('message', { p1: 1, p2: 2 });
                        pubsub.publish('message', { p1: 2, p2: 2 });

                        expect(emit.callCount).to.equal(1);

                        pubsub.end();
                    });
            });
    });
});
