suite('tribe.storage.utilities.objects', function () {
    var objects = require('tribe.storage/utilities/objects');

    test("indexOnProperty", function () {
        expect(objects.indexOnProperty('p1', [
            { p1: 'a', p2: 1 },
            { p1: 'b', p2: 2 }
        ])).to.deep.equal({
            a: { p1: 'a', p2: 1 },
            b: { p1: 'b', p2: 2 }
        });
    });
});
