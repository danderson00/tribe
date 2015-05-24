suite('tribe.expressions.create', function () {
    var create = require('tribe.expressions/create');

    test('without prepend', function () {
        expect(create({})).to.deep.equal([]);
        expect(create({ p1: 1 })).to.deep.equal([{ p: 'p1', v: 1 }]);
        expect(create({ p1: 1, 'p2.p3': 'value' })).to.deep.equal([{ p: 'p1', v: 1 }, { p: 'p2.p3', v: 'value' }]);
    });

    test('with prepend', function () {
        expect(create({}, 'test')).to.deep.equal([]);
        expect(create({ p1: 1 }, 'test')).to.deep.equal([{ p: 'test.p1', v: 1 }]);
        expect(create({ p1: 1, 'p2.p3': 'value' }, 'test')).to.deep.equal([{ p: 'test.p1', v: 1 }, { p: 'test.p2.p3', v: 'value' }]);
    });
});