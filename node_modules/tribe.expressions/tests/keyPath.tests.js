suite('tribe.expressions.keyPath', function () {
    var keyPath = require('tribe.expressions/keyPath'),
        target = {
            p1: 'test1',
            p2: {
                p21: 'test2',
                p22: {
                    p221: 221,
                    p222: 'test3'
                }
            }
        };

    test("evaluate keyPath returns existing values", function () {
        expect(keyPath('p1', target)).to.equal('test1');
        expect(keyPath('p2', target)).to.deep.equal(target.p2);
        expect(keyPath('p2.p21', target)).to.equal('test2');
        expect(keyPath('p2.p22', target)).to.deep.equal(target.p2.p22);
        expect(keyPath('p2.p22.p221', target)).to.equal(221);
        expect(keyPath('p2.p22.p222', target)).to.equal('test3');
    });

    test("evaluate keyPath returns undefined where path does not exist", function () {
        expect(keyPath('p3', target)).to.be.undefined;
        expect(keyPath('p1.p3', target)).to.be.undefined;
        expect(keyPath('p1.p3.p6', target)).to.be.undefined;
        expect(keyPath('p1', undefined)).to.be.undefined;
    });

    test("set keyPath sets values on existing objects", function () {
        var target = { o1: {} };
        keyPath.set('p1', target, 1);
        keyPath.set('o1.p2', target, 2);
        expect(target.p1).to.equal(1);
        expect(target.o1.p2).to.equal(2);
    });

    test("set keyPath creates object path", function () {
        var target = {};
        keyPath.set('o1.p1', target, 1);
        expect(target.o1.p1).to.equal(1);
    });

    test("set keyPath overwrites existing values", function () {
        var target = { p1: 1, p2: true, o1: { p4: 2 } };
        keyPath.set('p1', target, 3);
        keyPath.set('p2.p3', target, 3);
        keyPath.set('o1.p4', target, 4);
        expect(target.p1).to.equal(3);
        expect(target.p2.p3).to.equal(3);
        expect(target.o1.p4).to.equal(4);
    });
});
