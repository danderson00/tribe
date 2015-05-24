suite('tribe.expressions.scopes', function () {
    var scopes = require('tribe.expressions/scopes');

    test("isSubsetOf on objects", function () {
        expect(scopes.isSubsetOf({}, { p1: 1 })).to.be.true;
        expect(scopes.isSubsetOf({ p1: 1 }, { p1: 1 })).to.be.true;
        expect(scopes.isSubsetOf({ p1: 1 }, { p1: 1, p2: 2 })).to.be.true;
        expect(scopes.isSubsetOf({ p1: 1, p2: 2 }, { p1: 1, p2: 2 })).to.be.true;

        expect(scopes.isSubsetOf({ p1: 2 }, { p1: 1 })).to.be.false;
        expect(scopes.isSubsetOf({ p1: 2 }, { p1: 1, p2: 2 })).to.be.false;
        expect(scopes.isSubsetOf({ p1: 2, p2: 2 }, { p1: 1, p2: 2 })).to.be.false;
    });

    test("isSubsetOf on arrays", function () {
        expect(scopes.isSubsetOf([], ['p1'])).to.be.true;
        expect(scopes.isSubsetOf(['p1'], ['p1'])).to.be.true;
        expect(scopes.isSubsetOf(['p1'], ['p1', 'p2'])).to.be.true;
        expect(scopes.isSubsetOf(['p1', 'p2'], ['p1', 'p2'])).to.be.true;
        expect(scopes.isSubsetOf(['p1', 'p2'], ['p2', 'p1'])).to.be.true;

        expect(scopes.isSubsetOf(['p1'], [])).to.be.false;
        expect(scopes.isSubsetOf(['p1'], ['p2'])).to.be.false;
        expect(scopes.isSubsetOf(['p1', 'p2'], ['p2', 'p3'])).to.be.false;
    });

    test("isSupersetOf on objects", function () {
        expect(scopes.isSupersetOf({ p1: 1, p2: 2 }, { p1: 1 })).to.be.true;
        expect(scopes.isSupersetOf({ p1: 1, p2: 2 }, { p1: 2 })).to.be.false;
    });

    test("isSupersetOf on arrays", function () {
        expect(scopes.isSupersetOf(['p1', 'p2'], ['p1'])).to.be.true;
        expect(scopes.isSupersetOf(['p2', 'p3'], ['p1', 'p2'])).to.be.false;
    });

    test("isEquivalentTo on objects", function () {
        expect(scopes.isEquivalentTo({}, {})).to.be.true;
        expect(scopes.isEquivalentTo({ p1: 1 }, { p1: 1 })).to.be.true;
        expect(scopes.isEquivalentTo({ p1: 1, p2: 'test' }, { p1: 1, p2: 'test' })).to.be.true;

        expect(scopes.isEquivalentTo({}, { p1: 1 })).to.be.false;
        expect(scopes.isEquivalentTo({ p1: 1 }, { p1: 2 })).to.be.false;
        expect(scopes.isEquivalentTo({ p1: 1 }, { p1: 1, p2: 'test' })).to.be.false;
    });

    test("isEquivalentTo on arrays", function () {
        expect(scopes.isEquivalentTo([], [])).to.be.true;
        expect(scopes.isEquivalentTo(['p1'], ['p1'])).to.be.true;
        expect(scopes.isEquivalentTo(['p1', 'p2'], ['p1', 'p2'])).to.be.true;

        expect(scopes.isEquivalentTo([], ['p1'])).to.be.false;
        expect(scopes.isEquivalentTo(['p2'], ['p1'])).to.be.false;
        expect(scopes.isEquivalentTo(['p1'], ['p1', 'p2'])).to.be.false;
    });
});