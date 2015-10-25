require('tribe').register.flow(function (flow) {
    flow.isDistributed()

    flow.startsAt({ path: 'selectPlayer' })

    flow.topic('player.selected')
        .count()
        .when(1).then(flow.to({ path: 'selectPlayer' }))
        .when(2).then(flow.to('score'))

    flow.on('game.complete').to('complete')
})
