require('tribe').register.actor(function (actor) {
    var self = this,
        playersSelected = 0,
        currentPane = this.currentPane = ko.observable({ path: 'selectPlayer' })

    actor.handles({
        'player.selected': function () {
            playersSelected++
            if(playersSelected < 2)
                currentPane({ path: 'selectPlayer' })
            else
                currentPane({ path: 'score' })
        }
    })

})
