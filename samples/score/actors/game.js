require('tribe').register.actor(function (actor) {
    var self = this,
        playersSelected = 0,
        currentPane = this.currentPane = ko.observable({ path: 'selectPlayer' })

    actor.topic('player.selected')
        .count()
        .when(1).then(function () {
            currentPane({ path: 'selectPlayer' })
        })
        .when(2).then(function () {
            currentPane({ path: 'score' })
        })

    // actor.handles({
    //     'player.selected': function () {
    //         playersSelected++
    //         if(playersSelected < 2)
    //             currentPane({ path: 'selectPlayer' })
    //         else
    //             currentPane({ path: 'score' })
    //     }
    // })

})
