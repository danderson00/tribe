require('tribe').register.actor(function (actor) {
    actor.isDistributed()

    this.points = actor.envelopes.players().select(x => x.points().asScalar()).asArray()

    actor.envelopes.players()
        .forEach(x => x.points()
            //.when(3)
            // this is rather nasty. a much, much neater expression coming soon...
            .when(x => x >= 3 && this.points().every(y => y() === x || y() < x - 1) && (this.points().length === 1 || !this.points().every(y => y() === x)))
            .then(() => actor.publish('game.won', { playerId: x.key })))
})
