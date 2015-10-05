require('tribe').register.actor(function (actor) {
    actor.topic('point')
        .groupBy(x => x.playerId)
        .forEach(x => x.count().when(3).then(() => actor.pubsub.publish('game.complete', { playerId: x.key })))
})
