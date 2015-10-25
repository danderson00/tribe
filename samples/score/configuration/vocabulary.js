require('tribe').register.vocabulary({
    'players': x => x.groupBy(y => y.data.playerId)
})
