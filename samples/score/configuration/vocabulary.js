require('tribe').register.vocabulary({
    'players': e => e.groupBy(x => x.data.playerId),
    'points': e => e.topic('point').count()
})
