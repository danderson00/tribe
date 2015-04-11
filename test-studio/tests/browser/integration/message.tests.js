suite('tribe.integration.message', function () {
    var hub = require('tribe/client/hub');

    test("message hub function returns envelope populated with seq property set", function () {
        var seq;

        return hub.publish({ topic: 'topic' })
            .then(function (result) {
                expect(result.seq).to.not.be.undefined;
            });
    });
})
