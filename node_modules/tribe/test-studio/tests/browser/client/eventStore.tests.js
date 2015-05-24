suite('tribe.browser.client.eventStore', function () {
    var eventStore = require('tribe/client/eventStore');

    test("messages are retrieved by scope", function () {
        return eventStore.clear()
            .then(function () {
                return eventStore.store({ a: 1, b: 2 }, [{ v: 1 }, { v: 2 }])
            })
            .then(function () {
                return eventStore.store({ a: 2, b: 2 }, [{ v: 3 }, { v: 4 }])
            })
            .then(function () {
                return eventStore.retrieve({ a: 1, b: 2 });
            })
            .then(function (envelopes) {
                expect(envelopes.length).to.equal(2);
                expect(envelopes[0].v).to.equal(1);
                expect(envelopes[1].v).to.equal(2);
            });
    });
});
