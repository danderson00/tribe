require('tribe').register.flow(function (flow) {
    flow.startsAt('games')

    flow.on('ui.home').to('games')
    flow.on('ui.score').to('game')
})
