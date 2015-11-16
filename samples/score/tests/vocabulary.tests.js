var rxTest = require('tribe.rx/test');

suite('vocabulary', function () {
    suite('range', function () {
        test('some bullshit', function () {
            var context = rxTest.context(),
                players = context.envelopes.players().select(function (x) {
                    return x.points().select(function (y) {
                        return y;
                    })
                }).asArray()
            context.pubsub.publish('point', { playerId: 1 })
        })

        // test('should be zero when no messages have been published', function () {
        //     expect(rxTest.context().envelopes.range().asScalar()()).to.equal(0)
        // })

        // test('should be one when one point has been scored', function () {
        //     var context = rxTest.context(),
        //         players = context.envelopes.players().select(function (x) {
        //             return x.points().select(function (y) {
        //                 return y;
        //             })
        //         }).asScalar()
        //         // players = context.envelopes.players(),
        //         // lead = players.select(x => x.points().select(function (x) {
        //         //     return x;
        //         // })).combineLatest()
        //         //     .select(function(x) {
        //         //         return x.max() - x.min()
        //         //     }).asScalar()
        //         // min = players.select(x => x.points().min()),
        //         // max = players.select(x => x.points().max()),
        //         // lead = min.combineLatest(max).select((min, max) => return max - min).asScalar()
        //
        //     context.pubsub.publish('point', { playerId: 1 })
        //     expect(lead()).to.deep.equal(1)
        // })

        // test('should reflect the difference in scores', function () {
        //     var context = rxTest.context(),
        //         range = context.envelopes.range().asScalar()
        //
        //     context.pubsub.publish('point', { playerId: 1 })
        //     context.pubsub.publish('point', { playerId: 2 })
        //     context.pubsub.publish('point', { playerId: 2 })
        //     context.pubsub.publish('point', { playerId: 2 })
        //     expect(range()).to.equal(2)
        // })
    })
})
