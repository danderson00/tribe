suite('tribe.utilities.collections', function () {
    var collections = require('tribe/utilities/collections');

    test("sortObject", function () {
        expect(collections.sortObject({ a: 1, c: 3, b: 2 })).to.deep.equal({ a: 1, b: 2, c: 3 });
    });
});