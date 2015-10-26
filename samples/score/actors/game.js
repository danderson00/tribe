require('tribe').register.actor(function (actor) {
    actor.envelopes.players()
        .forEach(x => x.points()
            .when(x => x >= 3)
            .then(() => actor.publish('game.won', { playerId: x.key })))
})
