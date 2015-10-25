require('tribe').register.actor(function (actor) {
    actor.envelopes.players()
        .forEach(x => x.points().when(3)
            .then(() => actor.publish('game.complete', { playerId: x.key })))
})
