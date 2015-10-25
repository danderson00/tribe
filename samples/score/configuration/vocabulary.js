require('tribe').register.vocabulary({
    'players': e => e.groupBy(x => x.data.playerId),
    'games': e => e.groupBy(x => x.data.gameId),

    'points': e => e.topic('point').count(),
    'selectedName': e => e.topic('player.selected').data('name'),
    'playerName': e => e.topic('player.name').data('name')
})
