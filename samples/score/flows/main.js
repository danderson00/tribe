require('tribe').register.flow(function (flow) {
    flow.startsAt('home')

    flow.on('ui.home').to('home')
    flow.on('ui.score').startChild('game')
})
