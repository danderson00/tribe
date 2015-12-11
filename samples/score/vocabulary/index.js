// these are common expressions that can be used in Rx expressions throughout the app
require('tribe').register.vocabulary({
    'players': e => e.groupBy(x => x.data.playerId),
    'games': e => e.groupBy(x => x.data.gameId),

    'points': e => e.topic('point').count(),
    'lead': e => e.players().select(x => x.points()).range(),

    'selectedName': e => e.topic('player.selected').data('name'),
    'playerName': e => e.topic('player.name').data('name')
})
