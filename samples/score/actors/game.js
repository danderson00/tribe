require('tribe').register.actor(function (actor) {
    actor.isDistributed()

    this.lead = actor.envelopes.players().select(x => x.points()).range().asScalar()

    // publish a game.won message when a player has at least 3 points and is at least 2 points ahead of the opposition
    actor.envelopes.players()
        .forEach(x => x.points()
            .when(x => x >= 3 && this.lead() >= 2)
            .then(() => actor.publish('game.won', { playerId: x.key })))
})
