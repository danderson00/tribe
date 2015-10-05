require('tribe').register.actor(function (actor) {
    var currentPane = this.currentPane = ko.observable({ path: 'selectPlayer' })

    actor.isDistributed()

    actor.topic('player.selected')
        .count()
        .when(1).then(() => currentPane({ path: 'selectPlayer' }))
        .when(2).then(() => currentPane({ path: 'score' }))

    actor.handles('game.complete', (data) => currentPane({ path: 'complete', data: data }))
})
