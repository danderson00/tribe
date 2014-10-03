suite('browser.layout', function () {
    var pubsub = require('tribe.pubsub');

    test("increment publishes counter.increment", function () {
        var lifetime = pubsub.createLifetime(),
            model = new (T.context().models['/layout'].constructor)({ data: 'fixture', pubsub: lifetime }),
            spy = sinon.spy();

        lifetime.subscribe('counter.increment', spy);
        model.increment();
        expect(spy.callCount).to.equal(1);
        lifetime.end();
    });
});