require('tribe').register.actor(function (actor) {
    actor.topic('point')
        .groupBy(function (x) {
            return x.playerId
        })
        .forEach(function (x) {
            x.count().when(3).then(function () {
                actor.pubsub.publish('game.complete', { playerId: x.key })
            })
        })
})
