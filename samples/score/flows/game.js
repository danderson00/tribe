require('tribe').register.flow(function (flow) {
    flow.isDistributed()

    flow.startsAt({ path: 'selectPlayer', data: { heading: 'Select Player 1' } })

    flow.topic('player.selected')
        .count()
        .when(1).then(flow.to({ path: 'selectPlayer', data: { heading: 'Select Player 2' } }))
        .when(2).then(flow.to('score'))

    flow.on('game.won').to('complete')
})
