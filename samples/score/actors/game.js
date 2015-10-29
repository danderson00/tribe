require('tribe').register.actor(function (actor) {
    actor.isDistributed()

    // keep an array of points. nasty. improvements coming.
    this.points = actor.envelopes.players().select(x => x.points().asScalar()).asArray()

    // publish a game.won message when a player has at least 3 points and is at least 2 points ahead of the opposition
    actor.envelopes.players()
        .forEach(x => x.points()
            //.when(3)
            // this is even nastier. a much, much neater expression coming soon...
            .when(x => x >= 3 && this.points().every(y => y() === x || y() < x - 1) && (this.points().length === 1 || !this.points().every(y => y() === x)))
            .then(() => actor.publish('game.won', { playerId: x.key })))
})
